import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import LeagueBanner from '../../leagueBanner';

const Upcoming = ({ fetchInitialData, staticContext }) => {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
      <List className="grid">
        {events.map((
          {
            leagueName,
            countryCode,
            upcomingMatches,
          },
        ) => (
          <>
            <LeagueBanner countryCode={countryCode} leagueName={leagueName} />
            {upcomingMatches.map((
              {
                away: { name: awayName },
                home: { name: homeName },
              },
            ) => (
              <li key={homeName}>
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
          </>
        ))}
      </List>
    </>
  );
};

Upcoming.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Upcoming;
