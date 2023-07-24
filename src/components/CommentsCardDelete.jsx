import { useContext } from 'react';
import { UserContext } from '../context/User.jsx';
import '../css/CommentsCardDelete.css';

export default function CommentsCardDelete({ author, deleteComment }) {
    const {
        userDetails
    } = useContext(UserContext);

    if (userDetails.username === author) return (
        <button className="comments-add__delete-btn" onClick={deleteComment}>
           x
        </button>
    );
}