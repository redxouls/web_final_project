import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Mydialog from "./dialog";
import Timetable from "./timetable"

const useStyles = makeStyles((theme) => ({
  div: {
    padding: 10,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Timetable />
    </div>
  );
}