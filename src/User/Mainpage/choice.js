import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogTitle, DialogContent,
        DialogActions, Dialog, RadioGroup, Radio,
        FormControlLabel, LinearProgress } from '@material-ui/core';

const options = ['第 1 節', '第 2 節', '第 3 節'];

export default function choice(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [rate, setRate] = React.useState(["time", "rule", "people"]);
  const radioGroupRef = React.useRef(null);



  const handleEntering = () => {
    if (radioGroupRef.current != null)
      radioGroupRef.current.focus();
  };

  const handleCancel = () => {
    onClose();
  };



  const handleOk = () => {
    console.log("ok");
    onClose(value);
  };

  const handleChange = (event) => {
    console.log("change")
    console.log(event.target);
    setValue(event.target.value);
  };
  const progress = 70;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">test</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="test"
          name="test"
          value={value}
          onChange={handleChange}
        >
          {options.map((option, index) => {
            return(
            <>
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
              <LinearProgress variant="determinate" value={rate[index]}/>
            </>)
          })}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
