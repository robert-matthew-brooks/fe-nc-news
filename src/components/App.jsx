import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Menu from './Menu.jsx';
import Articles from './Articles.jsx';
import Article from './Article.jsx';
import Footer from './Footer.jsx';
import '../css/App.css';

export default function App() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

	return (
		<div className="app">
			<Header isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
			<Menu isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />

			<Routes>
				<Route path="/articles" element={<Articles />} />
				<Route path="/articles/:article_id" element={<Article />} />
			</Routes>

			<Footer />
		</div>
	);
}