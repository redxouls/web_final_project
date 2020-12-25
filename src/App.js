import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User/main";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Main from "./User/Mainpage/main";
import AppBar from "@material-ui/core/AppBar";

// for server dev
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "None",
  },
  hide: {
    display: "none",
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
  // server dev start
  useEffect(() => {
    const username = "Lisa";
    const password = "lightening_five_whips";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "include");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "manual",
    };
    fetch("./api/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        const socket = io({
          // path: "/mypath",
          query: {
            username: "CJF",
            serial_number: "01003",
          },
        });
        socket.on("connect", function () {
          console.log();
        });
        socket.on("UPDATE_SESSION", function (data) {
          console.log(data);
        });
        socket.on("disconnect", function () {});
      })
      .catch((error) => console.log("error", error));
  }, []);

  // server dev end

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
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
            {["about", "dashboard", "test"].map((text, index) => (
              <ListItem button key={text}>
                <Link to={"/" + text} className={classes.link}>
                  {text}
                </Link>
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
      </Router>
    </>
  );
};
