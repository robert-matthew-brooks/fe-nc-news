import { Link } from 'react-router-dom';
import CrossImg from '../img/cross.svg';
import '../css/Menu.css';

const menuItems = [
    {
        text: 'Welcome',
        path: '/'
    },
    {
        text: 'Latest Articles',
        path: '/articles'
    }
];

export default function Menu({ isMenuVisible, setIsMenuVisible }) {
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
                {menuItems.map((menuItem, i) => {
                    return (
                        <Link
                            key={i}
                            onClick={() => setIsMenuVisible(false)}
                            to={{ pathname: menuItem.path }}
                        >
                            {menuItem.text}
                        </Link>
                    );
                })}
            </nav>
        </>
    )
}