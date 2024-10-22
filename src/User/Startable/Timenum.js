import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
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
    backgroundColor: "white",
    color: theme.palette.text.secondary,
    height: 35,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
}));

export default (props) => {
  const {name} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid item xs className={classes.grid}>
          <div>{name}</div>
        </Grid>
      </Paper>
    </div>
  );
}