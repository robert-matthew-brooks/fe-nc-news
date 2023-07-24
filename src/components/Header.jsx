import { Link } from 'react-router-dom';
import { showMenu } from '../util/show-overlay-components';
import HeaderLogin from './HeaderLogin';
import LogoImg from '../img/logo.svg';
import MenuImg from '../img/menu.svg';
import '../css/Header.css';

export default function Header({ isMenuVisible, setIsMenuVisible }) {
    return (
        <header>
            <button
                className="nav__button-open"
                onClick={() => showMenu(!isMenuVisible, setIsMenuVisible)}
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