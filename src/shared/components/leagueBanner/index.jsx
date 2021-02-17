import React, { memo } from 'react';
import {
  ListItem, ListItemIcon, makeStyles, Typography,
} from '@material-ui/core';
import Flag from 'react-world-flags';
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
  if (countryCode) {
    const classes = useStyles();
    let cc = countryCode;
    let { name = '' } = countries.find((o) => o.cc === cc) || '';

    if (cc === 'gb') {
      if (leagueName.includes('England')) {
        cc = 'GB_ENG';
      } else if (leagueName.includes('Scotland')) {
        cc = 'GB_SCT';
        name = 'Scotland';
      } else if (leagueName.includes('Wales')) {
        cc = 'GB_WLS';
        name = 'Wales';
      }
    }

    let league = leagueName.split(name)[1];
    if (!league || league === '') {
      league = leagueName;
    }

    return (
      <ListItem className={classes.leagueBanner}>
        <ListItemIcon>
          <Flag code={cc} height="20" />
        </ListItemIcon>
        <Typography>
          {name}
          :&nbsp;
        </Typography>
        <Typography className={classes.leagueName}>{league}</Typography>
      </ListItem>
    );
  }
  return null;
};

LeagueBanner.propTypes = {
  countryCode: PropTypes.string.isRequired,
  leagueName: PropTypes.string.isRequired,
};

export default memo(LeagueBanner);
