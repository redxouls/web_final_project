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
    height: 35,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: (props) => color[props.css_setting],
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
  const { onDel, name, num, click, idx } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleGotoCourse = () => {
    event.preventDefault();
    window.location.href = document.referrer + '#/Main/' + num;
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
    if ( typeof name === 'number') return;
    timeOutEvent = setTimeout(() => {
      longPress();
    }, 1000); // 一秒內算click
  };
  const handleEnd = () => {
    if ( typeof name === 'number') {
      click(idx);
      event.preventDefault()
      return;
    }
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
      <Paper className={classes.paper}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}>
        <Grid item xs className={classes.grid}>
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
            Cancel
          </Button>
          <Button onClick={handleSure} color="primary">
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
