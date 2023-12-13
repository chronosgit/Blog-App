import { useEffect, useState } from "react";

import axios from "axios";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import Post from "../Post/Post";

function CommentWriter(props) {
    const {context} = props;

    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const postId = window.location.pathname.slice(9);

    useEffect(() => {
        const getPost = async () => {
            await axios.get(`http://localhost:3001/post/${postId}/`)
            .then(response => {
                setPost(response.data)
            })
            .catch(error => {
                console.log(error);
            })
        }

        getPost();
    }, [])

    const makeComment = async () => {
        if(comment.length <= 0 || comment.length > 1000) {
            setErrorMessage("Your comment should be from 1 to 1000 characters");

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
                "http://localhost:3001/comment/",
                {postId: postId, comment: comment},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                setComment("");

                window.location.href=`/post/${post.id}`;
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <Container sx={{ width: "75%" }}>
            <Post post={post} context={context} hideComment />

            <Box sx={{ display: "flex", alignItems: "stretched", gap: "1rem", mt: "5rem" }}>
                <TextField
                    value={comment} 
                    label="Your comment..." 
                    variant="outlined" 
                    multiline 
                    fullWidth
                    onChange={e => {setComment(e.target.value); setErrorMessage("")}}
                />

                <Button variant="contained" onClick={makeComment} >
                    Comment
                </Button>
            </Box>

            {
                errorMessage.length > 0 &&
                    <Typography sx={{ color: "darkred" }}>
                        {errorMessage}
                    </Typography>
            }
        </Container>
    )
}

export default CommentWriter;