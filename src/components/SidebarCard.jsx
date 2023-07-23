import { Link } from 'react-router-dom';
import '../css/SidebarCard.css';

export default function SidebarCard({ article_id, title, article_img_url, votes, i }) {
    return (
        <Link to={{ pathname: `/articles/${article_id}`}} tabIndex={-1}>
            <article
                className="sidebar-card"
                style={{backgroundImage: `url(${article_img_url})`}}
            >
                <h4>#{i+1} - {title}</h4>
                <span>{votes} votes</span>
            </article>
        </Link>
    );
}