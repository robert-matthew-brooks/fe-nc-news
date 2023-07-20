import { Link } from 'react-router-dom';
import HeaderLogin from './HeaderLogin';
import MenuImg from '../img/menu.svg';
import '../css/Header.css';

export default function Header({ isMenuVisible, setIsMenuVisible }) {
    return (
        <header>
            <button
                className="menu-btn"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
                <img src={MenuImg} alt="open menu" />
            </button>
            <Link className="logo" to={{ pathname: '/'}}>
                <h2>NC News</h2>
            </Link>
            <HeaderLogin />
        </header>
    );
}