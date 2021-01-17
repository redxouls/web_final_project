import { Paper, Grid, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


export default (props) => {
  const classes = useStyles();
  const {comment} = props;
  useEffect(() => {
    console.log(comment);
  });
  return (
    <div className={classes.root}>
        {
            comment.map((com, index) =>{
                return(
                <Paper className={classes.paper} key={index}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h10" component="h3">
                        {com.username}
                      </Typography>
                      <Typography>{com.body}</Typography>
                    </Grid>
                    </Grid>
                </Paper>
            )})
        }
    </div>
  );
}
