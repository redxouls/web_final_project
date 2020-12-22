import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Table from '@material-ui/icons/Apps';
import Star from '@material-ui/icons/Star';
import List from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 35,
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  block: {
    height: 35,
  },
}));

export default (props) => {
  const {value, setValue} = props;
  const classes = useStyles();
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction value="star" icon={<Star />} />
        <BottomNavigationAction value="table" icon={<Table />} />
        <BottomNavigationAction value="list" icon={<List />} />
      </BottomNavigation>
      <div className={classes.block} />
    </div>
  );
}