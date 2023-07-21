import { useContext } from 'react';
import { deleteComment } from '../util/api';
import { UserContext } from '../context/User';
import '../css/CommentsCardDelete.css';

export default function CommentsCardDelete({ comment_id, author, setIsRemoved, setIsDeleteError }) {
    const {
        userDetails,
        isUserLoggedIn
    } = useContext(UserContext);

    const removeComment = async () => {
        setIsRemoved(true);

        try {
            await deleteComment(comment_id);
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