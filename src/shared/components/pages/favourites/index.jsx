import React, { memo } from 'react';
import {
  Divider,
  List, makeStyles, Paper,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import createPersistedState from 'use-persisted-state';
import MatchItem from '../../matchItem';
import loadEvents from '../../helpers/loadEvents';
import Loading from '../../loading';
import { kickOffTime, minuteTime } from '../../helpers/matchTime';

const useFavouriteState = createPersistedState('favouritesState');

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 'auto',
  },
  paper: {
    padding: 8,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    width: '96%',
    backgroundColor: '#eee',
  },
});

function FavouritesPage({ fetchInitialData, staticContext }) {
  if (__isBrowser__) {
    const classes = useStyles();
    const [favourites] = useFavouriteState([]);
    const { loading, events } = loadEvents(fetchInitialData, staticContext, true, favourites);

    if (loading === true) {
      return <Loading />;
    }

    if (!events && favourites) {
      loadEvents(fetchInitialData, staticContext, true, favourites);
    }

    return (
      <>
        <Typography variant="h5">Favourites</Typography>
        <Divider />
        {(events && events.length > 0)
          ? (
            <List className="grid">
              {events.map((event) => {
                const hasFavourite = favourites
                  ? favourites.find((match) => match === event.id)
                  : null;
                if (hasFavourite) {
                  const {
                    id,
                    home: {
                      name: homeName,
                      image_id: homeImageId,
                    },
                    away: {
                      name: awayName,
                      image_id: awayImageId,
                    },
                    time,
                    time_status: timeStatus,
                    ss,
                    scores: {
                      2: {
                        home: homeTeamScore = '',
                        away: awayTeamScore = '',
                      } = {},
                    } = {},
                    extra: {
                      home_pos: homePosition,
                      away_pos: awayPosition,
                    } = {},
                    timer: {
                      md = 1,
                      ts = 0,
                    } = {},
                  } = event;

                  let {
                    timer: {
                      tm = 'FT',
                    } = {},
                  } = event;
                  let flashUpdate = true;

                  if (timeStatus === '0' || !ss) {
                    flashUpdate = false;
                    tm = kickOffTime(time);
                  } else if (timeStatus === '1') {
                    tm = minuteTime(tm, ts, md);
                  }

                  return (
                    <MatchItem
                      eventId={id}
                      showFavouriteIcon
                      homeImageId={homeImageId}
                      homeTeamName={homeName}
                      homeTeamScore={homeTeamScore}
                      homePosition={homePosition}
                      awayImageId={awayImageId}
                      awayTeamName={awayName}
                      awayTeamScore={awayTeamScore}
                      awayPosition={awayPosition}
                      kickOffTime={tm}
                      flashUpdate={flashUpdate}
                      key={homeName}
                    />
                  );
                }
                return null;
              })}
            </List>
          )
          : (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Typography>No favourites selected</Typography>
              </Paper>
            </div>
          )}
      </>
    );
  }
  return null;
}

FavouritesPage.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default memo(FavouritesPage);
