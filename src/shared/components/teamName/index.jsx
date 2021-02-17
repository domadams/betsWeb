import React, { memo } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';
import footballIcon from './footballIcon.png';

const useStyles = makeStyles({
  clubLogo: {
    paddingRight: 8,
    marginTop: 5,
    minWidth: 28,
    maxWidth: 28,
    minHeight: 20,
    maxHeight: 20,
  },
  footballIcon: {
    minHeight: 20,
    maxHeight: 20,
    marginLeft: 10,
    opacity: 0,
    verticalAlign: 'middle',
  },
  footballIconAppear: {
    animation: '$fadeInOut infinite 15000ms',
  },
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0,
    },
    '10%': {
      opacity: 1,
    },
    '90%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
});

const TeamName = ({
  logo, name, score, position, flashUpdate,
}) => {
  const classes = useStyles();
  const [scoreUpdate, setScoreUpdate] = React.useState('inherit');
  const scoreTimer = React.useRef(null);
  const initialRender = React.useRef(true);

  if (flashUpdate) {
    const setUpdate = () => {
      setScoreUpdate(classes.footballIconAppear);
      scoreTimer.current = setTimeout(() => {
        setScoreUpdate('inherit');
        scoreTimer.current = null;
      }, 15000);
    };

    React.useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
      } else if (!scoreTimer.current) {
        setUpdate();
      }
    }, [score]);

    React.useEffect(() => () => {
      if (scoreTimer.current) {
        clearTimeout(scoreTimer.current);
      }
    }, []);
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <Grid item xs={2}>
        <LazyLoad
          height={20}
          offset={150}
          placeholder={<Placeholder />}
        >
          {logo
            ? (
              <img
                src={`https://assets.b365api.com/images/team/m/${logo}.png`}
                alt={`${name} logo`}
                className={classes.clubLogo}
              />
            )
            : <Placeholder />}
        </LazyLoad>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle1">
          {`${name} `}
          {
            position
              ? (
                <>
                  (
                  {position}
                  )
                </>
              )
              : null
          }
          {
            flashUpdate
              ? <img src={footballIcon} alt="Football Icon" className={`${classes.footballIcon} ${scoreUpdate}`} />
              : null
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

TeamName.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  flashUpdate: PropTypes.bool.isRequired,
  position: PropTypes.string,
};

TeamName.defaultProps = {
  position: null,
};

export default memo(TeamName);
