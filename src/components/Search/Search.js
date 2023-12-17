import { useState } from 'react';

import axios from "axios";

import { Box, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function Search() {
    const [open, setOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const [options, setOptions] = useState([]);
    const [timerId, setTimerId] = useState(null);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const searchOptions = async (newValue) => {
        if(newValue === "") {
            return;
        }

        await axios.get(
            "http://localhost:3001/search/",
            {
                params: {
                    newValue
                }
            } 
        )
        .then(response => {
            setOptions(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const searchOnChange = (e, newValue) => {
        if(timerId !== null) {
            clearTimeout(timerId);
        }

        setSearchQuery(newValue);
        setTimerId(setTimeout(() => searchOptions(newValue), 1000));
    }

    const isOptionEqualToValue = (option, value) => option.id === value.id && option.type === value.type;

    const getOptionLabel = (option) => {
        return `[${option.type.toUpperCase()}] ${option.value}`;
    };

    const optionOnClick = (e, option) => {
        if(option === "") {
            return;
        }

        if(option.type === "user") {
            window.location.href = `/profile/${option.id}`;
        } else if(option.type === "post") {
            window.location.href = `/post/${option.id}`;
        }

        return;
    }

    // const OptionComponent = (props) => {
    //     const {option} = props;

    //     return (
    //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
    //             <Typography
    //                 sx={{
    //                     p: 0.5,
    //                     width: "fit-content",
    //                     fontSize: "0.7rem",
    //                     backgroundColor: "var(--mainColor)",
    //                     color: "var(--backgroundColor)",
    //                     border: "1px solid rgba(0, 0, 0, 0.1)",
    //                     borderRadius: 1,
    //                     textTransform: "uppercase", 
    //                 }}
    //             >
    //                 {option.type}
    //             </Typography>

    //             <Typography>
    //                 {option.value}
    //             </Typography>
    //         </Box>
    //     )
    // };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Autocomplete
                inputValue={searchQuery}
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                onInputChange={searchOnChange}
                onChange={optionOnClick}
                onClick={handleClick}
                renderInput={(params) => <TextField {...params} label="Search" />}
            />
        </ClickAwayListener>
    )
}

export default Search;