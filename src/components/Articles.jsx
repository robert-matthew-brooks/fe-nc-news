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
    const [currentPage, setCurrentPage] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const changeCurrentPage = currentPage => {
        setCurrentPage(currentPage);
    };

    const changeSortBy = sortBy => {
        setSortBy(sortBy);
    };

    const changeSortOrder = sortOrder => {
        setSortOrder(sortOrder);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const queries = {};
            if (currentPage) queries.p = currentPage;
            if (sortBy) queries.sort_by = sortBy;
            if (sortOrder) queries.order = sortOrder;

            try {
                const { articles, total_count } = await fetchArticles(queries);
                setArticles(articles);
                setTotalArticles(total_count);
            }
            catch {
                setIsError(true);
            }

            setIsLoading(false);
        })();
    }, [currentPage, sortBy, sortOrder]);

    if (isError) {
        return <div className="error">Unable to load articles</div>;
    }
    else return (
        <main className="articles">
            <Title title="Articles" />

            <ArticlesSort
                changeSortBy={changeSortBy}
                sortOrder={sortOrder}
                changeSortOrder={changeSortOrder}
            />

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
                changeCurrentPage={changeCurrentPage}
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