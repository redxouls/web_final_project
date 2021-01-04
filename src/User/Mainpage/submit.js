import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bottom: {
    height: 50,
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  submit: {
    '& > *': {
        margin: theme.spacing(1),
        width: "75%",
    },
  }
}));

export default () => {
  const classes = useStyles();
  return (
      <BottomNavigation className={classes.bottom}>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Standard" />
        </form>
      </BottomNavigation>
  );
}
