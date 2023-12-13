import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import NearMeIcon from '@mui/icons-material/NearMe';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Post(props) {
    const {post, hideComment, context} = props;
    const usedContext = useContext(context);
    const {user} = usedContext;

    const navigate = useNavigate();

    const [isPostLiked, setIsPostLiked] = useState(post.isLiked);
    const [isPostReposted, setIsPostReposted] = useState(post.isReposted);

    const postCreationDateObject = new Date(Date.parse(post.date));
    const postCreationDateFormatted = `${postCreationDateObject.getDate()}-${postCreationDateObject.getMonth()}-${postCreationDateObject.getFullYear()}`;

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
            console.log(post)
            await axios.post(
                "http://localhost:3001/like/",
                {postId: post.id},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                }
            )
            .then(response => {
                console.log(response);

                setIsPostLiked(previous => !previous);
            })
            .catch(error => {
                console.log(error);
            })  
        });
    };

    const handleRepost = async () => {
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
                "http://localhost:3001/repost/",
                {postId: post.id},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response);

                setIsPostReposted(previous => !previous);
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
                `http://localhost:3001/post/${post.id}`,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response);

                window.location.href= "/feed";
            })
            .catch(error => {
                console.log(error);
            })  
        });
    };

    return (
        <>
        <Box
            sx={{
                width: "100%",
                mb: "1rem",
                p: "1rem", 
                position: "relative",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 1, 
            }}
        >
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    fontSize: "0.9rem", 
                    textTransform: "uppercase" 
                }}
            >
                <Typography>
                    By {post?.authorUsername}
                </Typography>

                <Typography>
                    {postCreationDateFormatted}
                </Typography>
            </Box>

            <Typography 
                sx={{
                    my: "1rem",
                    p: 0.5,
                    width: "fit-content",
                    fontSize: "0.7rem",
                    backgroundColor: "var(--mainColor)",
                    color: "var(--backgroundColor)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 1,
                    textTransform: "uppercase", 
                }}
            >
                {post?.topic}
            </Typography>

            <Typography 
                sx={{ 
                    my: "1rem",
                    fontSize: "1.5rem", 
                    fontWeight: 600, 
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                }}
            >
                {post?.title}
            </Typography>

            <Typography sx={{ textAlign: "justify" }}>
                {post?.text}
            </Typography>
        </Box>

        <Box>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={handleLike}>
                    {
                        isPostLiked ?
                            <FavoriteOutlinedIcon /> // filled
                        :
                            <FavoriteBorderOutlinedIcon /> // otlined
                    }
                </Button>

                <Button onClick={handleRepost}>
                    {
                        isPostReposted ?
                            <NearMeIcon /> // filled
                        :
                            <NearMeOutlinedIcon /> // otlined
                    }
                </Button>

                {
                    !hideComment &&
                        <Button onClick={() => navigate(`/comment/${post.id}`)}>
                            <CommentIcon />
                        </Button>
                }

                {
                    (Object.keys(user).length > 0 && user?.id === post.author) &&
                        <Button onClick={() => navigate(`/editor/${post.id}`)}>
                            <EditIcon />
                        </Button>
                }

                {
                    (Object.keys(user).length > 0 && user?.id === post.author) &&
                        <Button onClick={handleDelete}>
                            <DeleteIcon />
                        </Button>
                }
            </ButtonGroup>
        </Box>
        </>
    )
}

export default Post;