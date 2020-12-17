import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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


export default () => {
  const classes = useStyles();
  const [comments, set_comments] = useState(["123"]);

  return (
    <div className={classes.root}>
        {
            comments.map((com, index) =>{
                return(
                <Paper className={classes.paper} key={index}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>{com}</Typography>
                    </Grid>
                    </Grid>
                </Paper>
            )})
        }
    </div>
  );
}
