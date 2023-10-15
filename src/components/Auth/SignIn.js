import axios from 'axios';

import {Link,Container,Typography,IconButton,Button,
    FormControl,InputAdornment,InputLabel,OutlinedInput} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignIn() {
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

        let data = {};
        await axios.post(
            "http://localhost:3001/auth/login/", // url
            {email: copyEmail, password: copyPassword}, // body 
            {headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}} // headers, params, auth etc.
        )
        .then(function (response) {
            data = response.data;
            localStorage.setItem('access-token', data.accessToken);
            localStorage.setItem('refresh-token', data.refreshToken);
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(data);
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