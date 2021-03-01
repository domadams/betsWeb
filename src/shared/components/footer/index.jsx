import React from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  footer: {
    marginTop: 20,
    padding: 10,
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Divider />
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to="/">Statosphere.com</Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    </footer>
  );
};

export default Footer;
