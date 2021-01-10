import React from 'react';
import PropTypes from 'prop-types';
import loadEvents from '../../helpers/loadEvents';

function Upcoming({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
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

Upcoming.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Upcoming;
