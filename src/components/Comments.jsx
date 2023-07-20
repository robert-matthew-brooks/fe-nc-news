import { useState, useEffect } from 'react';
import { fetchComments } from '../util/api.js';
import CommentsCard from './CommentsCard.jsx';
import CommentsNav from './CommentsNav.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Comments.css';

export default function Comments({ article_id }) {
    const [comments, setComments] = useState([]);
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

            {totalComments === 0 && !isLoading ? 'Be the first to add a comment! (this condition/message will become part of add comment form)' : ''}
			
			<section className="comments-list">
				{comments.map(comment => {
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
			
			<CommentsNav displayedComments={comments.length} totalComments={totalComments} limit={limit} setLimit={setLimit} isLoading={isLoading} />

			<div className={isLoading ? 'loading' : 'hidden'}>
                <img src={LoadingImg} alt="loading" />
            </div>
		</section>
	);
}