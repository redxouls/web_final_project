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
    // marginBottom: 20,
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
  return (
    <BottomNavigation className={classes.bottom} >
      <form className={classes.formBox} noValidate autoComplete="off" >
          <TextField className={classes.text} id="standard-basic" label="Standard" />
      </form>
    </BottomNavigation>
  );
}
