import React, { memo } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  score: {
    backgroundColor: '#888',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 2,
    color: '#efefef',
    fontWeight: 'bold',
    marginTop: 1,
  },
  scoreWinning: {
    backgroundColor: 'green',
  },
  scoreLosing: {
    backgroundColor: 'red',
  },
  scoreDraw: {
    backgroundColor: '#E1Ad01',
  },
  goalAnimation: {
    animation: '$pulseScore infinite 2000ms',
  },
  '@keyframes pulseScore': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.02)',
      opacity: 0.25,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

const ScoreBox = ({ homeTeamScore, awayTeamScore, flashUpdate }) => {
  if (homeTeamScore && awayTeamScore) {
    const classes = useStyles();
    const [homeScoreUpdate, setHomeScoreUpdate] = React.useState('inherit');
    const [awayScoreUpdate, setAwayScoreUpdate] = React.useState('inherit');
    const scoreTimer = React.useRef(null);
    const initialRenderHome = React.useRef(true);
    const initialRenderAway = React.useRef(true);
    const homeScoreInt = parseInt(homeTeamScore, 10);
    const awayScoreInt = parseInt(awayTeamScore, 10);
    let awayScoreClasses = classes.score;
    let homeScoreClasses = classes.score;

    switch (true) {
      case (homeScoreInt > awayScoreInt): {
        homeScoreClasses = `${classes.score} ${classes.scoreWinning}`;
        if (awayTeamScore !== '0') {
          awayScoreClasses = `${classes.score} ${classes.scoreLosing}`;
        }
        break;
      }
      case (awayScoreInt > homeScoreInt): {
        awayScoreClasses = `${classes.score} ${classes.scoreWinning}`;
        if (homeTeamScore !== '0') {
          homeScoreClasses = `${classes.score} ${classes.scoreLosing}`;
        }
        break;
      }
      case ((homeScoreInt === awayScoreInt) && homeScoreInt !== 0): {
        awayScoreClasses = `${classes.score} ${classes.scoreDraw}`;
        homeScoreClasses = `${classes.score} ${classes.scoreDraw}`;
        break;
      }
      default: {
        break;
      }
    }

    if (flashUpdate) {
      const updateHomeScore = () => {
        setHomeScoreUpdate(classes.goalAnimation);
        scoreTimer.current = setTimeout(() => {
          setHomeScoreUpdate('inherit');
          scoreTimer.current = null;
        }, 8000);
      };

      const updateAwayScore = () => {
        setAwayScoreUpdate(classes.goalAnimation);
        scoreTimer.current = setTimeout(() => {
          setAwayScoreUpdate('inherit');
          scoreTimer.current = null;
        }, 8000);
      };

      React.useEffect(() => {
        if (initialRenderHome.current) {
          initialRenderHome.current = false;
        } else if (!scoreTimer.current) {
          updateHomeScore();
        }
      }, [homeTeamScore]);

      React.useEffect(() => {
        if (initialRenderAway.current) {
          initialRenderAway.current = false;
        } else if (!scoreTimer.current) {
          updateAwayScore();
        }
      }, [awayTeamScore]);

      React.useEffect(() => () => {
        if (scoreTimer.current) {
          clearTimeout(scoreTimer.current);
        }
      }, []);
    }

    return (
      <>
        <Typography className={`${homeScoreClasses} ${homeScoreUpdate}`} variant="body1" gutterBottom>
          {homeTeamScore}
        </Typography>
        <Typography className={`${awayScoreClasses} ${awayScoreUpdate}`} variant="body1">
          {awayTeamScore}
        </Typography>
      </>
    );
  }
  return null;
};

ScoreBox.propTypes = {
  homeTeamScore: PropTypes.string.isRequired,
  awayTeamScore: PropTypes.string.isRequired,
  flashUpdate: PropTypes.bool.isRequired,
};

export default memo(ScoreBox);
