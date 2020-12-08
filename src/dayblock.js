import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: 45,
    width: 50,
  },
  paper: {
    margin: 3,
    padding: 1.5,
    textAlign: 'center',
    backgroundColor: "white",
    color: theme.palette.text.secondary,
    height: 35,
    width: 45,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    lineHeight: 1.1,
    fontSize: 1,
  }
}));

export default (props) => {
  const {name} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item xs className={classes.grid}>
          <div className={classes.name}>{name}</div>
        </Grid>
      </Paper>
    </div>
  );
}