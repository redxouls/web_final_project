import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  listitem: {
    backgroundColor: "lightblue",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "pink",
    },
    marginBottom : 10,
  },
}));

export default (props) => {
  const { title, serial_number, unfollow } = props;
  const classes = useStyles();
  const handlego = () => {
    window.location.href = document.referrer + '#/Main/' + serial_number;
  };
  const handleunfollow = () => {
    unfollow(serial_number);
  };
  return (
    <>
      <ListItem button className={classes.listitem} onClick={handlego}>
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleunfollow}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};
