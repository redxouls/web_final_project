import React, { useEffect, useState } from "react";
import Title from "./title";
import Dialog from "./dialog";
import Comment from "./comment";
import Submit from "./submit";
import Box from "@material-ui/core/Box";
import { Schedule, People, BarChart } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { palette } from "@material-ui/system";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default () => {
  const classes = useStyles();
  const { serial_number } = useParams();
  const [course, set_course] = useState([]);
  const [comment, set_comment] = useState([]);
  const [Vote, set_vote] = useState({});
  const [title, set_title] = useState("");
  const words = [
    "Department",
    "Credits",
    "Required",
    "Teacher",
    "Stu_limit",
    "Location",
  ];
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
        if (result.message == "Not authorized request") {
          history.replaceState("", "", "/");
          history.go(0);
        } else {
          console.log(result);
          set_title(result.title);
          var infor = words.map((word) => [word, result[word.toLowerCase()]]);
          console.log(infor[0][1]);
          set_course(infor.filter((info) => info[1] != " " && info[1] != ""));
        }
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
    <div className={classes.root}>
      <Title infor={course} title={title} />
      <Dialog
        serial_number={serial_number}
        question={Vote.time}
        title="time"
        icon={<Schedule style={{ fontSize: 30 }} />}
      />
      <Dialog
        serial_number={serial_number}
        question={Vote.priority}
        title="priority"
        icon={<BarChart style={{ fontSize: 30 }} />}
      />
      <Dialog
        serial_number={serial_number}
        question={Vote.people}
        title="people"
        icon={<People style={{ fontSize: 30 }} />}
      />
      <Comment comment={comment} />
      <Submit serial_number={serial_number} />
    </div>
  );
};
