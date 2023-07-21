import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchArticles } from '../util/api.js';
import Title from './Title.jsx';
import ArticlesSort from './ArticlesSort.jsx';
import ArticlesCard from './ArticlesCard';
import ArticlesNav from './ArticlesNav.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Articles.css';

export default function Articles() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const articlesPerPage = 10;
    const page = searchParams.get("p");
    const sortBy = searchParams.get("sort_by");
    const sortOrder = searchParams.get("order");

    const changePage = page => {
        setSearchParams(params => {
        params.set("p", page);
            return params;
        });
    };

    const changeSortBy = sortBy => {
        setSearchParams(params => {
            params.set("sort_by", sortBy);
            return params;
        });
    };

    const changeSortOrder = sortOrder => {
        setSearchParams(params => {
            params.set("order", sortOrder);
            return params;
        });
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const queries = {};
            if (page) queries.p = page;
            if (sortBy) queries.sort_by = sortBy;
            if (sortOrder) queries.order = sortOrder;

            try {
                const { articles, total_count } = await fetchArticles(queries);
>>>>>>>>> Temporary merge branch 2
                setArticles(articles);
                setTotalArticles(total_count);
            }
            catch {
                setIsError(true);
            }

            setIsLoading(false);
        })();
    }, [searchParams]);

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
                page={page}
                changePage={changePage}
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