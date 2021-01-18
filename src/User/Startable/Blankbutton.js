import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, DialogTitle, DialogContent,
        DialogActions, Dialog } from '@material-ui/core';
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
    textAlign: 'center',
    backgroundColor: "pink",
    color: theme.palette.text.secondary,
    height: 35,
    width: "100%",
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item xs>
          <div className={classes.name}></div>
        </Grid>
      </Paper>
    </div>
  );
}