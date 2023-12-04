import { useContext, useEffect } from 'react';

import axios from "axios";

import { Box, Typography, Link, Grid, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import NavigationLink from '../NavigationLink/NavigationLink';
import SocialLink from '../SocialLink/SocialLink';

function Header(props) {
    const {context} = props;
    const usedContext = useContext(context);
    const {user, setUser, profileImageLink, setProfileImageLink, profileImageSrc, setProfileImageSrc} = usedContext;

    const profileImageStyle = {
        width: 30,
        height: 30,
        borderRadius: 50,
    }
    const data = {
        navLinks: [
            {
                name: "home",
                link: "/home",
            },
            {
                name: "about",
                link: "/about",
            },
            {
                name: "contact",
                link: "/contact",
            },
        ],
        socialLinks: [
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
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                await axios.get("http://localhost:3001/refresh/", {
                    withCredentials: true,
                    credentials: "include",
                })
                .then(response => {
                    localStorage.removeItem("accessToken");
                    localStorage.setItem("accessToken", response.data.accessToken);
                })
                .catch(error => {
                    console.log(error);
                });

                await axios.get("http://localhost:3001/user/", {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                .then(response => {
                    setUser(response.data);
                    setProfileImageLink(`/profile/${response.data.id}`);
                    setProfileImageSrc('data:image/jpeg;base64,' + response.data.profilePic);

                    isMounted && setUser(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            } catch(error) {
                console.log(error);
<<<<<<< HEAD
=======
                //navigate("/signin");
>>>>>>> aa5aff0611605b8a8a741094dd8ca0a6a43840ab
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <Grid
            container
            component="header" 
            justifyContent="space-between"
            alignItems="center"
            sx={{
                mb: "3rem",
                p: "1rem 2rem 1rem 1rem",
                borderBottom: "1px black solid",
                borderColor: "gray",
            }}
        >
            <Grid 
                item 
                component="nav"
                xs={10} sm={8} md={6}
            >
                <Box 
                    component="nav" 
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                ><Link href="/feed" sx={{textDecoration:'none'}}>
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
                                color: 'black',
                            }}
                        >
                            Engi<span className="yellow">World</span>
                        </Typography>
                    </Box></Link>

                    {
                        data.navLinks.map((item, index) => {
                            return (
                                <NavigationLink 
                                    key={index}
                                    content={item.name} 
                                    destination={item.link} 
                                    padding="0 2.5rem"
                                    fontSize="0.9rem"
                                    letterSpacing="1"
                                    textTransform="uppercase"
                                    hasLine
                                    underlineHeight={4}
                                />
                            )
                        })
                    }
                </Box>
            </Grid>

            <Grid item xs={2} sm={4} md={6}>
                <Box 
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "2rem",
                    }}
                >
                    <Paper sx={{display: 'flex', alignItems: 'center', padding: '.1em .4em'}}>
                    <TuneIcon className='header_icons' sx={{mr: '.2em'}}></TuneIcon>
                    <InputBase onKeyDown={(e)=>{if (e.key==="Enter") navigate("/search/:"+e.target.value)}}></InputBase>
                    <Link href="/search"><SearchIcon className='header_icons'
                        sx={{
                            ml: '.2em',
                        }}
                    /></Link>
                    </Paper>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.8rem",
                        }}
                    >
                        {
                            data.socialLinks.map((item, index) => {
                                return (
                                    <SocialLink key={index} destination={item.destination} icon={item.icon} />
                                );
                            })
                        }
                    </Box>

                    {
                        Object.keys(user).length > 0 ?
                            <a href={profileImageLink}>
                                <img
                                    src={profileImageSrc}
                                    alt="profileImage"
                                    style={profileImageStyle}
                                />
                            </a>
                        :
                            <Link 
                                href="/signin"
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
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

export default Header;