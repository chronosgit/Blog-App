import { Box, Container, Grid, Typography, Link } from "@mui/material";

import HomeHero from "./HomeHero/HomeHero";
import HomeStories from "./HomeStories/HomeStories";
import HomeContact from "./HomeContact/HomeContact";

function Home() {
    return (
        <>
            <HomeHero />

            <HomeStories />

            <HomeContact />
        </>
    );
}

export default Home;