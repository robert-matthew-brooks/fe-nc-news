import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format.js';
import '../css/ArticlesCard.css';

export default function ArticlesCard({ article_id, article_img_url, title, author, created_at, votes, comment_count }) {
    return (
        <article className="articles-card">
            <p className="user-and-time">
                Posted by <Link to={`/users/${author}`}>{author}</Link>
                &nbsp;-&nbsp;
                <time>{getTimeAgo(created_at)}</time>
            </p>

            <Link to={{ pathname: `/articles/${article_id}` }}>
                <h3>{title}</h3>
                <img src={article_img_url} alt={title}/>
            </Link>

            <p className="comments-and-votes">
                <Link to={{
                    pathname: `/articles/${article_id}`,
                    hash: '#comments'
                }}>
                    {comment_count} {comment_count === 1 ? 'comment' : 'comments'}
                </Link>
                &nbsp;-&nbsp;
                <Link to={{
                    pathname: `/articles/${article_id}`,
                    hash: '#votes'
                }}>
                    {votes} {votes === 1 ? 'vote' : 'votes'}
                </Link>
            </p>
        </article>
    );
}