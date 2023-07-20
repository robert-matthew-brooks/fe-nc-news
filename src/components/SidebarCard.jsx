import { Link } from 'react-router-dom';
import '../css/SidebarCard.css';

export default function SidebarCard({ article_id, title, article_img_url, comment_count, i }) {
    return (
        <Link to={{ pathname: `/articles/${article_id}`}}>
            <article
                className="sidebar-card"
                style={{backgroundImage: `url(${article_img_url})`}}
            >
                <h4>#{i+1} - {title}</h4>
                <span>{comment_count} comments</span>
            </article>
        </Link>
    );
}