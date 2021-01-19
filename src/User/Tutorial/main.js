import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    bottom: 50,
    right: 30,
    position: "fixed",
  },
}));

export default (props) => {
  const classes = useStyles();
  const handlego = () => {
    history.pushState("", "", "/#/Login");
    history.go(0);
  };
  return (
    <div>
      <Button
        onClick={handlego}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        skip&login
      </Button>
      <img src="/asset/img/login.gif" width="60%" />
      <img src="/asset/img/comment.gif" width="60%" />
    </div>
  );
};
