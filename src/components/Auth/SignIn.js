import { useNavigate } from 'react-router-dom';

import {Link,Container,Typography,IconButton,Button,
    FormControl,InputAdornment,InputLabel,OutlinedInput} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from "../../api/axios";

function SignIn() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleButtonClick = async () => {
        const copyEmail = email;
        const copyPassword = password;
        setEmail("");
        setPassword("");

        await axios.post(
            "/auth/login/", // url
            {email: copyEmail, password: copyPassword}, // body 
            {
                headers: {"Content-Type": "application/json; charset=UTF-8"}, 
                withCredentials: true
            } // headers, params, auth etc.
        )
        .then(function(response){
            const accessToken = response.data.accessToken;
            localStorage.removeItem("access-token");
            localStorage.setItem("access-token", accessToken);
            navigate("/");
        })
        .catch(function(error) {
            console.log(error);
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
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
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
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
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