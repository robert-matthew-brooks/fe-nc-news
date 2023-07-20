import { useState, useEffect } from 'react'
import { fetchArticles } from '../util/api.js';
import Title from './Title.jsx';
import ArticlesSort from './ArticlesSort.jsx';
import ArticlesCard from './ArticlesCard';
import ArticlesNav from './ArticlesNav.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Articles.css';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [articlesPerPage, setArticlesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const { articles, total_count } = await fetchArticles({ p: currentPage });
                setArticles(articles);
                setTotalArticles(total_count);
            }
            catch {
                setIsError(true);
            }

            setIsLoading(false);
        })();
    }, [currentPage]);

    if (isError) {
        return <div className="error">Unable to load articles</div>;
    }
    else return (
        <main className="articles">
            <Title title="Articles" />

            <ArticlesSort />

            <section className="articles-list">
                {articles.map(article => {
                    return <ArticlesCard
                        key={article.article_id}
                        article_id={article.article_id}
                        article_img_url={article.article_img_url}
                        title={article.title}
                        author={article.author}
                        created_at={article.created_at}
                        votes={article.votes}
                        comment_count={article.comment_count}
                    />;
                })}
            </section>

            <ArticlesNav
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                articlesPerPage={articlesPerPage}
                totalArticles={totalArticles}
                isLoading={isLoading}
            />

            <div className={isLoading ? 'loading' : 'hidden'}>
                <img src={LoadingImg} alt="loading" />
            </div>
        </main>
    );
}