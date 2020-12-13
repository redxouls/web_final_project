import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
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

export default () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

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
        title="微積分"
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