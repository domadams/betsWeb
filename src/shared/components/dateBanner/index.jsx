import React from 'react';
import {
  ListItem, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  dateBanner: {
    backgroundColor: '#ccc',
    display: 'flex',
  },
});

const DateBanner = ({ date }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.dateBanner} key={date}>
      {date}
    </ListItem>
  );
};

DateBanner.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateBanner;
