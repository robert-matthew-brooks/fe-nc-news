import { useState, useEffect } from 'react'
import { apiRequest } from '../util/api.js';

import Title from './Title.jsx';
import ArticlesSort from './ArticlesSort.jsx';
import ArticlesList from './ArticlesList';
import ArticlesPagination from './ArticlesPagination.jsx';
import '../css/Articles.css';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(10);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const { articles, total_count } = await apiRequest(`/articles?p=${currentPage}`);

            setArticles(articles);
            setTotalArticles(total_count);
            setIsLoading(false);
        })();
    }, [currentPage]);

    return (
        <main className="articles">
            <Title title="Articles" />
            <ArticlesSort />
            <ArticlesList
                articles={articles}
                isLoading={isLoading}
            />
            <ArticlesPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalArticles={totalArticles}
                articlesPerPage={articlesPerPage}
            />
        </main>
    )
}