import React from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Typography } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import MatchItem from '../../matchItem';
import Loading from '../../loading';
import LeagueBanner from '../../leagueBanner';

function Live({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext, true);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <>
      <Typography variant="h5">In Play</Typography>
      <Divider />
      <List className="grid">
        {events.map((
          {
            leagueName,
            countryCode,
            liveMatches,
          },
        ) => (
          <>
            <LeagueBanner countryCode={countryCode} leagueName={leagueName} key={leagueName} />
            {liveMatches.map((event) => {
              const {
                home: {
                  name: homeName,
                  image_id: homeImageId,
                },
                away: {
                  name: awayName,
                  image_id: awayImageId,
                },
                scores: {
                  2: {
                    home: homeTeamScore = 'N/A',
                    away: awayTeamScore = 'N/A',
                  },
                },
                extra: {
                  home_pos: homePosition,
                  away_pos: awayPosition,
                } = {},
                timer: {
                  md,
                  ts,
                },
              } = event;

              let {
                timer: {
                  tm: time,
                },
              } = event;
              if (time > 45 && md === 0) {
                time = `45(+${time - 45})`;
              } else if (time === 45 && ts === 0 && md === 1) {
                time = 'HT';
              } else if (time > 90) {
                time = `90(+${time - 90})`;
              } else {
                time = `${time}`;
              }
              return (
                <MatchItem
                  showFavouriteIcon
                  homeImageId={homeImageId}
                  homeTeamName={homeName}
                  homeTeamScore={homeTeamScore}
                  homePosition={homePosition}
                  awayImageId={awayImageId}
                  awayTeamName={awayName}
                  awayTeamScore={awayTeamScore}
                  awayPosition={awayPosition}
                  kickOffTime={time}
                  flashUpdate
                  key={homeName}
                />
              );
            })}
          </>
        ))}
      </List>
    </>
  );
}

Live.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Live;
