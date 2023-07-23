import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
import Homepage from './Homepage.jsx';
import Articles from './Articles.jsx';
import Article from './Article.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import ErrorMain from './ErrorMain.jsx';
import '../css/App.css';

export default function App() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

	return (
		<div className="app">
			<Menu isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
			<Header isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/articles" element={<Articles />} />
				<Route path="/topics/:topic" element={<Articles />} />
				<Route path="/articles/:article_id" element={<Article />} />
				<Route path="*" element={<ErrorMain />} />
			</Routes>

			<Sidebar />
			<Footer />
		</div>
	);
}