import React, { memo, Suspense } from 'react';
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
    fontWeight: 600,
  },
});

const LeagueBanner = ({ countryCode, leagueName }) => {
  if (countryCode) {
    const classes = useStyles();
    let cc = countryCode;
    if (cc === 'gb') {
      if (leagueName.includes('England')) {
        cc = 'gb_en';
      } else if (leagueName.includes('Scotland')) {
        cc = 'gb_sct';
      } else if (leagueName.includes('Wales')) {
        cc = 'gb_wls';
      }
    }
    const { name = '', component: Flag = null } = countries.find((o) => o.cc === cc);
    let league = leagueName.split(name)[1];
    if (!league || league === '') {
      league = leagueName;
    }

    return (
      <ListItem className={classes.leagueBanner}>
        <ListItemIcon>
          <Suspense fallback={<></>}>
            {Flag
              ? <Flag width={30} height={20} />
              : <></>}
          </Suspense>
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
