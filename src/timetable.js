import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Course_button from "./course_button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const onDel = () => {
  console.log("delete!");
}

export default () => {
  const classes = useStyles();
  const handleclick = () => {
    alert("click")
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column" justify="center" alignItems="center">
        <Grid container spacing={1} direction="row" justify="center" alignItems="center">1
            <Grid item xs onclick={handleclick}><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
            <Grid item xs><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
            <Grid item xs><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
            <Grid item xs><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
            <Grid item xs><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
            <Grid item xs><Paper className={classes.paper}><Course_button onDel={onDel} name="測試測試測試測試" /></Paper></Grid>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}