import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: 35,
    width: 30,
  },
  button: {
    margin: 0,
    padding: 0,
    height: 35,
    width: 30,
  },
  name: {
    lineHeight: 1.1,
    fontSize: '0.01rem',
    maxWidth: 40,
  }
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
  }

  let timeOutEvent = 0
  const handleStart = () => {
    timeOutEvent = setTimeout(() => {longPress()},1000);  // 一秒內算click
  };
  const handleEnd = () => {
    clearTimeout(timeOutEvent);
    if(timeOutEvent != 0)
      handleGotoCourse();
  };
  const longPress = () => {
    timeOutEvent = 0;
    setOpen(true);
  }
      // onMouseDown={handleStart}  onMouseUp={handleEnd}>
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" 
      onTouchStart={handleStart}  onTouchEnd={handleEnd} className={classes.button}>
        <div className={classes.name}>{name}</div>
      </Button>
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
          <Button autoFocus onClick={handleCancel} color="primary"> Cancel </Button>
          <Button onClick={handleSure} color="primary"> Sure </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}