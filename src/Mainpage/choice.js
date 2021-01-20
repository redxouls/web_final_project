import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, DialogTitle, DialogContent, Grid,
        DialogActions, Dialog, RadioGroup, Radio,
        FormControlLabel, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  option: {
    flexGrow: 1,
  },
}));

export default function choice(props) {
  const classes = useStyles();
  const { onClose, value: valueProp, open, question, title, icon, ...other } = props;
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
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const reducer = (a, b) => a + b;
  const Title = {time: "加簽時間", priority: "加簽優先序", people: "加簽人數"}
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
      <DialogTitle id="confirmation-dialog-title">{Title[title]}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          name={title}
          value={value}
          onChange={handleChange}
        >
          {
            question==undefined ? <></> :
            Object.keys(question).map((option, index) => (
                Object.values(question)[0] == 0 ?
                [
                  <Grid container spacing={0} direction="row" justify="center" alignItems="center" key={option}>
                    <FormControlLabel value={option} key={option} control={<Radio />} label={option} className={classes.option} />
                    <div>0%</div>
                  </Grid>,
                  <LinearProgress variant="determinate" value={0} key={rate[index]} />
                ]
                :[
                  <Grid container spacing={0} direction="row" justify="center" alignItems="center" key={option}>
                    <FormControlLabel value={option} key={option} control={<Radio />} label={option} className={classes.option} />
                    <div>{question[option]} / {Object.values(question).reduce(reducer)}</div>
                  </Grid>,
                  <>
                  <LinearProgress variant="determinate" value={question[option]/Object.values(question)[0]*100} key={rate[index]} />
                  </>
                ]
              ))
          }
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
