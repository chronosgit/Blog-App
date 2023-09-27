import { Link } from "@mui/material";

function HeaderNavigationLink(props) {
    return (
        <Link
            href={props.destination} 
            underline="none"
            color="var(--mainColor)"
            sx={{
                position: "relative",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                m: "0 2.5rem",
                cursor: "pointer",
                "&::after": {
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
                        height: 4
                    },
                }
            }}
        >
            {props.content}
        </Link>
    );
}

export default HeaderNavigationLink;