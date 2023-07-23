import { useState, useEffect } from 'react';
import { fetchComments } from '../util/api.js';
import CommentsCard from './CommentsCard.jsx';
import CommentsAdd from './CommentsAdd.jsx';
import CommentsNav from './CommentsNav.jsx';
import Loading from './Loading.jsx';
import '../css/Comments.css';

export default function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState();
    const limit = 10;
    const [page, setPage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const addCommentBatch = async (append = true) => {
        const queries = {};
        if (page && append) queries.p = page;

        try {
            const {
                comments: fetchedComments,
                total_count: totalCount
            } = await fetchComments(articleId, queries);

            if (append) setComments([...(append && comments), ...fetchedComments]);
            else setComments([...[], ...fetchedComments]);
            setTotalComments(totalCount);
        }
        catch {
            setIsError(true);
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setPage();
            await addCommentBatch(false);
            setIsLoading(false);
        })();
    }, [articleId]);

    useEffect(() => {
        if (page > 1) {
            (async() => {
                setIsLoading(true);
                await addCommentBatch();
                setIsLoading(false);
            })();
        }
    }, [page]);

    if (isError) {
        return <div className="error">Unable to load comments</div>;
    }
    else return (
        <section className="comments">
            <Loading isLoading={isLoading}>
                <h2>Comments:</h2>

                <CommentsAdd
                    articleId={articleId}
                    setComments = {setComments}
                    totalComments={totalComments}
                    setTotalComments={setTotalComments}
                    isLoading={isLoading}
                    comments = {comments}
                />
                
                <section className="comments-list">
                    {comments.map(comment => {
                        return <CommentsCard
                            key={comment.comment_id}
                            comments={comments}
                            commentId={comment.comment_id}
                            author={comment.author}
                            createdAt={comment.created_at}
                            body={comment.body}
                            votes={comment.votes}
                        />;
                    })}
                </section>
                
                <CommentsNav
                    displayedComments={comments.length}
                    totalComments={totalComments}
                    page={page}
                    setPage={setPage}
                    isLoading={isLoading}
                />
            </Loading>
        </section>
    );
}