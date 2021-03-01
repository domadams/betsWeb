import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    minHeight: 600,
  },
});

const Loading = () => {
  const classes = useStyles();
  return (
    <>
      <i className={classes.loading}>Loading...️</i>
    </>
  );
};

export default Loading;
