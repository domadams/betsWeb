import React from 'react';
import {
  Grid, Paper, makeStyles, Typography,
} from '@material-ui/core';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import PropTypes from 'prop-types';
import TeamName from '../teamName';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  marginAuto: {
    margin: 'auto',
  },
  paper: {
    padding: 10,
    margin: 'auto',
    marginBottom: 10,
  },
  startTime: {
    color: '#be1e26',
    fontWeight: 'bold',
  },
});

const MatchItem = ({
  homeImageId, homeTeamName, awayImageId, awayTeamName, kickOffTime,
}) => {
  const classes = useStyles();
  const kickOffDate = new Date(parseInt(kickOffTime, 10) * 1000).toLocaleTimeString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={1} className={classes.marginAuto}>
            <StarBorderOutlinedIcon />
          </Grid>
          <Grid item xs={2} className={classes.marginAuto}>
            <Typography variant="subtitle1" className={classes.startTime}>{kickOffDate}</Typography>
          </Grid>
          <Grid item xs={7} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <TeamName logo={homeImageId} name={homeTeamName} />
                <TeamName logo={awayImageId} name={awayTeamName} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" />
                <Typography variant="body2" gutterBottom />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

MatchItem.propTypes = {
  homeImageId: PropTypes.string.isRequired,
  homeTeamName: PropTypes.string.isRequired,
  awayImageId: PropTypes.string.isRequired,
  awayTeamName: PropTypes.string.isRequired,
  kickOffTime: PropTypes.string.isRequired,
};

export default MatchItem;
