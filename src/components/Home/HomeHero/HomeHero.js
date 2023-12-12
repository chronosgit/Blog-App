import { Box, Container, Typography, } from "@mui/material";

import NavigationLink from "../../NavigationLink/NavigationLink";

function HomeHero(props) {
    const linkToHuawei = `https://e.huawei.com/en/talent/#/
        ict-academy/ict-competition/
        regional-competition?
        zoneCode=026699&
        zoneId=98269587&
        compId=85131993&
        divisionName=Middle
        %20East%20%26%20Central%20Asia%C2%A0&type=C001&isCollectGender=N`;

    return (
        <Box sx={{ backgroundColor: "var(--secondaryColor)" }} >
            <Container maxWidth="lg" sx={{ p: "2rem" }}>
                <Box sx={{ display: "flex", maxHeight: "50rem" }}>
                    <Box sx={{ p: "3rem 1rem", flex: "1", backgroundColor: "white" }}>
                        <Typography
                            sx={{
                                mb: "1rem",
                                fontSize: "0.8rem",
                                fontWeight: "100",
                                color: "#cacaca",
                                textTransform: "uppercase",
                            }}
                        >
                            Begenov approves
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                mb: "1rem",
                                px: "3px",
                                fontSize: "1.5rem",
                                fontStyle: "italic",
                                fontWeight: "900",
                                color: "var(--mainColor)",
                                textTransform: "uppercase",
                            }}
                        >
                            Your beloved HUAWEI network engineering competition is here!
                            Get ready to rumble!
                        </Typography>

                        <NavigationLink 
                            destination={linkToHuawei} 
                            content="Read more"
                            margin="1rem 0"
                            padding="0 3px"
                            fontSize="0.9rem"
                            textTransform="uppercase"
                            letterSpacing={1} 
                            underlineHeight={5}
                        />

                        <Typography sx={{ px: "3px", fontWeight: "300" }}>
                            Real production cases, 
                            ton of feedback and lots of growth potential 
                            are on the agenda this October!
                        </Typography>
                    </Box>
                    
                    <Box
                        sx={{
                            flex: "1.1",
                            backgroundImage: "url('/images/home/huawei.jpg')",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
}

export default HomeHero;