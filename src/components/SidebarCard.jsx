import { Link } from 'react-router-dom';
import '../css/SidebarCard.css';

export default function SidebarCard({ articleId, title, articleImgUrl, votes, i }) {
    return (
        <Link to={{ pathname: `/articles/${articleId}`}} tabIndex={-1}>
            <article
                className="sidebar-card"
                style={{backgroundImage: `url(${articleImgUrl})`}}
            >
                <h4>#{i+1} - {title}</h4>
                <span>{votes} votes</span>
            </article>
        </Link>
    );
}