import { useContext } from 'react';
import { deleteComment } from '../util/api';
import { UserContext } from '../context/User';
import '../css/CommentsCardDelete.css';

export default function CommentsCardDelete({ commentId, author, setIsRemoved, setIsDeleteError }) {
    const {
        userDetails,
        isUserLoggedIn
    } = useContext(UserContext);

    const removeComment = async () => {
        setIsRemoved(true);

        try {
            await deleteComment(commentId);
        }
        catch {
            setIsDeleteError(true);
        }
    }

    if (userDetails.username === author) return (
        <button className="comment-delete" onClick={removeComment}>
           x
        </button>
    );
}