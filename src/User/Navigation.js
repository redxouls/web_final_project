import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Apps, Star, List } from '@material-ui/icons';

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
        className={classes.root}
      >
        <BottomNavigationAction value="Apps" icon={<Apps />} />
        <BottomNavigationAction value="star" icon={<Star />} />
        <BottomNavigationAction value="list" icon={<List />} />
      </BottomNavigation>
      <div className={classes.block} />
    </div>
  );
}
