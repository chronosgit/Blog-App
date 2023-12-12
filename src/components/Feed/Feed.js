import { useState } from "react";

import axios from "axios";

import { Box, Link, BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';

function Feed() {
    const [activeFilter, setActiveFilter] = useState("time");

    const createPostBoxStyles = {
        position: "absolute",
        right: "10rem",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#88DAD4",
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#7cc4bf",
        }
    }

    const filterPosts = async (e) => {
        console.log(activeFilter);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box sx={createPostBoxStyles}>
                <Link href="/writer" underline="none" color="var(--mainColor)">Make a post</Link>
            </Box>

            <BottomNavigation
                showLabels
                value={activeFilter}
                onChange={(event, newValue) => {
                    setActiveFilter(newValue);
                }}
            >
                <BottomNavigationAction label="By time" icon={<AccessTimeIcon />} value="time" onClick={filterPosts} />

                <BottomNavigationAction label="By likes" icon={<ThumbUpIcon />} value="likes" onClick={filterPosts} />

                <BottomNavigationAction label="By reposts" icon={<ReplyIcon />} value="reposts" onClick={filterPosts} />
            </BottomNavigation>
        </Box>
    )
}

export default Feed;