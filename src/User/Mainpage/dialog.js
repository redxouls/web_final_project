import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Choice from "./choice";
import LinearProgress from '@material-ui/core/LinearProgress';
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
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}


/*<DialogContent dividers>
  <RadioGroup
    ref={radioGroupRef}
    aria-label="test"
    name="test"
    value={value}
    onChange={handleChange}
  >
    {options.map((option) => (
      <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
    ))}
  </RadioGroup>
</DialogContent>*/
