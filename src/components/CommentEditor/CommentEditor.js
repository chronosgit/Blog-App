import { useEffect, useState } from "react";

import axios from "axios";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

function CommentEditor(props) {
    const [message, setMessage] = useState({
        text: "",
        isError: false,
    });
    const [comment, setComment] = useState("");

    const commentId = window.location.pathname.slice(16);

    useEffect(() => {
        const getComment = async () => {
            await axios.get(`http://localhost:3001/comment/${commentId}/`)
            .then(response => {
                setComment(response.data.text);
            })
            .catch(error => {
                console.log(error);
            })
        }

        getComment();
    }, []);

    const handleMessageUpdate = (status, errorMessage) => {
        let messageText = "";
        let isMessageError = true;

        if(status === "updateSuccess") {
            messageText = "Your comment is successfuly updated! You can update it again right way!";
            isMessageError = false;
        } else if(status === "commentError") {
            messageText = "Your comment should be from 1 to 1000 characters";
        } else if(status === "axiosError") {
            messageText = errorMessage;
        }

        setMessage({text: messageText, isError: isMessageError});
    };

    const clearMessage = () => {
        setMessage({text: "", isError: false});
    }

    const updateComment = async () => {
        if(comment.length <= 0 || comment.length > 1000) {
            handleMessageUpdate("commentError");
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

            await axios.put(
                `http://localhost:3001/comment/${commentId}/`,
                {comment: comment},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                handleMessageUpdate("updateSuccess");
            })
            .catch(error => {
                console.log(error);

                if(error.code === 'ERR_BAD_REQUEST') {
                    handleMessageUpdate("axiosError", error.message);
                } else {
                    handleMessageUpdate("axiosError", error.response?.data?.error);
                }
            });
        })
        .catch(error => {
            console.log(error);
            
            if(error.code === 'ERR_BAD_REQUEST') {
                handleMessageUpdate("axiosError", error.message);
            } else {
                handleMessageUpdate("axiosError", error.response?.data?.error);
            }
        });
    }

    return (
        <Container maxWidth="md">
            <Typography gutterBottom sx={{ fontSize: "1.2rem", fontWeight: "600" }}>Update your comment:</Typography>

            <TextField
                value={comment}
                label="Text" 
                variant="outlined" 
                multiline 
                fullWidth 
                margin="normal"
                onChange={e => setComment(e.target.value)}
            />

            {
                message.text.length > 0 &&
                    <Typography sx={{ my: 1, color: message.isError ? "red" : "green" }}>{message.text}</Typography>
            }

            <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button variant="contained" onClick={updateComment}>Update</Button>

                <Button variant="outlined" onClick={() => {setComment(""); clearMessage()}}>Clear inputs</Button>
            </Box>
        </Container>
    )
}

export default CommentEditor;