import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { apiPostComment } from '../util/api.js';
import { scrollToTop } from '../util/scroll.js';
import { UserContext } from '../context/User.jsx';
import '../css/CommentsAdd.css';

export default function CommentsAdd({ articleId, comments, setComments, totalComments, adjustTotalComments, isLoading }) {
    const { userDetails, isUserLoggedIn } = useContext(UserContext);
	const [comment, setComment] = useState('');
    const [warning, setWarning] = useState('');
	const textarea = document.getElementById('comments-add-body');
    const button = document.getElementById('comments-add-submit-btn');

    useEffect(() => {
        setComment('');
        setWarning('');
        if (textarea) textarea.classList.remove('comments-add__textarea--invalid');
    }, [articleId]);

	const submitComment = async event => {
		event.preventDefault();

        if (comment.length === 0) {
            textarea.classList.add('comments-add__textarea--invalid');
            setWarning('Cannot be blank!');
        }
        else if (comment.length > 300) {
            textarea.classList.add('comments-add__textarea--invalid');
            setWarning('Cannot exceed 300 chars!');
        }
        else {
            button.disabled = true;
            textarea.disabled = true;
            textarea.classList.remove('comments-add__textarea--invalid');
            setWarning('');

            try {
                const { comment: newComment } = await apiPostComment(articleId, userDetails.username, comment);

                comments.unshift(newComment);
                setComments(comments);
                adjustTotalComments(1);

                setTimeout(() => {
                    setComment('');
                    button.disabled = false;
                    textarea.disabled = false; 
                }, 1000);
            }
            catch {
                setWarning('Unable to post comment');
                button.disabled = false;
                textarea.disabled = false; 
            }
        }
	}

    return (
		<form className="comments-add" onSubmit={event => submitComment(event)}>
			<label htmlFor="comments-add-body">
				Comment:
			</label>
			<textarea
				id="comments-add-body"
				placeholder={
					isUserLoggedIn ?
						(!totalComments && !isLoading ? 'Be the first to leave a comment!' : 'Leave a comment')
						: undefined
				}
				value={comment}
				onChange={event => setComment(event.target.value)}
				disabled={!isUserLoggedIn}
			/>

            <div className={`comments-add__overlay ${isUserLoggedIn ? 'hidden' : ''}`}>
                Please&nbsp;<Link to="#" onClick={scrollToTop}>sign in</Link>&nbsp;to comment
            </div>

			<p className={`comments-add__warning ${!warning && 'hidden'}`}>
				{warning}
			</p>

			<button
				type="submit"
                id="comments-add-submit-btn"
				className="comments-add__submit-btn"
				disabled={!isUserLoggedIn}
			>
				Comment
			</button>
		</form>
	)
}