import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, CardActions,
        Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 20,
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const headingFont = createMuiTheme({
  typography: {
    fontFamily: [
    'Coda Caption',
    'sans-serif',
    ].join(','),
  },
});

export default (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { infor } = props;
  const infoList = Object.entries(infor);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const genInfo = (props) => {
    if (typeof props[1] == "string")
      return <div key={props[0]}>{props[0]} : {props[1]}</div>
  }

  return (
    <ThemeProvider theme={headingFont}>
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={infor.title}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {infoList.map(genInfo)}
        </CardContent>
      </Collapse>
    </Card>
    </ThemeProvider>
  );
}
