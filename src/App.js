import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import clsx from 'clsx';
import { Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
        Divider, IconButton, Button, AppBar } from '@material-ui/core';
import { KeyboardArrowUp, ArrowBack, ExitToApp } from '@material-ui/icons';
import User from "./User/main";
import Main from "./User/Mainpage/main"
import Login from "./User/Login/main"
import Tutorial from "./User/Tutorial/main"

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
  const [login, setLogin] = React.useState(true);
  const [logout, setLogout] = React.useState(true);

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
        {
          login ? logout ?
          <IconButton color="inherit" edge="end" onClick={goBack} className={classes.icon}>
            <ArrowBack />
          </IconButton>
          :
          <IconButton color="inherit" edge="end" onClick={goBack} className={classes.icon}>
            <ExitToApp />
          </IconButton>
          : []
        }
        <div className={classes.title}>加簽資訊論壇</div>
      </Toolbar>
    </AppBar>
    <Router>
      <div className={classes.top} />
      <Switch>
        <Route path="/User">
          <User setLogout={setLogout} />
        </Route>
        <Route path="/Login">
          <Login setLogin={setLogin} />
        </Route>
        <Route path="/Main/:serial_number" >
          <Main setLogout={setLogout} />
        </Route>
        <Route path="/Tutorial" >
          <Tutorial setLogin={setLogin} />
        </Route>
        <Redirect exact to="/Tutorial" from='/' />
      </Switch>
    </Router></>
  );
}
