import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bottom: {
    height: 50,
    position: "fixed",
    bottom: 0,
    paddingBottom: 20,
    width: "100%",
  },
  formBox: {
    width: "80%",
  },
  text: {
    width: "100%",
  },
}));

export default (props) => {
  const classes = useStyles();
  const { serial_number } = props;
  const handleEnter = (e) => {
    if(e.keyCode === 13 && e.target.value !== '') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("credentials", "include");

        var urlencoded = new URLSearchParams();
        urlencoded.append("serial_number", serial_number);
        urlencoded.append("body", e.target.value);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("./api/comment", requestOptions)
          .then(response => response.json())
          .then(result => {
            e.target.value = '';
          })
          .catch(error => console.log('error', error));
    }
  }
  return (
    <BottomNavigation className={classes.bottom} >
      <div className={classes.formBox}>
      <TextField className={classes.text} id="standard-basic"
        label="Standard" onKeyDown={handleEnter} />
      </div>
    </BottomNavigation>
  );
}
