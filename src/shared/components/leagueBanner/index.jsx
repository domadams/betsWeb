import React from 'react';
import {
  ListItem, ListItemIcon, makeStyles, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import countries from '../../countries';

const useStyles = makeStyles({
  leagueBanner: {
    backgroundColor: '#d0e3ec',
    display: 'flex',
    textTransform: 'uppercase',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #999',
  },
  leagueName: {
    fontWeight: 'bold',
  },
});

const LeagueBanner = ({ countryCode, leagueName }) => {
  const classes = useStyles();
  const {
    name,
    component: FlagComponent,
  } = countries.find((o) => o.cc === countryCode);

  return (
    <ListItem className={classes.leagueBanner}>
      <ListItemIcon>
        <FlagComponent />
      </ListItemIcon>
      <Typography>
        {name}
        :&nbsp;
      </Typography>
      <Typography className={classes.leagueName}>{leagueName}</Typography>
    </ListItem>
  );
};

LeagueBanner.propTypes = {
  countryCode: PropTypes.string.isRequired,
  leagueName: PropTypes.string.isRequired,
};

export default LeagueBanner;
