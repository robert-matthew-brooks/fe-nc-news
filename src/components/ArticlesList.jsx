import ArticlesCard from './ArticlesCard.jsx';
import '../css/ArticlesList.css';

function ArticlesList({ articles, isLoading }) {
	return (
		<section className="articles-list">
			<div className={isLoading ? 'loading' : 'hidden'}>Loading Articles...</div>
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
	);
}

export default ArticlesList;