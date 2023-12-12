import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { Box, Button, Container, Typography } from '@mui/material';

import Posts from '../Posts/Posts';

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const userId = window.location.pathname.slice(9);

    const profileImageStyle = {
        width: 150,
        height: 150,
        borderRadius: "50%",
    }

    const getUserProfile = async () => {
        await axios.get(`http://localhost:3001/user/${userId}`)
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    };
    
    useEffect(() => {
        getUserProfile();
    }, [])

    const getPosts = async (subject) => {
        let requestUrl = "http://localhost:3001";
        if(subject === "yourPosts") {
            requestUrl += `/user/${userId}/posts/`;
        } else if(subject === "reposts") {
            requestUrl += "";
        } else if(subject === "likedPosts") {
            requestUrl += "";
        } else {
            return;
        }

        await axios.get(requestUrl)
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => {
            console.log(error);
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
                window.location.href = "/";
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

                    <Typography paragraph>{user.bio}</Typography>

                    <input id="pfpInput" type="file" accept="image/jpeg, image/png, image/jpg" onChange={uploadProfilePicture} />
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 2, my: "1rem" }}>
                <Button variant="text" color="secondary" onClick={() => getPosts("yourPosts")}>Your posts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("reposts")}>Reposts</Button>
                <Button variant="text" color="secondary" onClick={() => getPosts("likedPosts")}>Liked posts</Button>
            </Box>

            {
                posts.length > 0 && 
                    <Box sx={{ width: "100%" }}>
                        <Posts posts={posts} />
                    </Box>
            }
        </Container>
    )
}

export default Profile;