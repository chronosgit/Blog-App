import { Box, Button, Stack } from "@mui/material";

import axios from "axios";

import Notification from "../Notification/Notification";

function Notifications(props) {
    const {notifications, setNotifications} = props;
    
    const handleClick = async () => {
        await axios.get("http://localhost:3001/refresh/", {
            withCredentials: true,
            credentials: "include",
        })
        .then(async (response) => {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response.data.accessToken);

            await axios.delete("http://localhost:3001/notifications/", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then(response => {
                setNotifications([]);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <>
        <Box 
            sx={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center", 
                p: "1rem", 
            }}
        >
            <Button variant="contained" color="primary" size="small" fullWidth onClick={handleClick}>Finish notifications</Button>
        </Box>

        <Stack spacing={1} sx={{ width: "15rem" }}> 
            {
            notifications.map((notification, index) => {
                return (
                    <Notification key={index} notification={notification} />
                )
            })
            }
        </Stack>
        </>
    )
}

export default Notifications;