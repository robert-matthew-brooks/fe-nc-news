import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../util/api';
import { capitalise } from '../util/format';
import CrossImg from '../img/cross.svg';
import '../css/Menu.css';

const menuItemsTop = [
    { text: 'Welcome', path: '/' },
    { text: 'Latest Articles', path: '/articles' }
];
const menuItemsBottom = [
    { text: 'Placeholder', path: '/' },
    { text: 'Placeholder', path: '/' },
    { text: 'Placeholder', path: '/' }
];

export default function Menu({ isMenuVisible, setIsMenuVisible }) {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const mapMenuItems = menuItems => {
        return menuItems.map((menuItem, i) => {
            return (
                <Link
                    key={i}
                    onClick={() => setIsMenuVisible(false)}
                    to={{ pathname: menuItem.path, search: menuItem.query }}
                >
                    {menuItem.text}
                </Link>
            );
        })
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const { topics } = await fetchTopics();
                setTopics(topics);
            }
            catch {
                setIsError(true);
            }

            setIsLoading(false);
        })();
    }, []);

    return (
        <>
            <div
                className={`menu-overlay ${isMenuVisible ? '' : 'hidden'}`}
                onClick={() => setIsMenuVisible(false)}
            >
            </div>

            <nav className={isMenuVisible ? '' : 'closed'}>
                <button
                    className="menu-btn"
                    onClick={() => {setIsMenuVisible(!isMenuVisible)}}
                >
                    <img src={CrossImg} alt="close menu" />
                </button>

                {mapMenuItems(menuItemsTop)}

                <hr />

                {mapMenuItems(
                    topics.map(topic => {
                        return {
                            text: capitalise(topic.slug),
                            path: `/topics/${topic.slug}`
                        }
                    }
                ))}

                <hr />

                {mapMenuItems(menuItemsBottom)}
            </nav>
        </>
    )
}