import { Container, Typography, Box } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import SocialLink from "../SocialLink/SocialLink";

function About() {
    const ourFeatures = [
        {
            name: "Educate",
            content: `Learn new skills with experience from other users! 
            They'll help take you from beginner to all-star in a swift and exciting adventure - we've got you covered.`,
        },
        {
            name: "Inspire",
            content: `Explore creative ways for your engineering journey - 
            from ideas, projects, design concepts, handy tutorials and much more. 
            All the tips and tricks you need to know are here!`,
        },
        {
            name: "Entertain",
            content: `What's trending in the community? 
            Get the latest scoop on all important trends, updates, new softwares and more right here. 
            You know you want to.`,
        },
        {
            name: "Inform",
            content: `We get it - it's hard to keep up these days. 
            We'll tell you everything you need to know to keep you in the loop on news, events, 
            new product or business launches that catch our eye, and lots more. You can find it all here.`,
        },
        {
            name: "Ethics Policy",
            content: `A note on our ethics policy: the people here at EngiWorld will always credit products or engineers whose ideas we post. 
            Any lack of credit is completely unintentional and will be corrected upon notice. 
            Additionally, many users here are investors, advisors or engineers in many companies, 
            some of which may at times be featured on the site with full disclosure. 
            The team at EngiWorld will also always disclose when and if a company has paid for or offered free products 
            in return for promotion on the site.`,
        },
    ]
    return (    
        <Container maxWidth="md">
            <Typography 
                align="center"
                component="h1"
                sx={{
                    m: "6rem",
                    fontSize: "2rem",
                    fontStyle: "italic",
                    fontWeight: "600"
                }}
            >
                About
            </Typography>

            <Typography
                sx={{
                    mb: "2rem",
                    px: "2rem",
                    fontStyle: "italic",
                }}
            >
                We're thrilled you're here! Now, let us tell you a little bit about ourselves.
            </Typography>

            <img 
                src="/images/about/engineering.jpg" 
                alt="enginering types"
                style={{
                    maxWidth: "100%",
                }}
            />

            <Box
                sx={{
                    mx: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0.8rem",
                }}
            >
                <SocialLink destination="https://www.facebook.com/" icon={<FacebookRoundedIcon />} />
                
                <SocialLink destination="https://www.instagram.com/" icon={<InstagramIcon />} />
                
                <SocialLink destination="mailto:dummymailunreal@example.com" icon={<EmailRoundedIcon />} />
            </Box>

            <Typography
                component="h2"
                sx={{
                    mb: "2rem",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    letterSpacing: 2,
                }}
            >
                Our Mission
            </Typography>

            <Typography
                sx={{
                    fontStyle: "italic",
                }}
            >
                EngiWorld ignites the creative spark in engineers.
            </Typography>

            <Typography
                paragraph
                sx={{
                    my: "2rem",
                    letterSpacing: 1,
                    lineHeight: "1.5rem",
                }}
            >
                EngiWorld is a blog website that inspires, educates and entertains engineers with a creative spirit. 
                It is essential in all aspects of an engineers's life: 
                building career, forging strong friendships and relationships and entertaining others. 
                Through our content we enable people to use their creativity and experience to shape future.
            </Typography>

            {
                ourFeatures.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                mt: "1rem",
                            }}
                        >
                            <Typography
                                component="h2"
                                sx={{
                                    mb: "2rem",
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    letterSpacing: 2,
                                }}
                            >
                                {item.name}
                            </Typography>
                            <Typography
                                paragraph
                                sx={{
                                    my: "2rem",
                                    letterSpacing: 1,
                                    lineHeight: "1.5rem",
                                }}
                            >
                                {item.content}
                            </Typography>
                        </Box>
                    );
                })
            }
        </Container>
    );
}

export default About;