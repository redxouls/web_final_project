import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import clsx from 'clsx';
import { Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
        Divider, IconButton, Button, AppBar } from '@material-ui/core';
import { KeyboardArrowUp, ArrowBack, ExitToApp } from '@material-ui/icons';
import User from "./User/main";
import Main from "./Mainpage/main"
import Login from "./Login/main"
import Tutorial from "./Tutorial/main"

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
    margin: 'auto',
    fontSize: 25,
  },
  icon: {
    position: 'fixed',
  },
  top: {
    height: 50,
  },
}));

export default () => {
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goBack = () => {
    history.go(-1);
  }

  return (<>
    <AppBar position="fixed">
      <Toolbar>
        <Router>
          <Switch>
            <Route path="/User">
              <IconButton color="inherit" edge="end" onClick={goBack} className={classes.icon}>
                <ExitToApp />
              </IconButton>
            </Route>
            <Route path="/Main/:serial_number" >
              <IconButton color="inherit" edge="end" onClick={goBack} className={classes.icon}>
                <ArrowBack />
              </IconButton>
            </Route>
          </Switch>
        <Router>
        <div className={classes.title}>加簽資訊論壇</div>
      </Toolbar>
    </AppBar>
    <div className={classes.top} />
    <Router>
      <Switch>
        <Route path="/User">
          <User />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Main/:serial_number" >
          <Main />
        </Route>
        <Route path="/Tutorial" >
          <Tutorial />
        </Route>
        <Redirect exact to="/Tutorial" from='/' />
      </Switch>
    <Router>
    </>
  );
}
