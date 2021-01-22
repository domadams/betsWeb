import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import LeagueBanner from '../../leagueBanner';

function Live({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
      <List>
        <LeagueBanner countryCode="es" leagueName="A League" />
      </List>
      <ul className="grid">
        {events.results.map((
          {
            away: { name: awayName },
            home: { name: homeName },

          }, i,
        ) => (
          <li key={homeName}>
            <h2>
              #
              {i + 1}
            </h2>
            <h3>
              Home:
              {homeName}
            </h3>
            <h3>
              Away:
              {awayName}
            </h3>
          </li>
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
