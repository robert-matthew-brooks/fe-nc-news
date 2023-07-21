import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format.js';
import Votes from './Votes.jsx';
import CommentsCardDelete from './CommentsCardDelete.jsx';
import '../css/CommentsCard.css';

export default function CommentsCard({ comment_id, author, created_at, body, votes }) {
    const [isRemoved, setIsRemoved] = useState(false);
    const [isDeleteError, setIsDeleteError] = useState(false);

    console.log(isRemoved);
    
    if (isDeleteError) {
        return <div className="error">Unable to delete comment</div>;
    }
    else return (
        <article className="comments-card">
            <p className="user-and-time">
                <CommentsCardDelete
                    comment_id={comment_id}
                    author={author}
                    setIsRemoved={setIsRemoved}
                    setIsDeleteError={setIsDeleteError}
                />
                <Link to={{ pathname: `/users/${author}`}}>{author}</Link>
                &nbsp;-&nbsp;
                {getTimeAgo(created_at)}
            </p>

            <Votes
                votes={votes}
                patchUrl={`/comments/${comment_id}`}
            />

            <p className="comment-body">
                {body}
            </p>

            <div className={`deleted-comment ${isRemoved ? '' : 'hidden'}`}>Comment deleted</div>
        </article>
    );
}