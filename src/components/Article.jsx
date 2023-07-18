import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { apiRequest } from '../util/api.js';
import { getFormattedDate } from '../util/format-date.js';

import Title from './Title.jsx';
import Votes from './Votes.jsx';
import '../css/Article.css';

export default function Articles() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const { article } = await apiRequest(`/articles/${article_id}`);

            setArticle(article);
            setIsLoading(false);
        })()
    }, []);

    return (
        <main className="article">
            <article>
                <div className={isLoading ? 'loading' : 'hidden'}>Loading Article...</div>
                <Title title={article.title} />
                <div>
                    <a href={`/users/${article.author}`}>{article.author}</a>
                    {getFormattedDate(article.created_at)}
                </div>
            
                <img src={article.article_img_url} />

                <p>
                    {article.body}
                </p>

                <Votes votes={article.votes} patchUrl={`/articles/${article_id}`} />
            </article>

            <p>comments will go here</p>
        </main>
    )
}