import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, Link, Typography } from "@mui/material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Comment(props) {
    const {comment, context} = props;
    const usedContext = useContext(context);
    const {user} = usedContext;

    const navigate = useNavigate();

    const [isCommentLiked, setIsCommentLiked] = useState(comment.likes?.includes(user?.id));
    const [likesNumber, setLikesNumber] = useState(comment.likes?.length);

    const postId = window.location.pathname.slice(6);

    const commentDateObject = new Date(Date.parse(comment.date));
    const isEditedLabel = comment.isEdited ? "edited at" : "";
    const commentDate = `${isEditedLabel} ${commentDateObject.getDate()}-${commentDateObject.getMonth() + 1}-${commentDateObject.getFullYear()} ${commentDateObject.getHours()}:${commentDateObject.getMinutes()}`;

    useEffect(() => {
        setIsCommentLiked(comment.likes?.includes(user?.id));
        setLikesNumber(comment.likes?.length);
    }, [comment]);

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
                const status = response.data.status;
                if(status === "liked") {
                    setLikesNumber(prev => prev + 1);
                } else if(status === "unliked") {
                    setLikesNumber(prev => prev - 1);
                }

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
                <Box>
                    <Link href={`/profile/${comment.authorId}`} underline="none" sx={{ display: "flex", alignItems: "center", gap: "1rem", mb: "1rem", color: "var(--mainColor)" }}>
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
                    </Link>
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
                    <Typography sx={{ mr: 1 }}>{likesNumber}</Typography>

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