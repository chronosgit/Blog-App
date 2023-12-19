import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import NearMeIcon from '@mui/icons-material/NearMe';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';


import { UserContext } from "../../App";

function Post(props) {
    const {post, hideComment, postView, commentWriter} = props;
    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const [isPostLiked, setIsPostLiked] = useState(post.likes?.includes(user.id));
    const [isPostReposted, setIsPostReposted] = useState(post.reposts?.includes(user.id));
    const [isPostDeleted, setIsPostDeleted] = useState(false);
    const [likesNumber, setLikesNumber] = useState(post?.likes?.length);

    const postCreationDateObject = new Date(Date.parse(post.date));
    const isEditedLabel = post.isEdited ? "edited at" : "";
    const postCreationDateFormatted = `${isEditedLabel} ${postCreationDateObject.getDate()}-${postCreationDateObject.getMonth() + 1}-${postCreationDateObject.getFullYear()} ${postCreationDateObject.getHours()}:${postCreationDateObject.getMinutes()}`;

    const postAuthorStyles = {
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
            color: "purple",
        }
    }

    useEffect(() => {
        setIsPostReposted(post.reposts?.includes(user.id));
        setIsPostLiked(post.likes?.includes(user.id));
        setLikesNumber(post?.likes?.length);
    }, [post, user]);

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
                const status = response.data.status;
                if(status === "liked") {
                    setLikesNumber(prev => prev + 1);
                } else if(status === "unliked") {
                    setLikesNumber(prev => prev - 1);
                }

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
                setIsPostDeleted(true);

                window.location.href = "/feed";
            })
            .catch(error => {
                console.log(error);
            })  
        });
    };

    const handleComment = () => {
        if(Object.keys(user).length === 0) {
            navigate("/signin");
            return;
        }

        navigate(`/comment/${post.id}`);
    }

    const clickUser = (e) => {
        e.stopPropagation();

        navigate(`/profile/${post.author}`);
    }

    return (
        <>
        {
            !isPostDeleted ?
                    Object.keys(post).length ?
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <Box onClick={()=>!postView&&navigate(`/post/${post.id}`)}
                                sx={{
                                    width: "100%",
                                    p: "1rem", 
                                    position: "relative",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    borderRadius: 1, cursor: "pointer" 
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
                                    <Typography sx={postAuthorStyles} onClick={clickUser}>
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

                            {
                                !commentWriter &&
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <Button onClick={handleLike}>
                                                <Typography sx={{ mr: 1 }}>{likesNumber}</Typography>

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
                                                    <Button onClick={handleComment}>
                                                        <Typography sx={{ mr: 1 }}>{post?.comments?.length}</Typography>

                                                        <CommentIcon />
                                                    </Button>
                                            }

                                            {
                                                !postView &&
                                                    <Button href={`/post/${post.id}`} color="info">
                                                        <Tooltip title="View">
                                                            <VisibilityIcon />
                                                        </Tooltip>
                                                    </Button>
                                            }
                                        </ButtonGroup>

                                        <ButtonGroup variant="text" aria-label="text button group">
                                            {
                                                (Object.keys(user).length > 0 && user?.id === post.author) &&
                                                    <Button href={`/post/editor/${post.id}`} color="success">
                                                        <EditIcon />
                                                    </Button>
                                            }

                                            {
                                                (Object.keys(user).length > 0 && user?.id === post.author) &&
                                                    <Button onClick={handleDelete} color="error">
                                                        <DeleteIcon />
                                                    </Button>
                                            }
                                        </ButtonGroup>
                                    </Box>
                            }
                        </Box>
                    :
                        <Typography>Such post doesn't exist or isn't rendered yet</Typography>
            :
                <Box
                    sx={{
                        width: "100%",
                        p: "1rem", 
                        position: "relative",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: 1, 
                    }}
                >
                    Content is deleted
                </Box>
        
        }
        </>
    )
}

export default Post;