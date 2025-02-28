import { Paper, Grid, Avatar, Typography, Collapse, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  block: {
    height: 70,
  },
}));


export default (props) => {
  const classes = useStyles();
  const {comment} = props;
  const [expand, setExpand] = useState(false);
  const handleEx = () => {setExpand(true);}
  return (
    <div className={classes.root}>
      { comment.length == 0 ?
        "No comments..."
        :(expand ?
        comment.map((com, index) =>{
          return(
          <Paper className={classes.paper} key={index}>
              <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                  <Avatar>{com.username[0]}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="h10" component="h3">
                  {com.username}
                </Typography>
                <Typography color="textSecondary" component="p">{com.body}</Typography>
              </Grid>
              </Grid>
          </Paper>
        )})
        : comment.map((com, index) =>{
          return(
          <Paper className={classes.paper} key={index}>
              <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                  <Avatar>{com.username[0]}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="h10" component="h3">
                  {com.username}
                </Typography>
                <Typography color="textSecondary" component="p">{com.body}</Typography>
              </Grid>
              </Grid>
          </Paper>
        )}).slice(0, 3))
      }
      { (expand || comment.length < 4) ? [] :
        <Button onClick={handleEx} >
          <AddIcon />
        </Button>
      }
      <div className={classes.block} />
    </div>
  );
}
