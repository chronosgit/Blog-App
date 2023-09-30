import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from './components/About/About';
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";

function App() {
	return (
		<>
			<div className="App">
				<Header />
				<Footer />
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;