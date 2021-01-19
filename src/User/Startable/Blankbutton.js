import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
const color = {
  Mon: "#ffebee",
  Tue: "#fff3e0",
  Wed: "#fffde7",
  Thu: "#f1f8e9",
  Fri: "#e3f2fd",
  Sat: "#e8eaf6",
};
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
    textAlign: "center",
    backgroundColor: (props) => color[props.css_setting],
    height: 35,
    width: "100%",
  },
}));

export default (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid item xs>
          <div className={classes.name}></div>
        </Grid>
      </Paper>
    </div>
  );
};
