import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Mydialog from "./dialog";
import Timetable from "./timetable"
import Startable from "./Startable"
import Bottom from "./bottom"
import Course_list from "./course_list"
import SignIn from "./login"

const useStyles = makeStyles((theme) => ({
}));

const mode = (value) => {
  if (value == "table")
    return <Timetable />;
  else if (value == "star")
    return <Startable />;
  else if(value == "login")
    return <SignIn />;
  else
    return <Course_list />;
}

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("star");
  return (
    <div>
      {mode(value)}
      {
        (value == "login") ? <></> : <Bottom value={value} setValue={setValue}/>
      }
    </div>
  );
}
