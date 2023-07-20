import Title from './Title.jsx';
import HomepageImg from '../img/homepage.jpg';
import '../css/Homepage.css';

export default function Homepage() {
    return (
        <main className="homepage">
            <Title title="Welcome to NC News" />
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, ipsa officiis culpa dolore optio rerum reprehenderit, recusandae ea deserunt molestiae quis numquam? Esse, error ipsum. Tempore ullam aut quam velit.
            </p>
            <p>
                <img src={HomepageImg} alt="looking through a curled up newspaper" />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus et rerum necessitatibus quos dicta iste, itaque iusto. Quas dicta ab autem consectetur necessitatibus? Quam illum amet officia voluptatem, alias enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perspiciatis cumque repudiandae sunt reprehenderit ea exercitationem dolorum aliquid, perferendis voluptatibus, reiciendis ab possimus quo? Modi excepturi officiis sapiente dolores magni? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo enim laudantium beatae tempora quisquam nisi quaerat voluptatem placeat exercitationem nihil a, ut sunt molestias veniam accusamus ipsa harum natus. In?
            </p>
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus et rerum necessitatibus quos dicta iste, itaque iusto. Quas dicta ab autem consectetur necessitatibus? Quam illum amet officia voluptatem, alias enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perspiciatis cumque repudiandae sunt reprehenderit ea exercitationem dolorum aliquid, perferendis voluptatibus, reiciendis ab possimus quo? Modi excepturi officiis sapiente dolores magni? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo enim laudantium beatae tempora quisquam nisi quaerat voluptatem placeat exercitationem nihil a, ut sunt molestias veniam accusamus ipsa harum natus. In?
            </p>
        </main>
    );
}