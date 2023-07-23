import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format.js';
import Votes from './Votes.jsx';
import CommentsCardDelete from './CommentsCardDelete.jsx';
import '../css/CommentsCard.css';

export default function CommentsCard({ commentId, author, createdAt, body, votes }) {
    const [isRemoved, setIsRemoved] = useState(false);
    const [isDeleteError, setIsDeleteError] = useState(false);
    
    if (isDeleteError) {
        return <div className="error">Unable to delete comment</div>;
    }
    else return (
        <article className="comments-card">
            <p className="user-and-time">
                <CommentsCardDelete
                    commentId={commentId}
                    author={author}
                    setIsRemoved={setIsRemoved}
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

            <div className={`deleted-comment ${!isRemoved && 'hidden'}`}>Comment deleted</div>
        </article>
    );
}