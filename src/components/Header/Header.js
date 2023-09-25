import SearchIcon from '@mui/icons-material/Search';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

function Header() {
    return (
        <header className="header">
            <nav className="header_left">
                <div className="header_logoBox">
                    <img src="/images/logo-40x40.png" alt="logo" className="header_logo" />
                    <p className="header_name">Engi<span className="yellow">World</span></p>
                </div>
                <a href="/" className="header_link">
                    Home
                </a>
                <a href="/" className="header_link">
                    Link2
                </a>
                <a href="/" className="header_link">
                    Link3
                </a>
                <a href="/" className="header_link">
                    Link4
                </a>
            </nav>

            <div className="header_right">
                <div className="header_search">
                    <SearchIcon />
                </div>

                <div className="header_socials">
                    <a href="/" className="header_social">
                        <FacebookRoundedIcon />
                    </a>
                    <a href="/" className="header_social">
                        <TwitterIcon />
                    </a>
                    <a href="/" className="header_social">
                        <InstagramIcon />
                    </a>
                    <a href="/" className="header_social">
                        <EmailRoundedIcon />
                    </a>
                </div>

                <a href="/" className="header_link header_auth">Sign In</a>
            </div>
        </header>
    );
}

export default Header;