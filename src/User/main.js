import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timetable from "./Timetable/main"
import Startable from "./Startable/main"
import Courselist from "./Courselist/main"
import Navigation from "./Navigation"

const useStyles = makeStyles((theme) => ({
}));

const onDel = () => {
  console.log("delete!");
}

const mode = (value) => {
  if (value == "table")
    return <Timetable onDel={onDel} />;
  else if (value == "star")
    return <Startable onDel={onDel} />;
  else
    return <Courselist onDel={onDel} />;
}

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Courselist");
  return (
    <div>
      {mode(value)}
      <Navigation value={value} setValue={setValue}/>
    </div>
  );
}