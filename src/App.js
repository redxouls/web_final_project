import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import clsx from 'clsx';
import { Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
        Divider, IconButton, Button, AppBar } from '@material-ui/core';
import { KeyboardArrowUp, Menu } from '@material-ui/icons';
import User from "./User/main";
import Main from "./User/Mainpage/main"
import Login from "./User/Login/main"

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
    fontSize: 25,
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
        <div className={classes.title}>加簽資訊論壇</div>
      </Toolbar>
    </AppBar>
    <Router>
      <div className={classes.top} />
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
        <Redirect exact to="/Login" from='/' />
      </Switch>
    </Router></>
  );
}
