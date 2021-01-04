import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, CardActions,
        Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { infor } = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
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
        //title="123"
        // subheader="流水號：12345"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          hi
        </CardContent>
      </Collapse>
    </Card>
  );
}
