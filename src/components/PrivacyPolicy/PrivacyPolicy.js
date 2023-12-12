import { Container, Typography, Box } from "@mui/material";

import privacyPolicy, { intro } from "./data";

function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ lineHeight: "2rem", letterSpacing: 0.4 }}>
            <Typography 
                align="center"
                component="h1"
                sx={{
                    m: "6rem",
                    fontSize: "2rem",
                    fontStyle: "italic",
                    fontFamily: "sans",
                    fontWeight: "600"
                }}
            >
                Privacy Policy
            </Typography>

            <Typography sx={{ mb: "2rem", lineHeight: "inherit" }}>{intro}</Typography>

            {
                privacyPolicy.map((item, index) => {
                    return (
                        <Box key={index} sx={{ letterSpacing: "inherit" }}>
                            <Typography component="h2" sx={{ mb: "2rem", fontWeight: "900" }}>
                                {index + 1}. {item.header}
                            </Typography>

                            <Typography sx={{ mb: "3rem", lineHeight: "inherit" }}>{item.descr}</Typography>

                            {
                                item.paragraphs.map((item, index) => {
                                    return (
                                        <Typography 
                                            key={index}
                                            sx={{
                                                mb: "2rem",
                                                letterSpacing: "inherit",
                                                lineHeight: "inherit",
                                            }}
                                        >
                                            <span style={{fontWeight: "900"}}>{item.name} </span>
                                            
                                            {item.content}
                                        </Typography>
                                    );
                                })
                            }
                        </Box>
                    );
                })
            }
        </Container>
    );
}

export default PrivacyPolicy;