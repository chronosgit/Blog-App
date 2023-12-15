import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Box, Container } from "@mui/material";

import Post from "../Post/Post";
import Comment from "../Comment/Comment";

function PostView(props) {
    const {context} = props;
    const usedContext = useContext(context);
    const {user} = usedContext;

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const postId = window.location.pathname.slice(6);

    useEffect(() => {
        const getPost = async () => {
            await axios.get(`http://localhost:3001/post/${postId}/`)
            .then(async (response) => {
                setPost(response.data);

                await axios.get(
                    `http://localhost:3001/comments/${postId}/`,
                )
                .then(response => {
                    setComments(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });
        }

        getPost();
    }, []);

    return (
        <Container maxWidth="lg">
            <Post post={post} context={context} postView />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", mt: "5rem" }}>
                {
                    comments?.length > 0 && 
                    comments.map((comment, index) => {
                        return (
                            <Comment key={index} comment={comment} context={context} />
                        )
                    })
                }
            </Box>
        </Container>
    )
}
export default PostView;