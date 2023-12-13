import axios from "axios";

import { Box } from "@mui/material";

import Post from "../Post/Post";

function Posts(props) {
    const {posts, context} = props;

    return (
        posts.length > 0 ?
            <Box 
                sx={{ 
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "space-between", 
                    gap: 5, 
                    width: "100%" 
                }}
            >
                {
                    posts.map((post, index) => {
                        return (
                            <Post key={index} id={`post_${index}`} post={post} context={context} />
                        )
                    })
                }
            </Box>
        :
            <></>
    )
}

export default Posts;