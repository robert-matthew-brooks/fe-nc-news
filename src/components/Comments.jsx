import { useState, useEffect } from 'react';
import { apiRequest } from '../util/api.js';
import CommentsList from './CommentsList.jsx';
import CommentsPagination from './CommentsPagination.jsx';
import '../css/Comments.css';

export default function Comments({ article_id }) {
    const [comments, setComments] = useState([]);
	const [totalComments, setTotalComments] = useState(0);
	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        (async () => {
            setIsLoading(true);

            const { comments, total_count } = await apiRequest(`/articles/${article_id}/comments?limit=${limit}`);

            setComments(comments);
           	setTotalComments(total_count);
            setIsLoading(false);
        })();
    }, [limit]);

	return (
		<section className="comments">
			<h2>Comments:</h2>
			<p>add a comment will go here</p>
			<CommentsList comments={comments} isLoading={isLoading} />
			<CommentsPagination displayedComments={comments.length} totalComments={totalComments} limit={limit} setLimit={setLimit} isLoading={isLoading} />
		</section>
	);
}