import React from 'react';
import { AppBar, Toolbar, IconButton,InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 55,
  },
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
    backgroundColor: "yellow",
    width: "100%",
    height: 45,
  },
}));

export default (props) => {
  const { follow } = props;
  const classes = useStyles();
  const handleEnter = (e) => {
    if(e.keyCode === 13 && e.target.value !== '') {
        console.log(e.target.value);
        follow(e.target.value);
        e.target.value = '';
    }
  }
  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
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