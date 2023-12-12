import { Link } from "@mui/material";

function SocialLink(props) {
    return (
        <Link href={props.destination} target="_blank" sx={{ color: "var(--mainColor)" }}>
            {props.icon}
        </Link>
    );
}

export default SocialLink;