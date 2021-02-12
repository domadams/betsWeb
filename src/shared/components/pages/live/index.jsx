import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import MatchItem from '../../matchItem';

function Live({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
      <Typography variant="h5">In Play</Typography>
      <Divider />
      <ul className="grid">
        {events.results.map((
          {
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
                home: homeTeamScore,
                away: awayTeamScore,
              },
            },
            time,
          },
        ) => (
          <MatchItem
            showFavouriteIcon
            homeImageId={homeImageId}
            homeTeamName={homeName}
            homeTeamScore={homeTeamScore}
            awayImageId={awayImageId}
            awayTeamName={awayName}
            awayTeamScore={awayTeamScore}
            kickOffTime={time}
            key={homeName}
          />
        ))}
      </ul>
    </>
  );
}

Live.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Live;
