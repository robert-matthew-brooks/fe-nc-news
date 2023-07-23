import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiDeleteComment } from '../util/api.js';
import { getTimeAgo } from '../util/format.js';
import Votes from './Votes.jsx';
import CommentsCardDelete from './CommentsCardDelete.jsx';
import '../css/CommentsCard.css';

export default function CommentsCard({ commentId, author, createdAt, body, votes, comments, setComments, adjustTotalComments }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isDeleteError, setIsDeleteError] = useState(false);

    const deleteComment = async () => {
        setIsDeleted(true);

        const index = comments.findIndex(comment => comment.comment_id === commentId);
        comments[index].deleted = true;
        setComments(comments);
        adjustTotalComments(-1);
        
        try {
            await apiDeleteComment(commentId);
        }
        catch {
            comments[index].deleted = false;
            setComments(comments);

            setIsDeleteError(true);
        }
    };
    
    if (isDeleteError) {
        return <div className="error">Unable to delete comment</div>;
    }
    else return (
        <article className="comments-card">
            <p className="user-and-time">
                <CommentsCardDelete
                    commentId={commentId}
                    author={author}
                    deleteComment={deleteComment}
                    setIsDeleteError={setIsDeleteError}
                />
                <Link to={{ pathname: `/users/${author}`}}>{author}</Link>
                &nbsp;-&nbsp;
                {getTimeAgo(createdAt)}
            </p>

            <Votes
                votes={votes}
                patchUrl={`/comments/${commentId}`}
            />

            <p className="comment-body">
                {body}
            </p>

            <div className={`deleted-comment ${!isDeleted && 'hidden'}`}>Comment deleted</div>
        </article>
    );
}