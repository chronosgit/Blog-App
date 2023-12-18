import { Box, Container, Grid, Typography, Link } from "@mui/material";

function HomeStories() {
    const stories = [
        {
            title: "Renewable energy fasfasfasfafasfafasfsafasfasfafafs",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "SA's wind-energy potential is vast and not geographically constrained",
            image: ""
        },
        {
            title: "Energy",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Eskom evolving from traditional to virtual wheeling with Vodacom",
            image: ""
        },
        {
            title: "Coal and renewable energy",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Seriti's Teke defends his dual belief in coal and renewables",
            image: ""
        },
        {
            title: "Economy",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Tshepe, Patel unpack Competition Commission's new focus areas",
            image: ""
        },
        {
            title: "Green hydrogen",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Export component of South Africa's green hydrogen strategy will seek to lock in price subsidies",
            image: ""
        },
        {
            title: "Bus transport",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "MAN hands over first electric bus to Golden Arrow; local assembly to start in 2024",
            image: ""
        },
        {
            title: "Franchising",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Franchisors bullish about growth, but certain areas remain a worry",
            image: ""
        },
        {
            title: "Natural gas",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            content: "Renergen achieves environmental permit milestone",
            image: ""
        },
    ]

    return (
        <Container maxWidth="lg">
            <Typography
                component="h2"
                sx={{
                    m: "5rem 0 3rem 0",
                    fontSize: "2rem",
                    fontWeight: "900",
                    textAlign: "center",
                }}
            >
                Hype stories
            </Typography>
            <Grid
                container
                columnSpacing={3}
                rowSpacing={5}
                sx={{
                    mb: "3rem",
                }}
            >
                {
                    stories.map((item, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <Box sx={{ p: "1rem", width: "100%", }}>
                                    <Link 
                                        href={item.link}
                                        underline="none"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            justifyContent: "center",
                                            color: "var(--mainColor)"
                                        }}
                                    >
                                        <img
                                            src={item.image.length > 0 ? item.image : "/images/home/blogDefault.jpg"}
                                            alt={item.title}
                                            height="100%"
                                            width="100%"
                                        />
                                        <Typography
                                            sx={{
                                                my: "0.5rem",
                                                fontSize: "0.7rem",
                                                fontWeight: "300",
                                                textTransform: "uppercase",
                                                letterSpacing: 3,
                                                maxHeight: "1rem",
                                                textOverflow: "ellipsis",
                                                wordWrap: "break-word",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {item.title.slice(0, 30)}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "1.1rem",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {item.content}
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Container>
    );
}

export default HomeStories;