import { useContext } from 'react';
import { UserContext } from '../context/User';
import '../css/CommentsCardDelete.css';

export default function CommentsCardDelete({ comment_id, author }) {
    const {
        userDetails,
        isUserLoggedIn
    } = useContext(UserContext);

    if (userDetails.username === author) return (
        <button className="comment-delete">
           x
        </button>
    );
}