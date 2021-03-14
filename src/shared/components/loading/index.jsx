import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    height: 760,
    textAlign: 'center',
    width: '100%',
    paddingTop: 120,
  },
});

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress />
      <br/>
      <i className={classes.loading}>Loading...️</i>
    </div>
  );
};

export default Loading;
