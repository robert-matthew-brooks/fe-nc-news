import { useState, useEffect } from 'react';
import { apiRequest } from '../util/api.js';
import CommentsList from './CommentsList.jsx';
import CommentsPagination from './CommentsPagination.jsx';
import '../css/Comments.css';

export default function CommentsAdd({ article_id }) {


	return (
		<form className="comments-add">
			<p>add a comment will go here</p>
		</form>
	)
}