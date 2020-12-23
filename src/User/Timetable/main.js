import React, { useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Coursebutton from "./Coursebutton";
import Blankbutton from "./Blankbutton";
import Dayblock from "./Dayblock";
import Timenum from "./Timenum";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 5,
    flexGrow: 1,
    border: 5,
    backgroundColor: 'white',
  },
  paper: {
    padding: 0,
    textAlign: 'center',
  },
  divider: {
    marginDown: 10,
    width: "95%",
    borderTop: 20,
    backgroundColor: "darkblue",
  },
}));

const daysIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeIdx = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "B", "C", "D"]
export default (props) => {
  const { onDel } = props;
  const classes = useStyles();
  const [day, setDay] = useState(0);  // 0代表全部
  const fetchFollowedTimeline = () => {
    const myHeaders = new Headers();
    myHeaders.append("credentials", "include");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "manual",
    };
    fetch("./api/user/timeline", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["message"] == undefined)
          setCourses(result)
        else
          alert("fetchTimeline", result["message"]);
      })
      .catch((error) => console.log("error", error));
  };
  const [courses, setCourses] = useState(() => {
    let init = {};
    for (var i = 0; i < 7; i++) {
      init[daysIdx[i]] = {};
      for (var j = 0; j < 14; j++)
        init[daysIdx[i]][timeIdx[j]] = [];
    }
    fetchFollowedTimeline();
    return init;
  });

  const handleClick = (e) => {  // 哪天被點
    if (day === 0)
      setDay(e);
    else
      setDay(0);
  }
  let row;
  const generateRow = (time) => {
    row = time;
    if (day === 0) {
      return (<><Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Timenum name={time} />
          {daysIdx.map(generateNum)}
        </Grid></>)
    } else {
      return (<><Divider className={classes.divider} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Timenum name={time} />
          {generateList()}
        </Grid></>)
    }
  }
  const generateNum = (day) => {
    const list = courses[day][row];
    if (list.length === 0)
      return <Blankbutton />;
    return <Coursebutton onDel={onDel} name={list.length} />;
  }
  const generateList = () => {
    const list = courses[day][row];
    let anslist = [];
    for (var i = 0; i < 6; i++)
      anslist[i] = generateBlock(day, i);
    return (anslist)
  }
  const generateBlock = (day, id) => {
    const item = courses[day][row][id];
    if (item === undefined)
      return <Blankbutton />;
    return <Coursebutton onDel={onDel} name={item.title} num={item.serial_number} />;
  }
  const generateDays = (e) => {
    return <Dayblock key={e} name={e} click={handleClick} />
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column" justify="center" alignItems="center">
        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
          <Timenum name="節數" />
          { day === 0 ? daysIdx.map(generateDays) : generateDays(day) }
        </Grid>
        {timeIdx.map(generateRow)}
      </Grid>
    </div>
  );
}