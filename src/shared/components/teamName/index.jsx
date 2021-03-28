import React, { memo } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';

const useStyles = makeStyles({
  clubLogoImage: {
    marginRight: 8,
    marginTop: 3,
    animation: '$fadeIn ease 300ms',
  },
  redCards: {
    backgroundColor: 'red',
    borderRadius: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: 700,
    width: 14,
    marginLeft: 6,
    height: 20,
    lineHeight: '20px',
    display: 'inline-block',
  },
  footballIcon: {
    minHeight: 20,
    maxHeight: 20,
    marginLeft: 10,
    opacity: 0,
    verticalAlign: 'middle',
  },
  footballIconAppear: {
    animation: '$fadeInOut infinite 15s',
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
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
});

const TeamName = ({
  logo, name, score, redCard, position, flashUpdate,
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
          offset={450}
          once
          placeholder={<Placeholder />}
        >
          {logo
            ? (
              <img
                src={`https://assets.b365api.com/images/team/m/${logo}.png`}
                alt={`${name} logo`}
                width={20}
                height={20}
                className={classes.clubLogoImage}
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
            (redCard && redCard !== '0')
              ? (
                <span className={classes.redCards}>
                  {redCard}
                </span>
              )
              : null
          }
          {
            flashUpdate
              ? (
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAMAAAAtFKi+AAAAsVBMVEUAAAAAAAAAAAAAAAA0NDQAAAAAAAAAAAAPDw8AAAAAAAABAQEJCQkXFxcFBQUAAAAAAAABAQEEBAQAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEEBAQAAAAAAAAAAAAAAAABAQEDAwMCAgIAAAAAAAABAQEBAQECAgICAgIBAQEBAQEBAQEEBAQAAAAAAAABAQEAAAABAQEBAQEFBQUAAAABAQEBAQECAgIBAQFff7JHAAAAO3RSTlMA/vrqAubf7gj2lTkMBRDZfG8bnEfVicO78s21YR/JpeOOMygl0alqXC0iZlhPErCggplAdBetVYY/QnnxgZAAAANaSURBVEjHvVbXlpswEJWQJTCY3sGmGVxwb1vy/x8WgSmSs8nmISf3CaQ7mnY1AP4VJpO/pkq1s/bsNLW9tVNL3x68vcdkCjtMyclcTv5EV+yMEMghs5XfmpQyTsyyXifCyEeej+Xy6+P3rr4+AoqHgWk4ISK6S0RHW7vu+xdOZhd0Lnvblb47KNvaepQntwDlGV1mr3zNRuZQEss1+seFn5RAMtFVeznfxvvx7YCV4XlbBRYAe2xzPlRPZPjA9pnzFH1F396RpzKM+dSmabERMXCwTE83xTkY3RJRAXxELDboogL1SraDGM7wjdXA1X+piYnuGrCqtCc5obBhtpe6AXiotuCvH3vkdA7eYLYc6UYV/gAvsCEUEjM5PV0oIgxPSpdNTuje+cjzF3orRdRl6sHT3sfegm5cOuXJfBLzXlxe2+MkK8DR1N3dvIIdhAtbdCnu15OmP4VotLHLIiPScN2Ru5g7tDHN8TNj9QQZiJtWhdJxsf1Mx+WmeXmkPSWa8hfH3BnyKogIxuG46jVSjtW+dhyQHgVpblCdz8VhMZ0AKTiDJ3KOT35YmjR5+h53YgnMfLkzuHMGBtuHqF8NZozBRmD47oKT33QwYEK6MckJd/5+vT1LJ8YSk3TNDJjIAhxuiB7iH4IVzcqLtC5SMjrYvep1BSPzOIs8pnHgggI97EI9Ah5HP6Y+l1nTuAK9t2uf2JCsm3kNdBHK4AU79Amai1204mu3tcA/PhO0ipwUPN+q7CZROWmj/8BOew2dYf+RpCpnYGRFOxy8TozZZrIlOTM39ujADV09b68FUp5yX8FQjrlCzk4+m7ZHyiZovx8VDhXXdA9YKNhkplBmtA6GoNXmjs8Bh1wvh7F+rRrvdXVWx8HyS29rV+6Pc/C6CdzWt4y4aMM+AIc13ii3w/wux1n1aKu4YTt/EeAQYS+UqSiGrUpdq6nbh8rJURZgwinaEKDwBAxvYIOvL+NToxar4iENIxtBoQe8m0jWwAtmhgiRG8ims9QmoI5GvgAxNmZffBQPFcRx4GISvX3ELX9KQfmwOnz95a3zLDJuyruRJrRqgwH26t9/2K+EpLtiYTkppvzGRs+LP/4LLM2YYN2PTzr1IbqrXQm+g7pof07O8mV3W6jg/+Mnbu5D/CxcWV8AAAAASUVORK5CYII="
                  alt="Football Icon"
                  className={`${classes.footballIcon} 
                ${scoreUpdate}`}
                  height={20}
                  width={20}
                />
              )
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
  redCard: PropTypes.string,
  flashUpdate: PropTypes.bool.isRequired,
  position: PropTypes.string,
};

TeamName.defaultProps = {
  position: null,
  redCard: null,
};

export default memo(TeamName);
