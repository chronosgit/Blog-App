import SearchIcon from '@mui/icons-material/Search';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Box, Typography, Link } from '@mui/material';

import HeaderNavigationLink from './HeaderNavigationLink';
import HeaderSocialLink from './HeaderSocialLink';

function Header() {
    return (
        <Box 
            component="header" 
            sx={{ 
                p: "1rem 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box 
                component="nav" 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box 
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                    }}
                >
                    <img 
                        src="/images/logo-40x40.png" 
                        alt="logo" 
                        style={{
                            width: "2rem",
                            height: "2rem",
                        }}  
                    />

                    <Typography
                        paragraph
                        sx={{
                            m: 0,
                            fontSize: "1.2rem",
                            fontWeight: "900",
                            letterSpacing: 3,
                            textTransform: "uppercase",
                        }}
                    >
                        Engi<span className="yellow">World</span>
                    </Typography>
                </Box>

                <HeaderNavigationLink content="Home" destination="/" />        

                <HeaderNavigationLink content="Link1" destination="/" />

                <HeaderNavigationLink content="Link2" destination="/" />

                <HeaderNavigationLink content="Link3" destination="/" />
            </Box>

            <Box 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                }}
            >
                <SearchIcon 
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        opacity: 0.8,
                        cursor: "pointer",
                        "&:hover": {
                            opacity: 1,
                        }
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.8rem",
                    }}
                >
                    <HeaderSocialLink destination="https://www.facebook.com/" icon={<FacebookRoundedIcon />} />
                    
                    <HeaderSocialLink destination="https://twitter.com/" icon={<TwitterIcon />} />
                    
                    <HeaderSocialLink destination="https://www.instagram.com/" icon={<InstagramIcon />} />
                    
                    <HeaderSocialLink destination="mailto:dummymailunreal@example.com" icon={<EmailRoundedIcon />} />
                </Box>

                <Link 
                    href="/"
                    underline="none"
                    sx={{
                        position: "relative",
                        fontSize: "0.8rem",
                        color: "var(--mainColor)",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        cursor: "pointer",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: 0,
                            height: "4px",
                            textAlign: "center",
                            margin: "0 auto",
                            backgroundColor: "red",
                            transition: "all 0.3s ease",
                        },
                        "&:hover": {
                            "&::before": {
                                width: 1
                            },
                        }
                    }}
                >
                    Sign In
                </Link>
            </Box>
        </Box>
    );
}

export default Header;