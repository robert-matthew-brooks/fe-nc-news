import { useState, useEffect } from 'react';
import { fetchComments } from '../util/api.js';
import CommentsCard from './CommentsCard.jsx';
import CommentsAdd from './CommentsAdd.jsx';
import CommentsNav from './CommentsNav.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Comments.css';

export default function Comments({ article_id }) {
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
            const { comments: fetchedComments, total_count } = await fetchComments(article_id, queries);
            if (append) setComments([...(append && comments), ...fetchedComments]);
            else setComments([...[], ...fetchedComments]);
            setTotalComments(total_count);
        }
        catch {
            setIsError(true);
        }
    }

    useEffect(() => {
        (async() => {
            setIsLoading(true);
            setPage();
            await addCommentBatch(false);
            setIsLoading(false);
        })();
    }, [article_id]);

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
            <h2>Comments:</h2>

            <CommentsAdd
                article_id={article_id}
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
                        comment_id={comment.comment_id}
                        author={comment.author}
                        created_at={comment.created_at}
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

            <div className={isLoading ? 'loading' : 'hidden'}>
                <img src={LoadingImg} alt="loading" />
            </div>
        </section>
    );
}