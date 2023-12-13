import { useEffect, useState } from "react";

import axios from "axios";

import { Container } from "@mui/material";

import Post from "../Post/Post";

function CommentWriter(props) {
    const {context} = props;

    const [post, setPost] = useState({});

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

    return (
        <Container sx={{ width: "75%" }}>
            <Post post={post} context={context} hideComment />
        </Container>
    )
}

export default CommentWriter;