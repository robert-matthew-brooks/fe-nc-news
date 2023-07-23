import { Link } from 'react-router-dom';
import { getTimeAgo } from '../util/format.js';
import '../css/ArticlesCard.css';

export default function ArticlesCard({ articleId, articleImgUrl, title, author, createdAt, votes, commentCount }) {
    return (
        <article className="articles-card">
            <p className="user-and-time">
                Posted by <Link to={`/users/${author}`}>{author}</Link>
                &nbsp;-&nbsp;
                <time>{getTimeAgo(createdAt)}</time>
            </p>

            <Link to={{ pathname: `/articles/${articleId}` }}>
                <h3>{title}</h3>
                <img src={articleImgUrl} alt={title}/>
            </Link>

            <p className="comments-and-votes">
                <Link to={{
                    pathname: `/articles/${articleId}`,
                    hash: '#comments'
                }}>
                    {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </Link>
                &nbsp;-&nbsp;
                <Link to={{
                    pathname: `/articles/${articleId}`,
                    hash: '#votes'
                }}>
                    {votes} {votes === 1 ? 'vote' : 'votes'}
                </Link>
            </p>
        </article>
    );
}