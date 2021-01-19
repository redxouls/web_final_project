import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, DialogTitle, DialogContent,
        DialogActions, Dialog } from '@material-ui/core';
const color = {Mon: '#FF5171', Tue: '#FF8147', Wed: '#FFDA55', Thu: '#A3F560', Fri: '#4BF1DE', Sat: '#4EA9F3'}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingLeft: 3,
    paddingRight: 3,
    height: 45,
  },
  paper: {
    margin: 3,
    padding: 1.5,
    textAlign: 'center',
    backgroundColor: props => color[props.css_setting],
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
  const { name, click } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const handleclick = () => {
    click(name);
  }
  return (
    <div className={classes.root} onClick={handleclick}>
      <Paper className={classes.paper}>
        <Grid item xs className={classes.grid}>
          <div>{name}</div>
        </Grid>
      </Paper>
    </div>
  );
}
