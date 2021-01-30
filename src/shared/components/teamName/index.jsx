import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  clubLogo: {
    paddingRight: 8,
    minWidth: 28,
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
      <img
        src={`https://assets.b365api.com/images/team/s/${logo}.png`}
        alt={`${name} logo`}
        className={classes.clubLogo}
      />
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
