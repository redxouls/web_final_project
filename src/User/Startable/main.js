import React, { useEffect, useState } from 'react';
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
  const [courses, setCourses] = useState({ 
    "Mon": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [{"serial_number": "44345", "title": " 微積分2"}], "A": [], "B": [], "C": [], "D": []},
    "Tue": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Wed": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [{"serial_number": "44345", "title": " 微積分2"}], "7": [{"serial_number": "44345", "title": " 微積分2"}], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Thu": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Fri": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [{"serial_number": "44345","title": " 微積分2"}], "7": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"},{"serial_number": "44345","title": " 微積分2"}], "8": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"}], "9": [{"serial_number": "01001","title": " 大學國文：文學鑑賞與寫作（一）"}], "10": [], "A": [], "B": [], "C": [], "D": []},
    "Sat": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": []}})
  const handleClick = () => {}  // donothing
  let row;
  const generateRow = (time) => {
    row = time;
    return (<><Divider className={classes.divider} />
      <Grid container spacing={0} direction="row" justify="center" alignItems="center">
        <Timenum name={time} />
        {daysIdx.map(generateBlock)}
      </Grid></>)
  }
  const generateBlock = (day) => {
    const list = courses[day][row];
    if (list.length === 0)
      return <Blankbutton />;
    return <Coursebutton onDel={onDel} name={list[0].title} />;
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