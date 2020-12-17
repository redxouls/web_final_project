import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Mydialog from "./dialog";
import Timetable from "./timetable"
import Startable from "./Startable"
import Bottom from "./bottom"
import Course_list from "./course_list"
import Main from "./main_table"

const useStyles = makeStyles((theme) => ({
}));

const mode = (value) => {
  if (value == "table")
    return <Timetable />;
  else if (value == "star")
    return <Startable />;
  else if(value == "login")
    return <Main />;
  else
    return <Course_list />;
}

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("login");
  return (
    <div>
      {mode(value)}
      {
        (value == "login") ? <></> : <Bottom value={value} setValue={setValue}/>
      }
    </div>
  );
}
