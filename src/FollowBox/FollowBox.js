import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Box, Button, Typography } from "@mui/material";

import { UserContext } from "../App";

function FollowBox(props) {
    const {user} = props;
    const {user: privateUser} = useContext(UserContext);

    const [isFollowed, setIsFollowed] = useState(privateUser?.follows?.includes(user.id));

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

    const profileImageStyle = {
        width: 50,
        height: 50,
        borderRadius: "50%",
    }

    useEffect(() => {
        setIsFollowed(privateUser?.follows?.includes(user.id));
    }, [privateUser]);

    const followUser = async (followId) => {
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
                {userId: user.id},
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
        <Box sx={{ my: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
            <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="pfp" style={profileImageStyle} />

            <Typography>{user.username}</Typography>

            {
            (Object.keys(privateUser).length && privateUser.id !== user.id) > 0 &&
                <Button sx={createPostBoxStyles} onClick={followUser}>
                    {
                    isFollowed ? "Unfollow" : "Follow"
                    }
                </Button>
            }
        </Box>
    )
}

export default FollowBox;