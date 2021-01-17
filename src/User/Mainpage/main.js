import React, { useEffect, useState } from "react";
import Title from "./title";
import Dialog from "./dialog";
import Comment from "./comment";
import Submit from "./submit";
import { Schedule, People, BarChart } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
export default () => {
  const { serial_number } = useParams();
  const [course, set_course] = useState({});
  const [comment, set_comment] = useState([]);
  const [Vote, set_vote] = useState({});
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
      set_comment(data.comment);
      set_vote(data.vote);
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
      <Dialog serial_number={serial_number} question={Vote.time} title="time" icon={<Schedule/>}/>
      <Dialog serial_number={serial_number} question={Vote.priority} title="priority" icon={<BarChart/>}/>
      <Dialog serial_number={serial_number} question={Vote.people} title="people" icon={<People />}/>
      <Comment comment={comment}/>
      <Submit />
    </>
  );
};
