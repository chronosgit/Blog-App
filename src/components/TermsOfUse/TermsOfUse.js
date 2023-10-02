import { Container, Typography } from "@mui/material";

import termsOfUse from "./data";

function TermsOfUse() {

    return (
        <Container
            maxWidth="md"
            sx={{
                lineHeight: "2rem",
                letterSpacing: 0.4,
            }}
        >
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
                Terms of Use
            </Typography>

            {
                termsOfUse.map((item, index) => {
                    return (
                        <Typography
                            key={index}
                            sx={{
                                mb: "5rem",
                            }}
                        >
                            <span style={{fontWeight: "900"}}>{item.name} </span>
                            {item.content}
                        </Typography>
                    );
                })
            }
        </Container>
    );
}

export default TermsOfUse;