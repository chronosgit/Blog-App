import { Box, Typography } from "@mui/material";

function Notification(props) {

    const {notification} = props;

    const notificationDateObject = new Date(Date.parse(notification.date));
    const formattedDate = `${notificationDateObject.getDate()}-${notificationDateObject.getMonth() + 1}-${notificationDateObject.getFullYear()} ${notificationDateObject.getHours()}:${notificationDateObject.getMinutes()}`

    const notificationStyles = {
        p: "1rem",
        transition: "all 0.1s ease",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
        }
    }

    const handleClick = () => {
        if(notification.type === "post" || notification.type === "comment") {
            window.location.href = `/post/${notification.post}`;
        } else if(notification.type === "follow") {
            window.location.href = `/profile/${notification.sender}`;
        } else {
            console.log("wrong notification type in backend");
            return;
        }
    }

    return (
        <Box onClick={handleClick} sx={notificationStyles}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography 
                    sx={{
                        width: "fit-content",
                        p: "3px",
                        mb: "0.5rem",
                        fontSize: "0.7rem",
                        backgroundColor: "var(--mainColor)",
                        color: "var(--backgroundColor)",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: 1,
                        textTransform: "uppercase",
                    }}
                >
                    {notification.type}
                </Typography>

                <Typography sx={{ fontSize: "0.9rem" }}>{formattedDate}</Typography>
            </Box>

            <Typography>{notification.message}</Typography>
        </Box>
    )
}

export default Notification;