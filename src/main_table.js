import React, { useEffect, useState } from 'react';
import Title from "./title";
import Dialog from "./dialog";
import Comment from "./comment";
import Fade from '@material-ui/core/Fade';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Submit from "./submit";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button"
import FormControlLabel from '@material-ui/core/FormControlLabel';
export default () => {
    const [checked, set_checked] = useState(true);
    const handleChange = () => {
        set_checked((prev) => !prev);
    };

    return(
        <>
        <Title />
        <Dialog />
        <Dialog />
        <Dialog />
        <Fade in={checked}>
            <Comment />
        </Fade>
        <FormControlLabel
            control={<Button onClick={handleChange}>
            <AddIcon />
        </Button>}
        />
        <Submit />
        </>
    );
}
