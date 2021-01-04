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
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
export default () => {
    const { serial_number } = useParams();
    const [checked, set_checked] = useState(true);
    const [course, set_course] = useState({});

    const handleChange = () => {
        set_checked((prev) => !prev);
    };
    const fetchCourse = () => {
        const myHeaders = new Headers();
        myHeaders.append("credentials", "include");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "manual",
        };

        fetch("./api/course?serial_number=" + serial_number, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            set_course(result);
          })
          .catch((error) => console.log("error", error));

    };
    useEffect(() =>{
        fetchCourse();
    }, []);
    return(
        <>
        <Title infor={course}/>
        <Dialog serial_number={serial_number} question={"time"}/>
        <Dialog serial_number={serial_number} question={"people"}/>
        <Dialog serial_number={serial_number} question={"rule"}/>
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
