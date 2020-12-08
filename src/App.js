import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Mydialog from "./dialog";
import Timetable from "./timetable"
import Bottom from "./bottom"
import Course_list from "./course_list"

const useStyles = makeStyles((theme) => ({
}));



export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("table");
  return (
    <div>
      {
        value == "table" ?
        <Timetable />
        : <Course_list />
      }
      <Bottom value={value} setValue={setValue}/>
    </div>
  );
}