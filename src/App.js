import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User/main";
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import Main from "./User/Mainpage/main"
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "None",
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: "100%",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  top: {
    height: 50,
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (<>
    <AppBar position="fixed">
      <Toolbar>
        <div className={classes.title}>test</div>
        <IconButton color="inherit" edge="end" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Router>
      <Drawer className={classes.drawer} anchor="top" open={open}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['about', 'dashboard', 'test'].map((text, index) => (
            <ListItem button key={text}>
              <Link to={'/'+text} className={classes.link}>{text}</Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.top} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/about">
          <User />
        </Route>
        <Route path="/dashboard">
          <User />
        </Route>
        <Route path="/test">
          <User />
        </Route>
      </Switch>
    </Router></>
  );
}
