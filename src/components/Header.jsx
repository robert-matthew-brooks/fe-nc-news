import HeaderLogin from './HeaderLogin';
import '../css/Header.css';

function Header({ isMenuVisible, setIsMenuVisible }) {
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
  
  export default Header;