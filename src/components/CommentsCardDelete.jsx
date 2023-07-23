import { useContext } from 'react';
import { UserContext } from '../context/User';
import '../css/CommentsCardDelete.css';

export default function CommentsCardDelete({ author, deleteComment }) {
    const {
        userDetails
    } = useContext(UserContext);

    if (userDetails.username === author) return (
        <button className="comment-delete" onClick={deleteComment}>
           x
        </button>
    );
}