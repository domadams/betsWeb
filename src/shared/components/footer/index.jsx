import React from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  divider: {
    margin: 20,
  },
  footer: {
    padding: 10,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.divider} />
      <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
        {'Copyright © '}
        <Link to="/">Statosphere.com</Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    </>
  );
};

export default Footer;
