import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Choice from "./choice";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  // 改css
  root: {
    margin: "auto",
    width: "85%",
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginBottom: theme.spacing(2),
    fontSize: "20px",
    width: "100%",
    backgroundColor: "#D1C4E9",
  },
  name: {
    margin: "auto",
    width: "100%",
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}));

Choice.propTypes = {
  // 檢查用法是否符合，可以刪掉
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const { serial_number, question, title, icon } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (newValue) => {
    setOpen(false);
    if (props === undefined) return;

    /*
    myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3ACez8WZPX_XqmNFJo7yvPTPYljVCU7iU1.IgCXaGdlkl2MTca4iOB7nAfQvIQIt8YVo0IAzOK2UPQ"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", "01004");
    urlencoded.append("option", "2");
    urlencoded.append("question", "rule");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/vote", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    */
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    const urlencoded = new URLSearchParams();
    // urlencoded.append("serial_number", serial_number);
    // urlencoded.append("option", newValue);
    // urlencoded.append("question", title);

    // var urlencoded = new URLSearchParams();
    urlencoded.append("serial_number", "01004");
    urlencoded.append("option", "2");
    urlencoded.append("question", "rule");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    console.log(newValue);
    if (newValue) {
      fetch("/api/vote", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message != "vote too often") console.log(newValue);
          else console.log("please wait 1 mins.");
        })
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={icon}
        onClick={handleClickOpen}
      >
        <div className={classes.name}>
          {question == undefined ? "waiting..." : Object.keys(question)[0]}
        </div>
      </Button>
      <Choice
        classes={{
          paper: classes.paper,
        }}
        id="test-menu"
        keepMounted
        title={title}
        open={open}
        onClose={handleClose}
        value={value}
        question={question}
        icon={icon}
      />
    </div>
  );
};
