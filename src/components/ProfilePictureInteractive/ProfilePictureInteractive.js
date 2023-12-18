import { useState } from 'react';

import axios from 'axios';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';

function ProfilePictureInteractive(props) {
	const {setProfileImageSrc, setProfileImageLink, setUser, profileImageSrc, profileImageLink} = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const profileImageStyle = {
        width: 30,
        height: 30,
        borderRadius: "50%",
    }

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	async function handleLogout() {
        await axios.get("http://localhost:3001/auth/logout/", {
            withCredentials: true,
            credentials: "include",
        })
        .then(response => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

			window.location.href = "/";
        })
        .catch(error => {
            console.log(error);
        });
    }

	return (
	<>
		<Tooltip title="Account settings">
			<IconButton
				onClick={handleClick}
				size="small"
				sx={{ ml: 2 }}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				<img
					src={profileImageSrc}
					alt="profileImage"
					style={profileImageStyle}
				/>
			</IconButton>
		</Tooltip>

		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			style={{
				elevation: 0,
				sx: {
				overflow: 'visible',
				filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
				mt: 1.5,
				'& .MuiAvatar-root': {
					width: 32,
					height: 32,
					ml: -0.5,
					mr: 1,
				},
				'&:before': {
					content: '""',
					display: 'block',
					position: 'absolute',
					top: 0,
					right: 14,
					width: 10,
					height: 10,
					bgcolor: 'background.paper',
					transform: 'translateY(-50%) rotate(45deg)',
					zIndex: 0,
				},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<Link href={profileImageLink} underline="none">
				<MenuItem>Profile</MenuItem>
			</Link>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>

				Settings
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>

				<span style={{ color: "darkred" }}>Logout</span>
			</MenuItem>
		</Menu>
	</>
	);
}

export default ProfilePictureInteractive;