import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, makeStyles, Typography, Button,
} from '@material-ui/core';
import broken from './broken.jpg';

const useStyles = makeStyles({
  errorLayout: {
    textAlign: 'center',
    marginTop: 10,
  },
  brokenImage: {
    width: '35%',
  },
  pageMessage: {
    padding: 10,
  },
});

const Error = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.errorLayout}>
      <Grid item xs={12}>
        <img alt="Broken Football Screen" src={broken} className={classes.brokenImage} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.pageMessage}>Oh no!</Typography>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.pageMessage}>
            Sorry something went wrong. We will clean up and try again.
          </Typography>
          <Link to="/">
            <Button variant="contained">
              Retun Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Error;
