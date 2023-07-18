import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format-date.js';
import Votes from './Votes.jsx';
import '../css/CommentsCard.css';

export default function CommentsCard({ comment_id, author, created_at, body, votes }) {
    return (
        <div key={comment_id} className="comments-card">
            <div>
                <a href={`/users/${author}`}>{author}</a>
                {getTimeAgo(created_at)}
            </div>
            <p>
                {body}
            </p>
            <Votes votes={votes} patchUrl={`/comments/${comment_id}`} />
        </div>
    );
}