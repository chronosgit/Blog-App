import { createContext, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import axios from 'axios';

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
import Writer from "./components/Writer/Writer";
import CommentWriter from "./components/CommentWriter/CommentWriter";
import Editor from "./components/Editor/Editor";
import PostView from "./components/PostView/PostView";
import CommentEditor from './components/CommentEditor/CommentEditor';

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
		path: "/writer",
	  	element: <Writer context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/comment/:postId",
	  	element: <CommentWriter context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/post/editor/:postId",
	  	element: <Editor context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/post/:postId",
	  	element: <PostView context={UserContext} />,
		errorElement: <NotFound />,
	},
	{
		path: "/comment/editor/:postId",
	  	element: <CommentEditor context={UserContext} />,
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

	useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            await axios.get("http://localhost:3001/refresh/", {
                withCredentials: true,
                credentials: "include",
            })
            .then(async (response) => {
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", response.data.accessToken);

				await axios.get("http://localhost:3001/user/", {
					signal: controller.signal,
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
						"Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
					},
				})
				.then(response => {
					setUser(response.data);
					setProfileImageLink(`/profile/${response.data.id}`);
					setProfileImageSrc('data:image/jpeg;base64,' + response.data.profilePic);

					isMounted && setUser(response.data);
				})
				.catch(error => {
					console.log(error);
				});
            })
            .catch(error => {
                console.log(error);
            });
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

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