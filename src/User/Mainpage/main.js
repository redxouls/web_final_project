import React, { useEffect, useState } from "react";
import { Fade, Button, FormControlLabel } from "@material-ui/core";
import Title from "./title";
import Dialog from "./dialog";
import Comment from "./comment";
import Submit from "./submit";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
export default () => {
  const { serial_number } = useParams();
  const [checked, set_checked] = useState(true);
  const [course, set_course] = useState({});
  const [comment, set_comment] = useState([]);
  const [vote, set_vote] = useState([]);
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

  useEffect(() => {
    fetchCourse();
  }, []);

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
      <Title infor={course} />
      <Dialog serial_number={serial_number} question={"time"} />
      <Dialog serial_number={serial_number} question={"people"} />
      <Dialog serial_number={serial_number} question={"rule"} />
      <Fade in={checked}>
        <Comment comment={comment}/>
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
