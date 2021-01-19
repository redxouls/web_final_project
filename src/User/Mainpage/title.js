import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, CardActions,
        Collapse, IconButton, Divider, Table, TableRow , TableBody, TableCell} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 7,
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  table: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
  const { infor, title} = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const geninfor = (k) => {
    if(k[1]=="" || k[1]==" ") return
    return(
    <TableRow key={k[0]} style={{padding: 5}}>
      <TableCell  style={{padding: 5}} component="th" scope="row">{k[0]}</TableCell>
      <TableCell style={{padding: 5}} align="right">{k[1]}</TableCell>
    </TableRow>
    );
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
        title={title}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent className={classes.table}>
          {//console.log(infor)
            (typeof infor === typeof [])?
            <Table aria-label="simple table" style={{width: '60%', alignItems: 'center'}}>
              <TableBody>
                {infor.map(geninfor)}
              </TableBody>
            </Table>
            : <></>
          }
        </CardContent>
      </Collapse>
    </Card>
    </ThemeProvider>
  );
}
