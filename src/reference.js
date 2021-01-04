import { LocalGasStation } from "@material-ui/icons";
import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

export default () => {
const socket = io({
    // path: "/mypath",
    query: {
      token: "CJF",
    },
  });

  const loginButton = () => {
    const username = "Lisa";
    const password = "l";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };
    fetch("./api/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const fetchCourse = () => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };

    fetch("./api/course?serial_number=01004", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const followCourse = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    var urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", "01004");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };

    fetch("./api/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const unfollowCourse = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    const urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", "01004");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };

    fetch("./api/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const fetchFollowedList = () => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };

    fetch("./api/user/list", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const fetchFollowedTimeline = () => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };

    fetch("./api/user/timeline", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const fetchvote = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


    var urlencoded = new URLSearchParams();
    urlencoded.append("option", "3");
    urlencoded.append("serial_number", "01005");
    urlencoded.append("question", "time");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/vote", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  socket.on("connect", function () {
    console.log();
  });
  socket.on("UPDATE_SESSION", function (data) {
    console.log(data);
  });
  socket.on("disconnect", function () {});

  return (
    <div>
      Welcome to React!
      <button onClick={loginButton}>login</button>
      <button onClick={fetchCourse}>get course data</button>
      <button onClick={followCourse}>Add course</button>
      <button onClick={unfollowCourse}>Delete course</button>
      <button onClick={fetchFollowedList}>Get followed list</button>
      <button onClick={fetchFollowedTimeline}>Get followed timeline</button>
    </div>
  );
};
// ReactDOM.render(<Index />, document.getElementById("root"));
