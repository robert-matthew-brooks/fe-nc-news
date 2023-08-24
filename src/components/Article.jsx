import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { apiFetchArticle, apiFetchUser } from '../util/api.js';
import { getFormattedDate } from '../util/format.js';
import { scrollToTop } from '../util/scroll.js';
import Title from './Title.jsx';
import Votes from './Votes.jsx';
import Comments from './Comments.jsx';
import Loading from './Loading.jsx';
import '../css/Article.css';

export default function Articles() {
    const { article_id: articleId } = useParams();
    const { hash } = useLocation();
    const [article, setArticle] = useState({});
    const [avatarUrl, setAvatarUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [articleLoadingError, setArticleLoadingError] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            scrollToTop();

            try {
                const { article } = await apiFetchArticle(articleId+);
                setArticle(article);
                const { user } =  await apiFetchUser(article.author);
                setAvatarUrl(user.avatar_url);
            }
            catch(err) {
                console.log(err.response);
                setArticleLoadingError(
                    err.response ?
                    `Error ${err.response.status}: ${err.response.data.msg}` :
                    'Server error - cannot load article'
                );
            }
            
            setIsLoading(false);
            if (hash === '#votes') document.getElementById('votes').scrollIntoView({ block: 'center' });
            else if (hash === '#comments') document.getElementById('comments').scrollIntoView({ block: 'start' });
        })()
    }, [articleId]);

    return (
        <main className="article">
            <article>
                <Loading isLoading={isLoading} loadingError={articleLoadingError}>
                    <Title title={article.title} />

                    <div className="article-details">
                        <Link to={{ pathname: `/users/${article.author}`}}>
                            <img
                                className={`author-avatar ${!avatarUrl && 'hidden'}`}
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
                        patchUrl={`/articles/${articleId}`}
                    />
                    <a id="votes" className="anchor"></a>
                </Loading>
            </article>

            <a id="comments" className="anchor"></a>
            <Comments articleId={articleId} />
        </main>
    );
}

