import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Course_button from "./course_button";
import Blank_button from "./blank_button";
import Dayblock from "./dayblock";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: 5,
    backgroundColor: 'white',
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginDown: 10,
    width: 350,
    borderTop: 20,
    backgroundColor: "darkblue",
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
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="節數" />
          <Dayblock name="一" />
          <Dayblock name="二" />
          <Dayblock name="三" />
          <Dayblock name="四" />
          <Dayblock name="五" />
          <Dayblock name="六" />
        </Grid>
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="1" />
          <Course_button onDel={onDel} name="測試" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="2" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Blank_button />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="3" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="4" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="5" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Blank_button />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="6" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="7" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="8" />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="9" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="10" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="A" />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="B" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="C" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Dayblock name="D" />
          <Course_button onDel={onDel} name="測試測試測試測試" />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Blank_button />
          <Course_button onDel={onDel} name="測試測試測試測試" />
        </Grid>
      </Grid>
    </div>
  );
}