import { useState, useEffect } from 'react';
import { fetchComments } from '../util/api.js';
import CommentsCard from './CommentsCard.jsx';
import CommentsAdd from './CommentsAdd.jsx';
import CommentsNav from './CommentsNav.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Comments.css';

export default function Comments({ article_id }) {
    const [comments, setComments] = useState([]);
    const [optimisticComments, setOptimisticComments] = useState([]);
	const [totalComments, setTotalComments] = useState(0);
	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
        (async () => {
            setIsLoading(true);

			try {
				const { comments, total_count } = await fetchComments(article_id, { limit });
				setComments(comments);
                setOptimisticComments(comments)
				setTotalComments(total_count);
			}
			catch {
				setIsError(true);
			}

            setIsLoading(false);
        })();
    }, [limit, article_id]);

	if (isError) {
        return <div className="error">Unable to load comments</div>;
    }
	else return (
		<section className="comments">
			<h2>Comments:</h2>

            <CommentsAdd
                article_id={article_id}
                optimisticComments = {optimisticComments}
                setOptimisticComments = {setOptimisticComments}
                totalComments={totalComments}
                setTotalComments={setTotalComments}
                isLoading={isLoading}
            />
			
			<section className="comments-list">
				{optimisticComments.map(comment => {
					return <CommentsCard
						key={comment.comment_id}
						comment_id={comment.comment_id}
						author={comment.author}
						created_at={comment.created_at}
						body={comment.body}
						votes={comment.votes}
					/>;
				})}
			</section>
			
			<CommentsNav displayedComments={optimisticComments.length} totalComments={totalComments} limit={limit} setLimit={setLimit} isLoading={isLoading} />

			<div className={isLoading ? 'loading' : 'hidden'}>
                <img src={LoadingImg} alt="loading" />
            </div>
		</section>
	);
}