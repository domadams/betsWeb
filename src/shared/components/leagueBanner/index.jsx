import React from 'react';
import {
  ListItem, ListItemIcon, makeStyles, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import countries from '../../countries';

const useStyles = makeStyles({
  leagueBanner: {
    backgroundColor: '#d0e3ec',
    paddingLeft: 20,
    display: 'flex',
    textTransform: 'uppercase',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #999',
    marginBottom: 3,
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

  let league = leagueName.split(name)[1];
  if(!league || league === '') {
    league = leagueName
  }

  return (
    <ListItem className={classes.leagueBanner}>
      <ListItemIcon>
        <FlagComponent />
      </ListItemIcon>
      <Typography>
        {name}
        :&nbsp;
      </Typography>
      <Typography className={classes.leagueName}>{league}</Typography>
    </ListItem>
  );
};

LeagueBanner.propTypes = {
  countryCode: PropTypes.string.isRequired,
  leagueName: PropTypes.string.isRequired,
};

export default LeagueBanner;
