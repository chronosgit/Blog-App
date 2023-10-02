import { Box, Container, Typography, Link } from "@mui/material";

function HomePromo() {
    const resources = [
        {
            link: "https://www.youtube.com/@TheOrganicChemistryTutor",
            title: "Youtube Tutor, aka the Savior",
            image: "/images/home/youtubeTutor.jpg",
        },
        {
            link: "https://www.youtube.com/@abdul_bari",
            title: "Abdul Bari: the myth, the legend",
            image: "/images/home/abdulBari.jpg",
        },
        {
            link: "https://www.youtube.com/@WebDevSimplified",
            title: "WebDev Simplified",
            image: "/images/home/webDevSimplified.jpg",
        },
        {
            link: "https://www.youtube.com/@javascriptmastery",
            title: "JavaScript Mastery",
            image: "/images/home/jsMastery.jpg",
        },
    ];
    return (
        <Container
            maxWidth="lg"
            sx={{
                mb: "3rem",
            }}
        >
            <Typography
                component="h2"
                sx={{
                    mb: "2rem",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "900",
                    letterSpacing: 2,
                }}
            >
                Explore these useful resources
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    gap: "1.5rem",
                }}
            >
                {
                    resources.map((item, index) => {
                        return (
                            <Box 
                                key={index}
                                sx={{
                                    minWidth: "25%",
                                }}
                            >
                                <Link
                                    href={item.link} 
                                    underline="none"
                                    target="_blank"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "space-between",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mb: "1rem",
                                            width: "100%",
                                            height: "20rem",
                                            backgroundImage: `url(${item.image})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                        }} 
                                    />
                                    <Typography
                                        sx={{
                                            color: "var(--mainColor)",
                                            letterSpacing: 1,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Link>
                            </Box>
                        )
                    })
                }
            </Box>
        </Container>
    );
}

export default HomePromo;