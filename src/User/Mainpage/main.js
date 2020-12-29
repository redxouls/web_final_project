import React, { useEffect, useState } from "react";
import Title from "./title";
import Dialog from "./dialog";
import Comment from "./comment";
import Fade from "@material-ui/core/Fade";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Submit from "./submit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export default () => {
  const { serial_number } = useParams();
  console.log(serial_number);
  const [checked, set_checked] = useState(true);
  const handleChange = () => {
    set_checked((prev) => !prev);
  };

  useEffect(() => {
    const socket = io({
      // path: "/mypath",
      query: {
        serial_number: serial_number,
      },
    });
    socket.on("connect", (data) => {
      data;
      console.log();
    });
    socket.on("JOIN_ROOM", (data) => {
      console.log(data);
    });
    socket.on("INITIALIZE", (data) => {
      console.log(data);
    });
    socket.on("UPDATE_VOTE", (data) => {
      console.log(data);
    });
    socket.on("UPDATE_COMMENT", (data) => {
      console.log(data);
    });
    socket.on("disconnect", () => {});
  }, []);
  return (
    <>
      <Title />
      <Dialog />
      <Dialog />
      <Dialog />
      <Fade in={checked}>
        <Comment />
      </Fade>
      <FormControlLabel
        control={
          <Button onClick={handleChange}>
            <AddIcon />
          </Button>
        }
      />
      <Submit />
    </>
  );
};
