import { Grid, Typography } from "@mui/material";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Grid // dunno how to place it at the bottom of a whole page....
            component="footer"
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                p: "1.5rem 2rem",
                color: "var(--mainColor)"
            }}
        >
            <Typography
                sx={{
                    fontSize: "1.2rem",
                    fontWeight: "900",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                }}
            >
                Engi<span className="yellow">World</span>
            </Typography>

            <Typography
                sx={{
                    fontSize: "0.9rem",
                }}
            >
                © {currentYear} EngiWorld. All rights reserved.
            </Typography>
        </Grid>
    )
}

export default Footer;