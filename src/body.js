import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%",
  },
  name: {
    width: "65%",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
      <div className={classes.name}>
        hi
      </div>
      </Button>
    </div>
  );
}
