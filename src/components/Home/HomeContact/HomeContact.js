import { useState } from "react";

import { Box, Button, Container, TextField, Typography, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function HomeContact() {
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
     );

    const [userContactEmail, setUserContactEmail] = useState("")
    const [isEmailAppropriate, setIsEmailAppropriate] = useState(true);
    const [open, setOpen] = useState(false);

    function onContactEmailChange(e) {
        setIsEmailAppropriate(true);
        setUserContactEmail(e.target.value);
    }

    function submitUserContactEmail(e) {
        if(validateUserContactEmail()) {
            console.log(`The user's email ${userContactEmail} has been sent!`);
            setOpen(true);
        }
        setUserContactEmail("");
    }
    
    function validateUserContactEmail() {
        if(!validEmail.test(userContactEmail)) {
            setIsEmailAppropriate(false);
            return false;
        }
        return true;
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Box
            sx={{
                mb: "2rem",
                backgroundColor: "var(--secondaryColor)",
            }}
        >
            <Container 
                maxWidth="md"
                sx={{
                    height: "20rem",
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
                        component="h2"
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
                            mb: "2rem",
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
                            variant="standard"
                            error={isEmailAppropriate ? false : true}
                            placeholder="E-MAIL"
                            name="userContactEmail"
                            value={userContactEmail}
                            helperText={!isEmailAppropriate && "Inappropriate email form"}
                            sx={{
                                p: "0.5rem",
                                backgroundColor: "var(--backgroundColor)",
                            }}
                            onChange={onContactEmailChange}
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
                            onClick={submitUserContactEmail}
                        >
                            JOIN THE CO
                        </Button>
                    </Box>

                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        message="E-mail sent!"
                        action={action}
                    />
                </Box>
            </Container>
        </Box>
    );
}

export default HomeContact;