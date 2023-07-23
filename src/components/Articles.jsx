import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { apiFetchArticles } from '../util/api.js';
import { scrollToTop } from '../util/scroll-to-top.js';
import Title from './Title.jsx';
import ArticlesSort from './ArticlesSort.jsx';
import ArticlesCard from './ArticlesCard';
import ArticlesNav from './ArticlesNav.jsx';
import Loading from './Loading.jsx';
import '../css/Articles.css';
import { capitalise } from '../util/format.js';

export default function Articles() {
    const { topic } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const articlesPerPage = 10;
    const page = searchParams.get("p");
    const sortByFromUrl = searchParams.get("sort_by");
    const sortOrderFromUrl = searchParams.get("order");

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
            setIsError(false);
            setIsLoading(true);
            scrollToTop();

            const queries = {};
            if (topic) queries.topic = topic;
            if (page) queries.p = page;
            if (sortByFromUrl) queries.sort_by = sortByFromUrl;
            if (sortOrderFromUrl) queries.order = sortOrderFromUrl;

            try {
                const {
                    articles,
                    total_count: totalCount
                } = await apiFetchArticles(queries);

                setArticles(articles);
                setTotalArticles(totalCount);
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
                <Title title={`${topic ? capitalise(topic) : 'All'} Articles`} />

                <ArticlesSort
                    sortByFromUrl={sortByFromUrl}
                    addSortByToURL={addSortByToURL}
                    sortOrderFromUrl={sortOrderFromUrl}
                    addSortOrderToURL={addSortOrderToURL}
                />

                <section className="articles-list">
                    {articles.map(article => {
                        return <ArticlesCard
                            key={article.article_id}
                            articleId={article.article_id}
                            articleImgUrl={article.article_img_url}
                            title={article.title}
                            author={article.author}
                            createdAt={article.created_at}
                            votes={article.votes}
                            commentCount={article.comment_count}
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