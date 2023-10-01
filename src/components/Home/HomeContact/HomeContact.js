import { Box, Button, Container, TextField, Typography } from "@mui/material";

function HomeContact() {
    return (
        <Box
            sx={{
                backgroundColor: "var(--secondaryColor)",
            }}
        >
            <Container 
                maxWidth="md"
                sx={{
                    maxHeight: "400px",
                    py: "3rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5rem",
                }}
            >
                <img
                    src="/images/home/gigachad.jpg"
                    alt="gigachad"
                    width="10%"
                    style={{
                        flex: "0.3",
                        borderRadius: "50%",
                        backgroundImage: "url(/images/home/gigachad.jpg)",
                        objectFit: "contain",
                    }}
                />

                <Box
                    sx={{
                        flex: "1",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            my: "1rem",
                            fontSize: "2rem",
                            fontWeight: "900",
                        }}
                    >
                        GO BEHIND THE SCENES WITH ENGIWORLD
                    </Typography>

                    <Typography
                        sx={{
                            mb: "1rem",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                        }}
                    >
                        Feel better, get smarter, and LOL a little… every week.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <TextField
                            placeholder="UNAVAILABLE"
                            disabled // temporary, until email writing logic is implemented
                            sx={{
                                backgroundColor: "var(--backgroundColor)",
                            }}
                        >

                        </TextField>
                        <Button
                            variant="contained"
                            sx={{
                                height: "3rem",
                                backgroundColor: "var(--mainColor)",
                                borderRadius: 0,
                                "&:hover": {
                                    backgroundColor: "var(--mainColor)",
                                    opacity: "0.9",
                                }
                            }}
                        >
                            JOIN THE CO
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default HomeContact;