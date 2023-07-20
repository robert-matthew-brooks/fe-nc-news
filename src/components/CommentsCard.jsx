import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format.js';
import Votes from './Votes.jsx';
import '../css/CommentsCard.css';

export default function CommentsCard({ comment_id, author, created_at, body, votes }) {
    return (
        <article className="comments-card">
            <p className="user-and-time">
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
        </article>
    );
}