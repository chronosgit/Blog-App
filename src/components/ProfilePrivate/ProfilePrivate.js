import { useContext, useEffect, useState } from 'react';

import axios from "axios";

import { Box, Button, Container, Link, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';

import Posts from '../Posts/Posts';
import { UserContext } from '../../App';
import FollowBox from '../../FollowBox/FollowBox';

function ProfilePrivate() {
    const {user, setUser, setProfileImageLink, setProfileImageSrc} = useContext(UserContext);

    const [posts, setPosts] = useState([]);
    const [postsType, setPostsType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const userId = window.location.pathname.slice(14);

    const profileImageStyle = {
        width: 150,
        height: 150,
        borderRadius: "50%",
    };

    const createPostBoxStyles = {
        width: "max-content",
        mt: "1rem",
        padding: "0.5rem",
        borderRadius: "1rem",
        backgroundColor: "#88DAD4",
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#7cc4bf",
        }
    };
    
    useEffect(() => {
        const getUser = async () => {
            await axios.get("http://localhost:3001/refresh/", {
                withCredentials: true,
                credentials: "include",
            })
            .then(async (response) => {
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", response.data.accessToken);

				await axios.get("http://localhost:3001/user/", {
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
						"Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
					},
				})
				.then(response => {
					setUser(response.data);
					setProfileImageLink(`/profile/your/${response.data.id}`);
					setProfileImageSrc('data:image/jpeg;base64,' + response.data.profilePic);

					setUser(response.data);
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
    }, [])

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
        } else if(subject === "follows") {
            requestUrl += `/user/${userId}/follows/`;
            setPostsType("follows");
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

    const uploadProfilePicture = async () => {
        await axios.get("http://localhost:3001/refresh/", 
            {
                withCredentials: true,
                credentials: "include",
            }
        )
        .then(async (response) => {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response.data.accessToken);

            const pfpInput = document.getElementById("pfpInput");
            const imageFile = pfpInput.files[0];

            await axios.put(
                "http://localhost:3001/upload/profilePicture/", 
                {imageFile},
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                window.location.reload();
                //window.location.href = "/";
            })
            .catch(error => {
                console.log(error);
            })  
        })
        .catch(error => {
            console.log(error);
        })
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
                    alignItems: "center",
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

                    <Typography component="h1" sx={{ mt: "1rem", mb: ".5rem" }}><b>Email:</b> {user.email}</Typography>
                    <Typography component="h1" sx={{ mt: "1rem", mb: ".5rem" }}><b>About:</b></Typography>

                    <Typography paragraph sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                        {user.bio}

                        {
                        Object.keys(user).length > 0 && user.id === userId &&
                        <Button href={`/profile/editor/${userId}`} color="primary">
                            <EditIcon />
                        </Button>
                        }
                    </Typography>

                    <Typography component="h1" sx={{ mt: "1rem", mb: ".5rem" }}><b>Profile picture:</b></Typography>
                    {
                    Object.keys(user).length > 0 && user.id === userId &&
                        <input id="pfpInput" type="file" accept="image/jpeg, image/png, image/jpg" onChange={uploadProfilePicture} />
                    }

                    {
                    Object.keys(user).length > 0 && user.id === userId &&
                        <Box sx={createPostBoxStyles}>
                            <Link href="/writer" underline="none" color="var(--mainColor)">New post</Link>
                        </Box>
                    }
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 2, my: "1rem" }}>
                <Button variant="text" color="secondary" onClick={() => getPosts("ownPosts")}>Your posts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("reposts")}>Reposts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("likedPosts")}>Liked posts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("follows")}>Follows</Button>
            </Box>

            {
                posts.length > 0 &&
                    postsType !== "follows" ?
                        <Posts posts={posts} />
                    :
                        posts.map((user, index) => {
                            return (
                                <FollowBox user={user} />
                            )
                        })
            }

            {
                isLoading && <CircularProgress />
            }
        </Container>
    )
}

export default ProfilePrivate;