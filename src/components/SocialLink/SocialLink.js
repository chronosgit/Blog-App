import { Link } from "@mui/material";

function SocialLink(props) {
    return (
        <Link
            href={props.destination} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
                color: "var(--mainColor)",
            }} 
        >
            {props.icon}
        </Link>
    );
}

export default SocialLink;