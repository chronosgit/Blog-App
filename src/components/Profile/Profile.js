import { useEffect, useState } from 'react';

import axios from "axios";

import { Box, Button, Typography } from '@mui/material';

function Profile(props) {
    const [user, setUser] = useState({});

    const profileImageStyle = {
        width: 150,
        height: 150,
        borderRadius: "50%",
    }
    
    useEffect(() => {
        const userId = window.location.pathname.slice(9);

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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    columnGap: "2rem",
                    maxWidth: "50%",
                    minWidth: "30%",
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
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    columnGap: 2,
                }}
            >
                <Button variant="text" color="secondary">Show Reposts</Button>
                <Button variant="text" color="secondary">Show Liked</Button>
                <Button variant="text" color="secondary">Show Disliked</Button>
            </Box>
        </Box>
    )
}

export default Profile;