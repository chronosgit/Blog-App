import { Box, Link } from "@mui/material";

function NavigationLink(props) {
    const {
        destination,
        content,
        target = "_self",
        padding = "0",
        margin = "0",
        fontSize = "1rem",
        fontWeight = "400",  
        textTransform = "none", 
        letterSpacing = "0",
        hasLine = false, // white line to the right, like in the header
        underlineHeight = 3,
    } = props;
    return (
        <>
            <Box 
                sx={{
                    m: margin,
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
                    href={destination} 
                    underline="none"
                    target={target}
                    color="var(--mainColor)"
                    sx={{
                        position: "relative",
                        fontSize: fontSize,
                        fontWeight: fontWeight,
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
                                height: underlineHeight,
                            },
                        }
                    }}
                >
                    {content}
                </Link>
            </Box>
        </>
    );
}

export default NavigationLink;