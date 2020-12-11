import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "lightblue",
    color: theme.palette.text.secondary,
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
    //fontSize: 1,
  },
}));

export default (props) => {
  const { onDel, name } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleGotoCourse = () => {
    console.log("go to course");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSure = () => {
    setOpen(false);
    onDel();
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
  // onMouseDown={handleStart}  onMouseUp={handleEnd}>
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          item
          xs
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
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
        <DialogTitle id="confirmation-dialog-title">test</DialogTitle>
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
