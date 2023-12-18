import { useEffect, useState, useContext } from 'react';

import axios from "axios";

import { Box, Button, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import Posts from '../Posts/Posts';
import { UserContext } from "../../App";

function Profile() {
    const userId = window.location.pathname.slice(9);

    const {user: privateUser} = useContext(UserContext);
    const [isFollowed, setIsFollowed] = useState(privateUser?.follows?.includes(userId));

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [postsType, setPostsType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const profileImageStyle = {
        width: 150,
        height: 150,
        borderRadius: "50%",
    }
    
    const createPostBoxStyles = {
        width: "max-content",
        padding: "0.5rem",
        color: "var(--mainColor)",
        borderRadius: "1rem",
        backgroundColor: "#88DAD4",
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#7cc4bf",
        }
    };

    useEffect(() => {
        const getUserProfile = async () => {
            await axios.get(`http://localhost:3001/user/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        };

        getUserProfile();
    }, [])

    useEffect(() => {
        setIsFollowed(privateUser?.follows?.includes(userId));
    }, [privateUser]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const handleScroll = () => {
        if(isLoading) {
            return;
        }

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            getPosts(postsType, document.documentElement.offsetHeight);
        }
    }

    const getPosts = async (subject, scrollHeight) => {
        setIsLoading(true);

        let requestUrl = "http://localhost:3001";
        let isNewPostType = false;
        if(postsType !== "" && subject !== postsType) {
            setPosts([]);
            isNewPostType = true;
        }

        if(subject === "ownPosts") {
            requestUrl += `/user/${userId}/posts/`;
            setPostsType("ownPosts");
        } else if(subject === "reposts") {
            requestUrl += `/user/${userId}/reposts/`;
            setPostsType("reposts");
        } else if(subject === "likedPosts") {
            requestUrl += `/user/${userId}/liked/`;
            setPostsType("likedPosts");
        } else {
            return;
        }

        let oldPostsLength = posts.length;
        let end = posts.length + 5;
        let start = posts.length + 1;

        if(isNewPostType) { // countermeasure again react async state changes
            oldPostsLength = 0;
            end = 5;
            start = 1;
        }

        await axios.get(
            requestUrl, 
            {
                params: {
                    start,
                    end,
                }
            }
        )
        .then(response => {
            setIsLoading(false);

            if(response.data === "OK") {
                return;
            }

            if(posts.length + response.data.length !== oldPostsLength) {
                window.scrollTo(0, 0); // values are x,y-offset

                setPosts(response.data);
            }
        })
        .catch(error => {
            console.log(error);

            setIsLoading(false);
        });
    };

    const followUser = async () => {
        if(Object.keys(privateUser).length === 0) {
            window.location.href = "/signin";
            return;
        }

        await axios.get("http://localhost:3001/refresh/", 
            {
                withCredentials: true,
                credentials: "include",
            }
        )
        .then(async (response) => {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response.data.accessToken);

            await axios.post(
                "http://localhost:3001/follow/",
                {userId: userId},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response);

                setIsFollowed(prev => !prev);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <Container
            maxWidth="sm" 
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    columnGap: "2rem",
                    width: "100%",
                    marginBottom: 1,
                    paddingBottom: 2,
                    borderBottom: "1px solid black",
                }}
            >
                <img
                    src={`data:image/jpeg;base64,${user.profilePic}`}
                    alt="profileImage"
                    style={profileImageStyle}
                />

                <Box sx={{ py: "1rem" }}>
                    <Typography
                        className="profile_username"
                        component="h1"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                        }}
                    >
                        {user.username}
                    </Typography>

                    <Typography component="h1" sx={{ mb: "1rem" }}>{user.email}</Typography>

                    <Typography paragraph sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {user.bio}
                    </Typography>

                    {
                    (Object.keys(privateUser).length && privateUser.id !== user.id) > 0 &&
                        <Button sx={createPostBoxStyles} onClick={followUser}>
                            {
                            isFollowed ? "Unfollow" : "Follow"
                            }
                        </Button>
                    }
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 2, my: "1rem" }}>
                <Button variant="text" color="secondary" onClick={() => getPosts("ownPosts")}>Own posts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("reposts")}>Reposts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("likedPosts")}>Liked posts</Button>
            </Box>

            {
                posts.length > 0 &&
                    <Posts posts={posts} />
            }

            {
                isLoading && <CircularProgress />
            }
        </Container>
    )
}

export default Profile;