import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/about"><ListItem button>
          <ListItemText primary="Inbox" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem></Link>
        <ListItem button>
          <ListItemText primary="Drafts" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}