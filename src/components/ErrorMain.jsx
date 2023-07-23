import { Link } from 'react-router-dom';
import '../css/ErrorMain.css';
import SadCat from '../img/404.jpeg';

export default function ErrorMain() {
    return (
        <main className="error-main">
            <h1>Whoops!</h1>

            <img src={SadCat} alt="cat is sad because page not found" />

            <h2>404 Page Not Found</h2>

            <Link to={{pathname: '/'}}>Go to the Home page</Link>
        </main>
    );
}