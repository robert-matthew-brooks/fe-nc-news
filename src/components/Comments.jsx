import { useState, useEffect } from 'react';
import { apiFetchComments, apiDeleteComment } from '../util/api.js';
import CommentsCard from './CommentsCard.jsx';
import CommentsAdd from './CommentsAdd.jsx';
import CommentsNav from './CommentsNav.jsx';
import Loading from './Loading.jsx';
import '../css/Comments.css';

export default function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState();
    const [isCommentsRequested, setIsCommentsRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchCommentBatch = async (append = true) => {
        const queries = {};
        if (append) queries.offset = comments.filter(comment => !comment.deleted).length;

        try {
            const {
                comments: fetchedComments,
                total_count: totalCount
            } = await apiFetchComments(articleId, queries);

            for (const comment of fetchedComments) {
                comment.deleted = false;
            }

            setComments([
                ...(append && comments ? comments : []),
                ...fetchedComments
            ]);
            setTotalComments(totalCount);
        }
        catch {
            setIsError(true);
        }
    };

    const adjustTotalComments = amount => {
        setTotalComments(totalComments + amount);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await fetchCommentBatch(false);
            setIsLoading(false);
        })();
    }, [articleId]);

    useEffect(() => {
        if (isCommentsRequested) {
            (async() => {
                setIsLoading(true);
                await fetchCommentBatch();
                setIsLoading(false);
            })();

            setIsCommentsRequested(false);
        }
    }, [isCommentsRequested]);

    if (isError) {
        return <div className="error">Unable to load comments</div>;
    }
    else return (
        <section className="comments">
            <Loading isLoading={isLoading}>
                <h2>Comments:</h2>

                <CommentsAdd
                    articleId={articleId}
                    comments = {comments}
                    setComments = {setComments}
                    totalComments={totalComments}
                    adjustTotalComments={adjustTotalComments}
                    isLoading={isLoading}
                />
                
                <section className="comments-list">
                    {comments.map((comment, index) => {
                        return <CommentsCard
                            key={comment.comment_id}
                            commentId={comment.comment_id}
                            author={comment.author}
                            createdAt={comment.created_at}
                            body={comment.body}
                            votes={comment.votes}
                            comments = {comments}
                            setComments = {setComments}
                            adjustTotalComments={adjustTotalComments}
                        />;
                    })}
                </section>
                
                <CommentsNav
                    activeComments={comments.filter(comment => !comment.deleted).length}
                    totalComments={totalComments}
                    setIsCommentsRequested={setIsCommentsRequested}
                    isLoading={isLoading}
                />
            </Loading>
        </section>
    );
}