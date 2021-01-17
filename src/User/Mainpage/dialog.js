import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Choice from "./choice";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({  // 改css
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%",
  },
  name: {
    width: "65%",
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

Choice.propTypes = {  // 檢查用法是否符合，可以刪掉
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');
  const {serial_number, question, title} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (newValue) => {
    setOpen(false);
    if (props === undefined)
      return;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("option", newValue);
    urlencoded.append("serial_number", serial_number);
    urlencoded.append("question", title);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'manual'
    };
    console.log(newValue)
    if (newValue)
    {
      fetch("http://localhost:3000/api/vote", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.message!="vote too often")
          console.log(newValue)
        else
          console.log("please wait 1 mins.")
      })
      .catch(error => console.log('error', error));
    }
  }
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
      >
      <div className={classes.name}>
        hi
      </div>
      </Button>
      <Choice
        classes={{
          paper: classes.paper,
        }}
        id="test-menu"
        keepMounted
        title={title}
        open={open}
        onClose={handleClose}
        value={value}
        question={question}
      />
    </div>
  );
}


