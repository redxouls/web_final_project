import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Course_button from "./course_button";
import Blank_button from "./blank_button";
import Day_block from "./day_block";
import Timenum from "./timenum";

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

const onDel = () => {
  console.log("delete!");
}



const daysIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeIdx = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "B", "C", "D"]
export default () => {
  const classes = useStyles();
  const [day, setDay] = useState(0);  // 0代表全部
  const [courses, setCourses] = useState({ 
    "Mon": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [{"serial_number": "44345", "title": " 微積分2"}], "A": [], "B": [], "C": [], "D": []},
    "Tue": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Wed": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [{"serial_number": "44345", "title": " 微積分2"}], "7": [{"serial_number": "44345", "title": " 微積分2"}], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Thu": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Fri": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [{"serial_number": "44345","title": " 微積分2"}], "7": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"},{"serial_number": "44345","title": " 微積分2"}], "8": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"}], "9": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"}], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Sat": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []}})
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
      return <Blank_button />;
    return <Course_button onDel={onDel} name={list.length} />;
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
      return <Blank_button />;
    return <Course_button onDel={onDel} name={item.title} />;
  }
  const generateDays = (e) => {
    return <Day_block key={e} name={e} click={handleClick} />
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