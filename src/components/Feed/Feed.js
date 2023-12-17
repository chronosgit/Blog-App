import { useEffect, useState } from "react";

import axios from "axios";

import { BottomNavigation, BottomNavigationAction, Typography, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import CircularProgress from '@mui/material/CircularProgress';

import Posts from "../Posts/Posts";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("time");
    const [isLoading, setIsLoading] = useState(false);
    let prevScrollY = 0;

    useEffect(() => {
        const getPostsActivator = async () => {
            await getPosts("time", 0);
        }

        console.log("Fetch");

        getPostsActivator();
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const handleScroll = () => {
        if(isLoading) {
            return;
        }
        //console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            prevScrollY = window.scrollY;
            getPosts(activeFilter, document.documentElement.offsetHeight);
        }
    }

    const getPosts = async (clickedFilter, scrollHeight) => {
        setIsLoading(true);
        let isNewFilter = false;

        if(activeFilter !== "" && clickedFilter !== activeFilter) {
            setPosts([]);
            isNewFilter = true;
        }

        let oldPostsLength = posts.length;
        let end = posts.length + 2;
        let start = posts.length + 1;

        if(isNewFilter) {
            oldPostsLength = 0;
            end = 2;
            start = 1;
        }

        await axios.get(
            `http://localhost:3001/posts/${clickedFilter}`, 
            {
                params: {
                    start,
                    end,
                }
            }
        )
        .then(response => {
            setIsLoading(false);
            console.log(1);

            if(response.data === "OK") {
                return;
            }
            
            if(posts.length + response.data.length !== oldPostsLength) {
                //console.log(prevScrollY);
                window.scrollTo(0, prevScrollY-200); // values are x,y-offset
                //console.log(window.scrollY);
                setPosts(response.data);
                
                // setPosts(previous => {
                //     return previous.concat(response.data)
                // });
            }
        })
        .catch(error => {
            console.log(3);
            setIsLoading(false);

            console.log(error);
        });
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", scrollSnapType: "y mandatory !important", scrollBehavior : "initial" }}>
            {
            posts.length > 0 ?
            <>
                <Posts posts={posts} />

                <BottomNavigation
                    showLabels
                    value={activeFilter}
                    onChange={(event, newValue) => {
                        setActiveFilter(newValue);
                        getPosts(newValue, 0); // Call getPosts with the new filter value and reset scrollHeight
                    }}
                >
                    <BottomNavigationAction label="By time" icon={<AccessTimeIcon />} value="time" />

                    <BottomNavigationAction label="By likes" icon={<ThumbUpIcon />} value="likes" />

                    <BottomNavigationAction label="By reposts" icon={<ReplyIcon />} value="reposts" />
                </BottomNavigation>
            </>
            :
                <Typography align="center">No posts are available...</Typography>
            }

            {
            isLoading && <CircularProgress />
            }
        </Container>
    )
}

export default Feed;