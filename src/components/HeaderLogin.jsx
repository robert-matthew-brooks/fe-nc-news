import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchUser } from '../util/api';
import { UserContext } from '../context/User';
import '../css/HeaderLogin.css';

export default function HeaderLogin() {
    const {
        userDetails,
        setUserDetails,
        isUserLoggedIn,
        setIsUserLoggedIn
    } = useContext(UserContext);
    const [isError, setIsError] = useState(false);

    const login = async event => {
        event.target.disabled = true;

        try {
            const { user } = await fetchUser('tickle122');
            setUserDetails(user);
            setIsUserLoggedIn(true);
        }
        catch {
            setIsError(true);
        }
    }

    if (isError) {
        return <div className="error">Unable to load user</div>;
    }
    else if (isUserLoggedIn) {
        return (
            <Link className="profile-link" to={{ pathname: `/users/${userDetails.username}`}}>
                <img src={userDetails.avatar_url} alt={`${userDetails.username}'s avatar`}/>
            </Link>
        );
    }
    else {
        return (
            <button className="submit-btn" onClick={event => login(event)}>
                Sign In
            </button>
        );
    }
}