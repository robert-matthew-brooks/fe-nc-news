import CommentsCard from './CommentsCard.jsx';
import '../css/CommentsList.css';

export default function CommentsList({ comments, isLoading }) {
	return (
		<section className="comments-list">
			<div className={isLoading ? 'loading' : 'hidden'}>Loading Comments...</div>
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
	);
}