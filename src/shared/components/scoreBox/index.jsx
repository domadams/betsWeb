import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  score: {
    backgroundColor: '#888',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 2,
    color: '#efefef',
    fontWeight: 'bold',
  },
  scoreWinning: {
    backgroundColor: 'green',
  },
  scoreLosing: {
    backgroundColor: 'red',
  },
  scoreDraw: {
    backgroundColor: '#E1Ad01'
  }
}));

const ScoreBox = ({homeTeamScore, awayTeamScore}) => {
  if(homeTeamScore && awayTeamScore) {
    const classes = useStyles();
    const homeScoreInt = parseInt(homeTeamScore);
    const awayScoreInt = parseInt(awayTeamScore);
    let awayScoreClasses = classes.score;
    let homeScoreClasses = classes.score;

    switch (true) {
      case (homeScoreInt > awayScoreInt): {
        homeScoreClasses = `${classes.score} ${classes.scoreWinning}`;
        if(awayTeamScore !== '0') {
          awayScoreClasses= `${classes.score} ${classes.scoreLosing}`;
        }
        break;
      }
      case (awayScoreInt > homeScoreInt): {
        awayScoreClasses = `${classes.score} ${classes.scoreWinning}`;
        if(homeTeamScore !== '0') {
          homeScoreClasses= `${classes.score} ${classes.scoreLosing}`;
        }
        break;
      }
      case ((homeScoreInt === awayScoreInt) && homeScoreInt !== 0): {
        awayScoreClasses = `${classes.score} ${classes.scoreDraw}`;
        homeScoreClasses= `${classes.score} ${classes.scoreDraw}`;
        break;
      }
    }

    return (
      <>
        <Typography className={homeScoreClasses} variant="body1" gutterBottom>
          {homeTeamScore}
        </Typography>
        <Typography className={awayScoreClasses} variant="body1">
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
};

export default ScoreBox;
