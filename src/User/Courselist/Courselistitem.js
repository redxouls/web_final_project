import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  listitem: {
    backgroundColor: "lightblue",
    borderRadius: "10px",
    '&:hover': {
      backgroundColor: "pink",
    },
  },
}));

export default (props) => {
  const { title, serial_number, go, unfollow } = props;
  const classes = useStyles();
  const handlego = () => {
    go(serial_number);
  }
  const handleunfollow = () => {
    unfollow(serial_number);
  }
  return (<>
    <ListItem button className={classes.listitem} onClick={handlego}>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleunfollow}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider /></>
  );
}