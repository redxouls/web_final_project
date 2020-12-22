import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';;
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  Add: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
  },
  AddIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
  block: {
    height: 45,
  },
}));

const handleEnter = (e) => {
  if(e.keyCode === 13 && e.target.value !== '') {
      console.log(e.target.value);
      e.target.value = '';
  }
}

export default () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.Add}>
            <div className={classes.AddIcon}>
              <AddIcon />
            </div>
            <InputBase
              placeholder="Please input serial number"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={handleEnter}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.block} />
    </div>
  );
}