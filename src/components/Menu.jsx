import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetchTopics } from '../util/api.js';
import { preventScroll } from '../util/scroll.js';
import { capitalise } from '../util/format.js';
import Loading from './Loading.jsx';
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
                    onClick={() => {preventScroll(false); setIsMenuVisible(false)}}
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
                const { topics } = await apiFetchTopics();
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
                className={`nav__overlay ${!isMenuVisible && 'hidden'}`}
                onClick={() => {preventScroll(false); setIsMenuVisible(false)}}
            >
            </div>

            <nav className={!isMenuVisible ? 'nav--closed' : undefined}>
                <button
                    className="nav__button-close"
                    onClick={() => {preventScroll(false); setIsMenuVisible(false)}}
                >
                    <img src={CrossImg} alt="close menu" />
                </button>

                {mapMenuItems(menuItemsTop)}

                <hr />

                <Loading isLoading={isLoading}>
                    {mapMenuItems(
                        topics.map(topic => {
                            return {
                                text: capitalise(topic.slug),
                                path: `/topics/${topic.slug}`
                            }
                        }
                    ))}
                </Loading>

                <hr />

                {mapMenuItems(menuItemsBottom)}
            </nav>
        </>
    )
}