import { useState } from "react";

import { Box, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";

function Editor(props) {
    const {
        type, value, setValue, 
        multilineValue, setMultilineValue, 
        choosableValue, setChoosableValue, 
        choosableValueOptions,
        editFunction, clearInputs
    } = props;

    const [message, setMessage] = useState({
        text: "",
        isError: false,
    });

    const handleFeedbackMessageUpdate = (status, errorMessage) => {
        let messageText = "";
        let isMessageError = true;

        if(status === "updateSuccess") {
            messageText = "Your post is successfuly updated! You can update it again right way!";
            isMessageError = false;
        } else if(status === "titleError") {
            messageText = "Your title must include 1 to 50 characters";
        } else if(status === "topicError") {
            messageText = "You must select a topic";
        } else if(status === "textError") {
            messageText = "Your text must include 1 to 500 characters";
        } else if(status === "commentError") {
            messageText = "Your comment should be from 1 to 1000 characters";
        } else if(status === "bioError") {
            messageText = "Your bio should be from 1 to 100 characters";
        } else if(status === "axiosError") {
            messageText = errorMessage;
        }

        setMessage({
            text: messageText,
            isError: isMessageError,
        });
    };

    const clearMessage = () => {
        setMessage({text: "", isError: false});
    }

    return (
        (value !== undefined || multilineValue !== undefined || choosableValue !== undefined) ?
            <Container maxWidth="md">
                <Typography gutterBottom sx={{ fontSize: "1.2rem", fontWeight: "600" }}>Update your {type}:</Typography>

                {
                    value !== undefined &&
                        <TextField 
                            value={value} 
                            label="Title" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            onChange={e => {setValue(e.target.value); clearMessage()}}
                        />
                }

                {
                    choosableValue !== undefined && choosableValueOptions !== undefined &&
                        <Select
                            value={choosableValue}
                            label="Topic"
                            sx={{ width: "100%" }}
                            onChange={e => {setChoosableValue(e.target.value); clearMessage()}}
                        >
                            {
                                choosableValueOptions.map((option, index) => {
                                    return (
                                        <MenuItem key={index} value={option}>{option}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                }

                {
                    multilineValue !== undefined &&
                    <TextField
                        value={multilineValue} 
                        label="Text" 
                        variant="outlined" 
                        multiline 
                        fullWidth 
                        margin="normal"
                        onChange={e => {setMultilineValue(e.target.value); clearMessage()}}
                    />
                }

                {
                    message.text.length > 0 &&
                        <Typography sx={{ my: 1, color: message.isError ? "red" : "green" }}>{message.text}</Typography>
                }

                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Button variant="contained" onClick={() => editFunction(handleFeedbackMessageUpdate)}>Update</Button>

                    <Button variant="outlined" onClick={clearInputs}>Clear inputs</Button>
                </Box>
            </Container>
        :
            <Typography sx={{ color: "darkred", fontSize: "1.5rem" }}>
                Something wrong happened...
            </Typography>
    )
}

export default Editor;