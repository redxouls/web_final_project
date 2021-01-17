import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bottom: {
    height: 50,
    position: "fixed",
    bottom: 0,
    paddingBottom: 20,
    width: "100%",
  },
  formBox: {
    width: "80%",
  },
  text: {
    width: "100%",
  },
}));

export default () => {
  const classes = useStyles();
  const handleEnter = (e) => {
    if(e.keyCode === 13 && e.target.value !== '') {
        console.log(e.target.value);
        e.target.value = '';
    }
  }
  return (
    <BottomNavigation className={classes.bottom} >
      <div className={classes.formBox}>
      <TextField className={classes.text} id="standard-basic" 
        label="Standard" onKeyDown={handleEnter} />
      </div>
    </BottomNavigation>
  );
}
