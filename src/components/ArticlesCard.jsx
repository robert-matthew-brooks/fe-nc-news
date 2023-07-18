import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format-date.js';
import '../css/ArticlesCard.css';

export default function ArticlesCard({ article_id, article_img_url, title, author, created_at, votes, comment_count }) {
    return (
        <div key={article_id} className="articles-card">
            <p>
                Posted by <Link to={`/users/${author}`}>{author}</Link>
                &nbsp;-&nbsp;
                <span>{getTimeAgo(created_at)}</span>
            </p>
            <Link to={{ pathname: `/articles/${article_id}` }}>
                <h3>{title}</h3>
                <img src={article_img_url} alt={title}/>
            </Link>
            <p>
                <span>{votes} votes</span>
                <span>{comment_count} comments</span>
            </p>
        </div>
    );
}