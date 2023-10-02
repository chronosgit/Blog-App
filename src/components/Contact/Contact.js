import { Container, Link, Typography } from "@mui/material";

function Contact() {
    const contactPrompts = [
        {
            prompt: "Seeking advertising or partnership opportunities?",
            address: "mailto:supercareer@example.com",
        },
        {
            prompt: "Need support with a course billing or support issue?",
            address: "mailto:coolsupport@example.com",
        },
        {
            prompt: "Are you a member of the press and you want to write about us?",
            address: "mailto:press@example.com",
        },
        {
            prompt: "Got a new product and you want to share with EngiWorld readers?",
            address: "mailto:ohwow@example.com",
        },
        {
            prompt: "Looking to license your content?",
            address: "mailto:license@example.com",
        },
    ]
    return (
        <Container 
            maxWidth="md" 
            sx={{
                my: "6rem",
                textAlign: "center"
            }}
        >
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
                Contact
            </Typography>

            <Typography
                component="h2"
                sx={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                }}
            >
                We'd love to hear from you!
            </Typography>

            <Typography
                paragraph
                sx={{
                    mb: "5rem",
                    letterSpacing: 1,
                }}
            >
                Have ideas, looking to partner, or need support?
            </Typography>

            {
                contactPrompts.map((item, index) => {
                    return (
                        <Link
                            href={item.address}
                            underline="none"
                            color="var(--mainColor)"
                            key={index}
                        >
                            <Typography
                                paragraph
                                sx={{
                                    mb: "1rem",
                                    letterSpacing: 1,
                                }}
                            >
                               {item.prompt}
                            </Typography>

                            <Typography
                                component="h3"
                                sx={{
                                    mb: "3rem",
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    letterSpacing: 1,
                                }}
                            >
                                {item.address}
                            </Typography>
                        </Link>
                    );
                })
            }

            <Typography
                component="h2"
                sx={{
                    mt: "5rem",
                    mb: "2rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                }}
            >
                Send postcards to...
            </Typography>

            <Typography
                sx={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                }}
            >
                EngiWorld HQ
            </Typography>
            <Typography
                sx={{
                    mb: "1rem",
                    fontSize: "1.1rem",
                    textTransform: "uppercase"
                }}
            >
                129 Nomad avenue<br />
                Almaty city, kazakstan
            </Typography>
        </Container>
    );
}

export default Contact;