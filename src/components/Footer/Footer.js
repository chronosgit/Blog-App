import { Box, Typography } from "@mui/material";

import NavigationLink from "../NavigationLink/NavigationLink";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                p: "1.5rem 2rem",
                color: "var(--mainColor)"
            }}
        >
            <Box 
                sx={{
                    mb: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "3rem",
                }}
            >
                <Typography
                    sx={{
                        mr: "3px",
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        letterSpacing: 3,
                        textTransform: "uppercase",
                    }}
                >
                    Engi<span className="yellow">World</span>
                </Typography>

                <NavigationLink destination="/" content="Link1" margin="0" letterSpacing={4} small hasLine={false} />

                <NavigationLink destination="/" content="Link2" margin="0" letterSpacing={4} small hasLine={false} />
                
                <NavigationLink destination="/" content="Link3" margin="0" letterSpacing={4} small hasLine={false} />

                <NavigationLink destination="/" content="Link4" margin="0" letterSpacing={4} small hasLine={false} />
            </Box>

            <Box 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "3rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                    }}
                >
                    © {currentYear} EngiWorld. All rights reserved.
                </Typography>
            </Box>

        </Box>
    )
}

export default Footer;