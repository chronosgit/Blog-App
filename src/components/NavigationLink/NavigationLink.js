import { Box, Link } from "@mui/material";

function NavigationLink(props) {
    const {small, textTransform = "uppercase", letterSpacing = 1, padding = "0 2.5rem", hasLine = false} = props;
    return (
        <>
            <Box 
                sx={{
                    p: padding,
                    position: "relative",
                    "&::after": { // white line after a link
                        display: hasLine ? "block" : "none",
                        content: '""',
                        position: "absolute",
                        left: "100%",
                        top: 0,
                        height: 1,
                        width: "1px",
                        backgroundColor: "var(--mainColor)",
                        opacity: 0.5,
                    },
                }}
            >
                <Link
                    href={props.destination} 
                    underline="none"
                    color="var(--mainColor)"
                    sx={{
                        position: "relative",
                        fontSize: small ? "0.7rem" : "0.9rem",
                        textTransform: textTransform,
                        letterSpacing: letterSpacing,
                        cursor: "pointer",
                        "&::before": { // hover line
                            content: '""',
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            height: 0,
                            width: 1,
                            backgroundColor: "var(--secondaryColor)",
                            opacity: 0.9,
                        },
                        "&:hover": {
                            "&::before": {
                                height: small ? 3 : 4,
                            },
                        }
                    }}
                >
                    {props.content}
                </Link>
            </Box>
        </>
    );
}

export default NavigationLink;