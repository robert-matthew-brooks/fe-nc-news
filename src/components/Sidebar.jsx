import { useState, useEffect } from 'react';
import { apiFetchArticles } from '../util/api.js';
import SidebarCard from './SidebarCard.jsx';
import Loading from './Loading.jsx';
import '../css/Sidebar.css';

export default function Sidebar() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const { articles } = await apiFetchArticles({ sort_by: 'comment_count', limit: 30 });
                setArticles(articles);
            }
            catch {
                setIsError(true);
            }

            setIsLoading(false);
        })();
    }, []);

    if (isError) {
        return <div className="error">Unable to load articles</div>;
    }
	else return (
        <aside className="sidebar">
            <Loading isLoading={isLoading}>
                <h3>Trending:</h3>
                <div className="sidebar-list">
                    {articles.map((article, i) => {
                        return (
                            <SidebarCard
                                key={article.article_id}
                                articleId={article.article_id}
                                title={article.title}
                                articleImgUrl={article.article_img_url}
                                votes={article.votes}
                                i={i}
                            />
                        );
                    })}
                </div>
            </Loading>
        </aside>
    );
}