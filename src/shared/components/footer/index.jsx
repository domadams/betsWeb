import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link to="/">BetsWeb.com</Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

export default Footer;
