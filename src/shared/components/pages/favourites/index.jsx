import React, { memo } from 'react';
import {
  Divider,
  List,
  makeStyles,
  Paper,
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
  pageHeader: {
    paddingLeft: 10,
    margin: '5px 0',
  },
  paper: {
    padding: 8,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    width: '96%',
    backgroundColor: '#eee',
  },
  favouriteHeader: {
    background: 'gainsboro',
    border: '1px solid #999',
    marginBottom: 2,
    paddingLeft: 20,
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
        <Typography variant="h5" className={classes.pageHeader}>Favourites</Typography>
        <Divider />
        {(events && events.length > 0)
          ? (
            <List className="grid">
              {events.map((
                {
                  label,
                  matches,
                },
              ) => (
                <>
                  {(matches && matches.length > 0)
                    ? (
                      <>
                        <div className={classes.favouriteHeader}>
                          <Typography variant="h6">{label}</Typography>
                        </div>
                        {matches.map((event) => {
                          const hasFavourite = favourites
                            ? favourites.find((match) => match === event.id)
                            : null;
                          if (hasFavourite) {
                            const {
                              id,
                              home: {
                                name: homeName,
                                image_id: homeImageId,
                                stats: homeStats = {},
                              },
                              away: {
                                name: awayName,
                                image_id: awayImageId,
                                stats: awayStats = {},
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
                              stats = null,
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
                                stats={stats}
                                homeStats={homeStats}
                                awayStats={awayStats}
                              />
                            );
                          }
                          return null;
                        })}
                      </>
                    )
                    : null}
                </>
              ))}
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
