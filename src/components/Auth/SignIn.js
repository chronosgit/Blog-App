import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import {
    Link, Container, Typography, IconButton, Button, 
    FormControl, InputAdornment, InputLabel, OutlinedInput
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignIn(props) {
    const navigate = useNavigate();

    const {context} = props;
    const usedContext = useContext(context);
    const {setUser, setProfileImageLink, setProfileImageSrc} = usedContext;

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const EMAIL_REGEX = /^[A-z]([A-z0-9-_])*@[A-z]([A-z0-9-_])*\.[A-z]([A-z0-9-_])*$/;

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setIsValidEmail(result);
    }, [email])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleButtonClick = async () => {
        setErrorMessage("");

        await axios.post(
            "http://localhost:3001/auth/login/", // url
            {email: email, password: password}, // body 
            {
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                withCredentials: true,
                credentials: "include",
            }
        )
        .then(function(response){
            const accessToken = response.data.accessToken;
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", accessToken);

            setEmail("");
            setPassword("");

            setUser(response.data);
            setProfileImageLink(`/profile/${response.data.id}`);
            setProfileImageSrc('data:image/jpeg;base64,' + response.data.profilePic);

            navigate("/");
        })
        .catch(function(error) {
            console.log(error);
            setErrorMessage(error.response.data.error);
        });
    }

    return(
        <Container 
            maxWidth="md" 
            sx={{
                my: "6rem",
                textAlign: "center",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography 
                align="center"
                component="h1"
                sx={{
                    m: "2rem",
                    fontSize: "2rem",
                    fontWeight: "600"
                }}
            >
                Sign In
            </Typography>

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-email"
                    type="text"
                    label="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setErrorMessage("")}}
                />
            </FormControl>

            <Typography 
                align="center"
                component="h4"
                sx={{
                    color: 'red',
                    fontWeight: "600"
                }}
            >
                {!isValidEmail && email && "Provided address is not in the proper email format."}
            </Typography>

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); setErrorMessage("")}}
                />
            </FormControl>

            <Typography 
                align="center"
                component="h4"
                sx={{
                    color: 'red',
                    fontWeight: "600"
                }}
            >
                {errorMessage.length > 0 && errorMessage}
            </Typography>

            <FormControl sx={{
                m: 1,
                width: '30ch',
                backgroundColor: "var(--secondaryColor)",
                color: "var(--mainColor)",
                borderRadius: 0,
                transition: 'all 50ms cubic-bezier(0.4, 0, 0.2, 1) 50ms',
                "&:hover": {
                    backgroundColor: "var(--mainColor)",
                    color: "var(--secondaryColor)",
                    opacity: "0.9",
                }}}>
                <Button 
                    sx={{color:'inherit'}}
                    onClick={handleButtonClick}
                >
                    Sign in
                </Button>
            </FormControl>
            <span>Don't have an account? <Link href="/signup">Register here</Link></span>
        </Container>
    );
}

export default SignIn;