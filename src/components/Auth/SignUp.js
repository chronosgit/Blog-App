import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import {Link,Container,Typography,IconButton,Button,
    FormControl,InputAdornment,InputLabel,OutlinedInput} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUp(props) {
    const navigate = useNavigate();

    const {context} = props;
    const usedContext = useContext(context);
    const {setUser, setProfileImageLink, setProfileImageSrc} = usedContext;

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,30}$/;
    const EMAIL_REGEX = /^[A-z]([A-z0-9-_])*@[A-z]([A-z0-9-_])*\.[A-z]([A-z0-9-_])*$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$/;

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [uName, setUName] = useState('');
    const [validUName, setValidUName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [mPwd, setMPwd] = useState('');
    const [validMPwd, setValidMPwd] = useState(false);

    const [isFormValid, setIsFormValid] = useState(true);
    
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const result = USER_REGEX.test(uName);
        setValidUName(result);
    }, [uName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test([pwd]);
        setValidPwd(result);
        const match = pwd === mPwd;
        setValidMPwd(match);
    }, [pwd,mPwd]);

    const resetAllStates = () => {
        setEmail("");
        setUName("");
        setPwd("");
        setMPwd("");
        setShowCPassword(false);
        setShowPassword(false);
        setIsFormValid(true);
    }

    const handleButtonClick = async () => {
        setErrorMessage("");

        if(!(validEmail && validMPwd && validPwd && validUName)) {
            setIsFormValid(false);
            return false;
        }

        setShowCPassword(false);
        setShowPassword(false);

        await axios.post(
            "http://localhost:3001/auth/register/", // url
            {email: email, username: uName, password: pwd}, // body 
            {
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                withCredentials: true,
            } // headers, params, auth etc.
        )
        .then(function (response) {
            const accessToken = response.data.accessToken;
            localStorage.removeItem("access-token");
            localStorage.setItem("access-token", accessToken);

            resetAllStates();

            setUser(response.data);
            setProfileImageLink(`/profile/your/${response.data.id}`);
            setProfileImageSrc('data:image/jpeg;base64,' + response.data.profilePic);

            navigate("/");
        })
        .catch(function (error) {
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
                Sign Up
            </Typography>
            
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className={validEmail || !email ? "Input" : "InvalidInput"}>
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-email"
                    type="text"
                    label="Email"
                    required
                    inputProps={{maxLength:30}}
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value); setIsFormValid(true)}}
                />

                <Typography 
                    align="center"
                    component="h4"
                    sx={{
                        color: 'red',
                        fontWeight: "600"
                    }}
                >
                    {!validEmail && email ? "Provided address is not in the proper email format." : ""}
                </Typography>
            </FormControl>

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className={validUName || !uName ? "Input" : "InvalidInput"}>
                <InputLabel htmlFor="outlined-uname">Username</InputLabel>
                <OutlinedInput
                    id="outlined-uname"
                    type="text"
                    label="Username"
                    inputProps={{maxLength:30}}
                    value={uName}
                    onChange={(e)=>{setUName(e.target.value); setIsFormValid(true)}}
                    required
                />

                <Typography 
                    align="center"
                    component="h4"
                    sx={{
                        color: 'red',
                        fontWeight: "600"
                    }}
                >
                    {!validUName && uName ? "Your username must start with a letter and consist of 3 to 30 symbols" : ""}
                </Typography>
            </FormControl>

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className={validPwd || !pwd ? "Input" : "InvalidInput"}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    required
                    inputProps={{maxLength:30}}
                    value={pwd}
                    onChange={(e)=>{setPwd(e.target.value); setIsFormValid(true)}}
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
                />

                <Typography 
                    align="center"
                    component="h4"
                    sx={{
                        color: 'red',
                        fontWeight: "600"
                    }}
                >
                    {!validPwd && pwd ? "Your password must contain at least 8 symbols, including lowercase and uppercase letters, numbers and special symbols." : ""}
                </Typography>
            </FormControl>

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className={validMPwd || !mPwd ? "Input" : "InvalidInput"}>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                    type={showCPassword ? 'text' : 'password'}
                    required
                    inputProps={{maxLength:30}}
                    value={mPwd}
                    onChange={(e)=>{setMPwd(e.target.value); setIsFormValid(true)}}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowCPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showCPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm Password"
                />

                <Typography 
                    align="center"
                    component="h4"
                    sx={{
                        color: 'red',
                        fontWeight: "600"
                    }}
                >
                    {!validMPwd && mPwd ? "Passwords don't match." : ""}
                </Typography>
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
                <Button sx={{color:'inherit'}} onClick={handleButtonClick}>
                    Sign up
                </Button>
            </FormControl>

            <Typography 
                align="center"
                component="h4"
                sx={{
                    color: 'red',
                    fontWeight: "600"
                }}
            >
                {!isFormValid && "Please check if you filled everything correctly."}
            </Typography>

            <span>Already have an account? <Link href="/signin">Log in here</Link></span>
        </Container>
    );
}

export default SignUp;