import React, { Suspense, lazy } from 'react';
import {
  Grid, Paper, makeStyles, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Typography = lazy(() => import('@material-ui/core/Typography'));
const Favourite = lazy(() => import('../favourite'));
const TeamName = lazy(() => import('../teamName'));
const ScoreBox = lazy(() => import('../scoreBox'));
const StatsContainer = lazy(() => import('../statsContainer'));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  fadeIn: {
    animation: '$fadeIn ease 300ms',
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
    minHeight: 72,
  },
  pulseAnimate: {
    animation: '$pulseUpdate 900ms infinite',
  },
  startTime: {
    color: '#be1e26',
    fontWeight: 600,
    animation: '$fadeIn ease 400ms',
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
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
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
  stats,
  homeStats,
  awayStats,
}) => {
  const classes = useStyles();
  const [timeUpdate, setTimeUpdate] = React.useState('inherit');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let homeRedCards; let
    awayRedCards = null;
  if (stats && stats.redcards) {
    homeRedCards = stats.redcards[0];
    awayRedCards = stats.redcards[1];
  }
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
        <Grid container spacing={0} onClick={handleExpandClick}>
          <Grid item xs={1} className={classes.marginAuto}>
            { showFavouriteIcon
              ? (
                <Suspense fallback={<></>}>
                  <Favourite eventId={eventId} className={classes.fadeIn} />
                </Suspense>
              )
              : null}
          </Grid>
          <Grid item xs={2} className={`${classes.marginAuto}`}>
            <Suspense fallback={<></>}>
              <Typography variant="subtitle2" className={timeClasses}>{kickOffTime}</Typography>
            </Suspense>
          </Grid>
          <Grid item xs={8} sm>
            <Suspense fallback={<></>}>
              <Grid item xs={12}>
                <TeamName
                  logo={homeImageId}
                  name={homeTeamName}
                  score={homeTeamScore}
                  position={homePosition}
                  flashUpdate={flashUpdate}
                  className={classes.fadeIn}
                  redCard={homeRedCards}
                />
              </Grid>
              <Grid item xs={12}>
                <TeamName
                  logo={awayImageId}
                  name={awayTeamName}
                  score={awayTeamScore}
                  position={awayPosition}
                  flashUpdate={flashUpdate}
                  className={classes.fadeIn}
                  redCard={awayRedCards}
                />
              </Grid>
            </Suspense>
          </Grid>
          <Grid item xs={1}>
            {homeTeamScore && awayTeamScore
              ? (
                <Suspense fallback={<></>}>
                  <ScoreBox
                    homeTeamScore={homeTeamScore}
                    awayTeamScore={awayTeamScore}
                    flashUpdate={flashUpdate}
                  />
                </Suspense>
              )
              : null}
          </Grid>
        </Grid>
        {stats && homeStats && awayStats
          ? (
            <Suspense fallback={(
              <>
                <CircularProgress />
                <br />
                <i className={classes.loading}>Loading...️</i>
              </>
            )}
            >
              <StatsContainer
                stats={stats}
                homeStats={homeStats}
                awayStats={awayStats}
              />
            </Suspense>
          )
          : null}
      </Paper>
    </div>
  );
};

MatchItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  homeImageId: PropTypes.string.isRequired,
  homeTeamName: PropTypes.string.isRequired,
  homeTeamScore: PropTypes.string,
  homePosition: PropTypes.string,
  awayImageId: PropTypes.string.isRequired,
  awayTeamName: PropTypes.string.isRequired,
  awayTeamScore: PropTypes.string,
  awayPosition: PropTypes.string,
  kickOffTime: PropTypes.string.isRequired,
  showFavouriteIcon: PropTypes.bool.isRequired,
  flashUpdate: PropTypes.bool.isRequired,
  stats: PropTypes.instanceOf(Object),
  homeStats: PropTypes.instanceOf(Object),
  awayStats: PropTypes.instanceOf(Object),
};

MatchItem.defaultProps = {
  awayTeamScore: null,
  homeTeamScore: null,
  awayPosition: null,
  homePosition: null,
  stats: null,
  homeStats: null,
  awayStats: null,
};

export default MatchItem;
