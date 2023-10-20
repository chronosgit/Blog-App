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
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Post from './components/Post/Post';
import NewPost from './components/NewPost/NewPost';
import Search from './components/Search/Search';
import Notifications from './components/Notifications/Notifications';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';

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
					<Route path="/" element={<Feed />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/terms-of-use" element={<TermsOfUse />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/home" element={<Home />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/profile/:username" element={<Profile />} />
					<Route path="/settings/:username" element={<Settings />} />
					<Route path="/notifications/:username" element={<Notifications />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/new" element={<NewPost />} />
					<Route path="/search" element={<Search />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App;