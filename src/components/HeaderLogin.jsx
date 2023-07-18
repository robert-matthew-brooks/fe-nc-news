import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../util/api';
import { UserContext } from '../context/User';

export default function HeaderLogin() {
    const {
        userDetails,
        setUserDetails,
        isUserLoggedIn,
        setIsUserLoggedIn
    } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const { user } = await apiRequest('/users/tickle122');
            setUserDetails(user);
            setIsUserLoggedIn(true);
        })();
    }, []);

    if (isUserLoggedIn) {
        return (
            <Link to={{ pathname: `/users/${userDetails.username}`}}>
                <img src={userDetails.avatar_url} alt={`${userDetails.username}'s avatar`}/>
            </Link>
        );
    }
    else {
        return (
            <Link to={{ pathname: '/login'}}>
                Login
            </Link>
        );
    }
}