import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { fetchArticle, fetchUser } from '../util/api.js';
import { getFormattedDate } from '../util/format.js';
import { scrollToTop } from '../util/scroll-to-top.js';
import Title from './Title.jsx';
import Votes from './Votes.jsx';
import Comments from './Comments.jsx';
import LoadingImg from '../img/loading.png';
import '../css/Article.css';

export default function Articles() {
    const { article_id } = useParams();
    const { hash } = useLocation();
    const [article, setArticle] = useState({});
    const [avatarUrl, setAvatarUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            scrollToTop();
            setIsLoading(true);

            try {
                const { article } = await fetchArticle(article_id);
                setArticle(article);
                const { user } =  await fetchUser(article.author);
                setAvatarUrl(user.avatar_url);
            }
            catch {
                setIsError(true);
            }
            
            setIsLoading(false);
            if (hash === '#votes') document.getElementById('votes').scrollIntoView({ block: 'center' });
            else if (hash === '#comments') document.getElementById('comments').scrollIntoView({ block: 'start' });
        })()
    }, [article_id]);

    if (isError) {
        return <div className="error">Unable to load article</div>;
    }
    else return (
        <main className="article">
            <article>
                <Title title={article.title} />

                <div className="article-details">
                    <Link to={{ pathname: `/users/${article.author}`}}>
                        <img
                            className={`author-avatar ${avatarUrl ? '' : 'hidden'}`}
                            src={avatarUrl}
                            alt={`${article.author}'s avatar`}
                        />
                        <span>{article.author}</span>
                    </Link>
                    <time>
                        {getFormattedDate(article.created_at)}
                    </time>
                </div>
            
                <img src={article.article_img_url} alt={article.title} />

                <p>
                    {article.body}
                </p>

                <figcaption className={isNaN(article.votes) ? 'hidden' : ''}>
                    Rate this article?
                </figcaption>
                <Votes
                    votes={article.votes}
                    patchUrl={`/articles/${article_id}`}
                />
                <a id="votes" className="anchor"></a>
                

                <div className={isLoading ? 'loading' : 'hidden'}>
                    <img src={LoadingImg} alt="loading" />
                </div>
            </article>

            <a id="comments" className="anchor"></a>
            <Comments article_id={article_id} />
        </main>
    );
}

