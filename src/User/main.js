import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timetable from "./Timetable/main"
import Startable from "./Startable/main"
import Courselist from "./Courselist/main"
import Navigation from "./Navigation"

const useStyles = makeStyles((theme) => ({
}));

const mode = (value) => {
  if (value == "table")
    return <Timetable />;
  else if (value == "star")
    return <Startable />;
  else
    return <Courselist />;
}

export default (props) => {
  const { setLogout } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("star");
  useEffect(() => {
    setLogout(false);
  }, [])
  return (
    <div>
      {mode(value)}
      <Navigation value={value} setValue={setValue}/>
    </div>
  );
}
