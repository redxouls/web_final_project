import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Choice from "./choice";

const useStyles = makeStyles((theme) => ({  // 改css
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue)
      setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Choice
        classes={{
          paper: classes.paper,
        }}
        id="test-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />    </div>
  );
}