import HeaderLogin from './HeaderLogin';
import '../css/Header.css';

export default function Header({ isMenuVisible, setIsMenuVisible }) {
    return (
        <header>
            <button onClick={() => setIsMenuVisible(!isMenuVisible)}>
                &equiv;
            </button>
            <div>
                NC News
            </div>
            <HeaderLogin />
        </header>
    )
}