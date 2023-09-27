import { Link } from "@mui/material";

function NavigationLink(props) {
    const {small, textTransform = "uppercase", letterSpacing = 1, margin = "0 2.5rem", hasLine} = props;
    return (
        <Link
            href={props.destination} 
            underline="none"
            color="var(--mainColor)"
            sx={{
                position: "relative",
                fontSize: small ? "0.7rem" : "0.9rem",
                textTransform: textTransform,
                letterSpacing: letterSpacing,
                m: margin,
                cursor: "pointer",
                "&::after": {
                    display: hasLine ? "block" : "none",
                    content: '""',
                    position: "absolute",
                    left: "5rem",
                    top: 0,
                    height: 1,
                    width: "1px",
                    backgroundColor: "var(--mainColor)",
                    opacity: 0.5,
                },
                "&::before": {
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
    );
}

export default NavigationLink;