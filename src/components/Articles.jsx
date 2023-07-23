import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchArticles } from '../util/api.js';
import { scrollToTop } from '../util/scroll-to-top.js';
import Title from './Title.jsx';
import ArticlesSort from './ArticlesSort.jsx';
import ArticlesCard from './ArticlesCard';
import ArticlesNav from './ArticlesNav.jsx';
import Loading from './Loading.jsx';
import '../css/Articles.css';

export default function Articles() {
    const { topic } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const articlesPerPage = 10;
    const page = searchParams.get("p");
    const sortBy = searchParams.get("sort_by");
    const sortOrder = searchParams.get("order");

    const addPageToURL = page => {
        setSearchParams(params => {
        params.set("p", page);
            return params;
        });
    };

    const addSortByToURL = sortBy => {
        setSearchParams(params => {
            params.set("sort_by", sortBy);
            return params;
        });
    };

    const addSortOrderToURL = sortOrder => {
        setSearchParams(params => {
            params.set("order", sortOrder);
            return params;
        });
    };

    useEffect(() => {
        (async () => {
            setIsError(false)
            setIsLoading(true);
            scrollToTop();

            const queries = {};
            if (topic) queries.topic = topic;
            if (page) queries.p = page;
            if (sortBy) queries.sort_by = sortBy;
            if (sortOrder) queries.order = sortOrder;

            try {
                const { articles, total_count } = await fetchArticles(queries);

                setArticles(articles);
                setTotalArticles(total_count);
            }
            catch(err) {
                setIsError(true);
                console.log(err);
            }

            setIsLoading(false);
        })();
    }, [topic, searchParams]);

    if (isError) {
        return <div className="error">Unable to load articles</div>;
    }
    else return (
        <main className="articles">
            <Loading isLoading={isLoading}>
                <Title title="Articles" />

                <ArticlesSort
                    sortBy={sortBy}
                    addSortByToURL={addSortByToURL}
                    sortOrder={sortOrder}
                    addSortOrderToURL={addSortOrderToURL}
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
                    page={page}
                    changePage={addPageToURL}
                    articlesPerPage={articlesPerPage}
                    totalArticles={totalArticles}
                    isLoading={isLoading}
                />
            </Loading>
        </main>
    );
}