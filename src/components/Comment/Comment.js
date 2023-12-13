import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, Typography } from "@mui/material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Comment(props) {
    const {comment, context} = props;
    const usedContext = useContext(context);
    const {user} = usedContext;

    const navigate = useNavigate();

    const [isCommentLiked, setIsCommentLiked] = useState(comment.isLiked);

    const postId = window.location.pathname.slice(6);

    const commentDateObject = new Date(Date.parse(comment.date));
    const commentDate = `${commentDateObject.getDate()}-${commentDateObject.getMonth()}-${commentDateObject.getFullYear()}`;

    const handleLike = async () => {
        if(Object.keys(user).length === 0) {
            navigate("/signin");
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
                "http://localhost:3001/comment/like/",
                {commentId: comment.id},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                }
            )
            .then(response => {
                console.log(response);

                setIsCommentLiked(previous => !previous);
            })
            .catch(error => {
                console.log(error);
            })  
        });
    }

    const handleDelete = async () => {
        await axios.get("http://localhost:3001/refresh/", 
            {
                withCredentials: true,
                credentials: "include",
            }
        )
        .then(async (response) => {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response.data.accessToken);

            await axios.delete(
                `http://localhost:3001/${postId}/comment/${comment.id}`,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response);

                window.location.href= `/post/${postId}`;
            })
            .catch(error => {
                console.log(error);
            })  
        });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mb: "3rem" }}>
            <Box sx={{ p: "1rem", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mb: "1rem" }}>
                    <img
                        src={`data:image/jpeg;base64,${comment.authorProfilePic}`}
                        alt="profileImage"
                        style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                        }}
                    />

                    <Typography sx={{ fontWeight: 600 }}>
                        {comment.authorUsername}
                    </Typography>
                </Box>

                <Typography paragraph sx={{ mb: "3rem" }}>
                    {comment.text}
                </Typography>

                <Typography sx={{ fontSize: "0.8rem", opacity: 0.9 }}>
                    {commentDate}
                </Typography>
            </Box>

            <Box>
                <Button onClick={handleLike}>
                    {
                        isCommentLiked ?
                            <FavoriteOutlinedIcon /> // filled
                        :
                            <FavoriteBorderOutlinedIcon /> // otlined
                    }
                </Button>

                {
                    (Object.keys(user).length > 0 && user?.id === comment.authorId) &&
                        <Button href={`/comment/editor/${comment.id}`} color="success">
                            <EditIcon />
                        </Button>
                }

                {
                    (Object.keys(user).length > 0 && user?.id === comment.authorId) &&
                        <Button onClick={handleDelete} color="error">
                            <DeleteIcon />
                        </Button>
                }
            </Box>
        </Box>
    )
}

export default Comment;