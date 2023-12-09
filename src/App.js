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
		path: "/profile/:id",
	  	element: <Profile context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/feed",
	  	element: <Feed context={UserContext} />,
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
	);
}

export default App;