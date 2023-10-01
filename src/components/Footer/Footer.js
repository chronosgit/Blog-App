import { Box, Typography } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import SocialLink from "../SocialLink/SocialLink";

function Footer() {
    const currentYear = new Date().getFullYear();
    const socialIcons = [
        {
            icon: <FacebookRoundedIcon />,
            destination: "https://www.facebook.com/"
        },
        {
            icon: <TwitterIcon />,
            destination: "https://twitter.com/"
        },
        {
            icon: <InstagramIcon />,
            destination: "https://www.instagram.com/"
        },
        {
            icon: <EmailRoundedIcon />,
            destination: "mailto:dummymailunreal@example.com"
        },
    ]

    return (
        <Box
            component="footer"
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                p: "1.5rem 2rem",
                color: "var(--mainColor)"
            }}
        >
            <Box
                sx={{
                    p: "5rem"
                }}
            >
                <Typography
                    sx={{
                        mb: "1rem",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                >
                    Stay connected with EngiWorld
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    {
                        socialIcons.map((item, index) => {
                            return (
                                <SocialLink 
                                    key={index}
                                    icon={item.icon} 
                                    destination={item.destination} 
                                />
                            );
                        })
                    }
                </Box>
            </Box>
            <Typography
                sx={{
                    fontSize: "1.2rem",
                    fontWeight: "900",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                }}
            >
                Engi<span className="yellow">World</span>
            </Typography>

            <Typography
                sx={{
                    fontSize: "0.9rem",
                }}
            >
                © {currentYear} EngiWorld. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer;