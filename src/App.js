import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from './components/About/About';
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import TermsOfUse from './components/TermsOfUse/TermsOfUse';
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

function App() {
	const THEME = createTheme({
		typography: {
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Poppins"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
		},
	});
	return (
		<>
			<div className="App">
				<Header />
				<Footer />
			</div>

			<ThemeProvider theme={THEME}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/terms-of-use" element={<TermsOfUse />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App;