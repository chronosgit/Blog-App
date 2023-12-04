import { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const UserContext = createContext({});

const router = createBrowserRouter([
	{
	  	path: "/",
	  	element: <Home />,
		errorElement: <NotFound />,
	},
	{
		path: "/about",
		element: <About />,
		errorElement: <NotFound />,
  	},
	{
		path: "/contact",
		element: <Contact />,
		errorElement: <NotFound />,
  	},
	{
		path: "/terms-of-use",
		element: <TermsOfUse />,
		errorElement: <NotFound />,
  	},
	{
		path: "/privacy",
		element: <PrivacyPolicy />,
		errorElement: <NotFound />,
  	},
	{
		path: "/signin",
	  	element: <SignIn context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/signup",
	  	element: <SignUp context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "*",
	  	element: <NotFound />,
		errorElement: <NotFound />,
	},
]);

function App() {
	const [user, setUser] = useState({});
	const [profileImageLink, setProfileImageLink] = useState("");
    const [profileImageSrc, setProfileImageSrc] = useState("");

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

<<<<<<< HEAD
	return (
		<UserContext.Provider value={{user, setUser, profileImageLink, setProfileImageLink, profileImageSrc, setProfileImageSrc}}>
			<div className="App">
				<ThemeProvider theme={THEME}>
					<Header context={UserContext} />

					<Footer />

					<RouterProvider router={router} />
				</ThemeProvider>
			</div>
		</UserContext.Provider>
=======
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
					<Route path="/search/:query" element={<Search />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ThemeProvider>
		</>
>>>>>>> aa5aff0611605b8a8a741094dd8ca0a6a43840ab
	);
}

export default App;