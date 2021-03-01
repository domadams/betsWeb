import React from 'react';
import {
  Grid, Paper, makeStyles, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Favourite from '../favourite';
import TeamName from '../teamName';
import ScoreBox from '../scoreBox';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  marginAuto: {
    margin: 'auto',
  },
  paper: {
    padding: 8,
    margin: 'auto',
    marginBottom: 10,
    width: '96%',
    backgroundColor: '#fff',
  },
  pulseAnimate: {
    animation: '$pulseUpdate 900ms infinite',
  },
  startTime: {
    color: '#be1e26',
    fontWeight: 'bold',
  },
  minuteBlink: {
    '&::after': {
      content: '"\'"',
      display: 'inline-block',
      animation: '$blink 1s infinite',
    },
  },
  '@keyframes blink': {
    '0%': {
      opacity: 1,
    },
    '1%': {
      opacity: 0,
    },
    '50%': {
      opacity: 0,
    },
    '51%': {
      opacity: 1,
    },
  },
  '@keyframes pulseUpdate': {
    '0%': {
      transform: 'scale(1)',
      backgroundColor: '#fff',
    },
    '80%': {
      transform: 'scale(1.03)',
      backgroundColor: '#006699',
    },
    '100%': {
      transform: 'scale(1)',
      backgroundColor: '#fff',
    },
  },
});

const MatchItem = ({
  eventId,
  showFavouriteIcon,
  homeImageId,
  homeTeamName,
  homeTeamScore,
  homePosition,
  awayImageId,
  awayTeamName,
  awayTeamScore,
  awayPosition,
  kickOffTime,
  flashUpdate,
}) => {
  const classes = useStyles();
  const [timeUpdate, setTimeUpdate] = React.useState('inherit');
  let timeClasses = classes.startTime;

  if (kickOffTime !== 'HT' && kickOffTime !== 'FT' && flashUpdate) {
    timeClasses = `${classes.startTime} ${classes.minuteBlink}`;
  }

  if (flashUpdate) {
    const pulseTimer = React.useRef(null);

    const setPulseUpdate = () => {
      setTimeUpdate(classes.pulseAnimate);
      pulseTimer.current = setTimeout(() => {
        setTimeUpdate('inherit');
        pulseTimer.current = null;
      }, 1000);
    };

    React.useEffect(() => {
      if (!pulseTimer.current && kickOffTime === '0\'') {
        setPulseUpdate();
      }
    }, [kickOffTime]);

    React.useEffect(() => () => {
      if (pulseTimer.current) {
        clearTimeout(pulseTimer.current);
      }
    }, []);
  }

  return (
    <div className={classes.root}>
      <Paper className={`${classes.paper} ${timeUpdate}`}>
        <Grid container spacing={0}>
          <Grid item xs={1} className={classes.marginAuto}>
            { showFavouriteIcon
              ? <Favourite eventId={eventId} />
              : null}
          </Grid>
          <Grid item xs={2} className={`${classes.marginAuto}`}>
            <Typography variant="subtitle2" className={timeClasses}>{kickOffTime}</Typography>
          </Grid>
          <Grid item xs={8} sm>
            <Grid item xs direction="column" spacing={1}>
              <Grid item xs>
                <TeamName
                  logo={homeImageId}
                  name={homeTeamName}
                  score={homeTeamScore}
                  position={homePosition}
                  flashUpdate={flashUpdate}
                />
                <TeamName
                  logo={awayImageId}
                  name={awayTeamName}
                  score={awayTeamScore}
                  position={awayPosition}
                  flashUpdate={flashUpdate}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid item xs direction="column" spacing={0}>
              <Grid item xs>
                <ScoreBox
                  homeTeamScore={homeTeamScore}
                  awayTeamScore={awayTeamScore}
                  flashUpdate={flashUpdate}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

MatchItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  homeImageId: PropTypes.string.isRequired,
  homeTeamName: PropTypes.string.isRequired,
  homeTeamScore: PropTypes.string.isRequired,
  homePosition: PropTypes.string,
  awayImageId: PropTypes.string.isRequired,
  awayTeamName: PropTypes.string.isRequired,
  awayTeamScore: PropTypes.string.isRequired,
  awayPosition: PropTypes.string,
  kickOffTime: PropTypes.string.isRequired,
  showFavouriteIcon: PropTypes.bool.isRequired,
  flashUpdate: PropTypes.bool.isRequired,
};

MatchItem.defaultProps = {
  awayPosition: null,
  homePosition: null,
};

export default MatchItem;
