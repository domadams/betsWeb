import React from 'react';
import PropTypes from 'prop-types';
import loadEvents from '../../helpers/loadEvents';
import MatchItem from "../../matchItem";

function matchResults({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
      <ul className="grid">
        {events.results.map(event => {
          if(event.ss) {
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
                }
              },
              time,
            } = event;
            return (
              <MatchItem
                showFavouriteIcon={false}
                homeImageId={homeImageId}
                homeTeamName={homeName}
                homeTeamScore={homeTeamScore}
                awayImageId={awayImageId}
                awayTeamName={awayName}
                awayTeamScore={awayTeamScore}
                kickOffTime={time}
                key={homeName}
              />
            )
          }
          return null
        })}
      </ul>
    </>
  );
}

matchResults.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default matchResults;
