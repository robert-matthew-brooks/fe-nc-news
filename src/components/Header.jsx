import { Link } from 'react-router-dom';
import { preventScroll } from '../util/scroll.js';
import HeaderLogin from './HeaderLogin.jsx';
import LogoImg from '../img/logo.svg';
import MenuImg from '../img/menu.svg';
import '../css/Header.css';

export default function Header({ setIsMenuVisible }) {
    return (
        <header>
            <button
                className="nav__button-open"
                onClick={() => {preventScroll(true); setIsMenuVisible(true)}}
            >
                <img src={MenuImg} alt="open menu" />
            </button>
            
            <Link className="logo" to={{ pathname: '/articles'}}>
                <img
                    src={LogoImg}
                    alt="nc news logo"
                />
                <h2>NC News</h2>
            </Link>
            
            <HeaderLogin />
        </header>
    );
}