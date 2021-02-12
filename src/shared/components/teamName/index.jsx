import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';

const useStyles = makeStyles({
  clubLogo: {
    paddingRight: 8,
    marginTop: 5,
    minWidth: 28,
    maxWidth: 28,
    minHeight: 20,
    maxHeight: 20,
  },
});

const TeamName = ({ logo, name }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <LazyLoad
        height={20}
        offset={150}
        placeholder={<Placeholder />}
      >
        <img
          src={`https://assets.b365api.com/images/team/m/${logo}.png`}
          alt={`${name} logo`}
          className={classes.clubLogo}
        />
      </LazyLoad>
      <Typography variant="subtitle1">
        {name}
      </Typography>
    </Grid>
  );
};

TeamName.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TeamName;
