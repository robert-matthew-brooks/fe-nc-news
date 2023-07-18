import { Link } from 'react-router-dom';
import '../css/Menu.css';

const menuItems = [
    {
        text: 'Latest',
        path: '/articles'
    }
];

export default function Menu({ isMenuVisible, setIsMenuVisible }) {
    return (
        <nav className={isMenuVisible ? '' : 'hidden'}>
            {menuItems.map((menuItem, i) => {
                return (
                    <Link key={i} to={{ pathname: menuItem.path }} onClick={() => setIsMenuVisible(false)}>
                        {menuItem.text}
                    </Link>
                );
            })}
            <button onClick={() => {setIsMenuVisible(!isMenuVisible)}}>X</button>
        </nav>
    )
}