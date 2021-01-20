import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Courselistitem from "./Courselistitem";
import Addcourse from "./Addcourse";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    marginTop: 100,
    marginRight: 30,
    width: "100%",
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dealnum, setDealnum] = React.useState();

  const fetchFollowedList = () => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };
    fetch("./api/user/list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "Not authorized request")
          window.location.href = document.referrer + '#/Login'
        else if (result["message"] == undefined) {
          setCourses(result);
          console.log("fetch", result);
        } else console.log(result["message"]);
      })
      .catch((error) => console.log("error", error));
  };
  const [courses, setCourses] = useState(undefined);
  useEffect(() => {
    fetchFollowedList();
  }, []);

  const followCourse = (serial_number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    var urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", serial_number);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };

    fetch("./api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["following"] == undefined) alert(result["message"]);
        else fetchFollowedList();
      })
      .catch((error) => console.log("error", error));
  };

  const unfollowCourse = (serial_number) => {
    console.log(serial_number);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    const urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", serial_number);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };

    fetch("./api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["following"] == undefined) alert(result["message"]);
        else fetchFollowedList();
      })
      .catch((error) => console.log("error", error));
  };

  const openDia = (num) => {
    setOpen(true);
    setDealnum(num);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSure = () => {
    setOpen(false);
    unfollowCourse(dealnum);
  };

  const genCourse = (c) => {
    return (
      <Courselistitem
        key={c.serial_number}
        serial_number={c.serial_number}
        title={c.title}
        unfollow={openDia}
      />
    );
  };
  return (
    <div className={classes.root}>
      <Addcourse follow={followCourse} />

      {courses === undefined ? (
        []
      ) : courses.length === 0 ? (
        <img src="/asset/img/catcircle.png" className={classes.img} />
      ) : (
        <List className={classes.list}>{courses.map(genCourse)}</List>
      )}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogContent> 確定要刪除？ </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            {" "}
            Cancel{" "}
          </Button>
          <Button onClick={handleSure} color="primary">
            {" "}
            Sure{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
