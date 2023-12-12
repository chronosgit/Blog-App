import { Box, Typography } from "@mui/material";

function Post(props) {
    const {post} = props;

    return (
        <Box
            sx={{
                width: "100%",
                p: "1rem", 
                position: "relative",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 1, 
            }}
        >
            <Typography sx={{ fontSize: "0.9rem", textTransform: "uppercase" }}>
                By {post.authorUsername}
            </Typography>

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
                {post.topic}
            </Typography>

            <Typography 
                sx={{ 
                    my: "1rem",
                    fontSize: "1.5rem", 
                    fontWeight: 600, 
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                }}
            >
                {post.title}
            </Typography>

            <Typography sx={{ textAlign: "justify" }}>
                {post.text}
            </Typography>
        </Box>
    )
}

export default Post;