import { Link } from 'react-router-dom';
import { scrollToTop } from '../util/scroll-to-top';
import '../css/Footer.css';

export default function Footer() {
    return (
        <footer>
            <Link to="#" onClick={scrollToTop}>&#9652;Top</Link>
            <a href="https://github.com/robert-matthew-brooks/fe-nc-news">GitHub</a>
        </footer>
    )
  }