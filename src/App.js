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
import PostWriter from "./components/PostWriter/PostWriter";
import CommentWriter from "./components/CommentWriter/CommentWriter";
import PostView from "./components/PostView/PostView";
import CommentEditor from './components/CommentEditor/CommentEditor';
import ProfileEditor from "./components/ProfileEditor/ProfileEditor";
import ProfilePrivate from "./components/ProfilePrivate/ProfilePrivate";
import PostEditor from './components/PostEditor/PostEditor';

export const UserContext = createContext({});

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
	  	element: <SignIn />,
		errorElement: <NotFound />,
	},
	{
		path: "/signup",
	  	element: <SignUp />,
		errorElement: <NotFound />,
	},
	{
		path: "/profile/:id",
	  	element: <Profile />,
		errorElement: <NotFound />,
	},
	{
		path: "/profile/your/:id",
	  	element: <ProfilePrivate />,
		errorElement: <NotFound />,
	},
	{
		path: "/feed",
	  	element: <Feed />,
		errorElement: <NotFound />,
	},
	{
		path: "/writer",
	  	element: <PostWriter />,
		errorElement: <NotFound />,
	},
	{
		path: "/comment/:postId",
	  	element: <CommentWriter />,
		errorElement: <NotFound />,
	},
	{
		path: "/post/editor/:postId",
	  	element: <PostEditor />,
		errorElement: <NotFound />,
	},
	{
		path: "/post/:postId",
	  	element: <PostView />,
		errorElement: <NotFound />,
	},
	{
		path: "/comment/editor/:postId",
	  	element: <CommentEditor />,
		errorElement: <NotFound />,
	},
	{
		path: "/profile/editor/:userId",
	  	element: <ProfileEditor />,
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
					<Header />

					<Footer />

					<RouterProvider router={router} />
				</ThemeProvider>
			</div>
		</UserContext.Provider>
	);
}

export default App;