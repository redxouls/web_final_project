import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Grid,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
const color = {
  Mon: "#FF9c9c",
  Tue: "#FFCC8E",
  Wed: "#Fbff86",
  Thu: "#B5FFA7",
  Fri: "#85ecFF",
  Sat: "#89b3ff",
};
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingLeft: 3,
    paddingRight: 3,
    height: 45,
    width: "10%",
  },
  paper: {
    margin: 3,
    padding: 1.5,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: (props) => color[props.css_setting],
    height: 35,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    lineHeight: 1.1,
    fontSize: "80%",
  },
});

export default (props) => {
  const { onDel, name, num } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleGotoCourse = () => {
    if (num === undefined) return;
    history.pushState("", "", "/#/Main/" + num);
    history.go(0);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSure = () => {
    setOpen(false);
    onDel(num);
  };

  let timeOutEvent = 0;
  const handleStart = () => {
    timeOutEvent = setTimeout(() => {
      longPress();
    }, 1000); // 一秒內算click
  };
  const handleEnd = () => {
    clearTimeout(timeOutEvent);
    if (timeOutEvent != 0) handleGotoCourse();
  };
  const longPress = () => {
    timeOutEvent = 0;
    setOpen(true);
  };
  // onMouseDown={handleStart} onMouseUp={handleEnd}>
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          item
          xs
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          className={classes.grid}
        >
          <div className={classes.name}>{name}</div>
        </Grid>
      </Paper>
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
