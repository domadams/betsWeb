import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  placeHolder: {
    minWidth: 28,
    minHeight: 20,
  },
});

const Placeholder = () => {
  const classes = useStyles();
  return (
    <div className={classes.placeHolder} />
  );
};

export default Placeholder;
