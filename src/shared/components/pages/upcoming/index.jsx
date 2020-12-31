import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Upcoming({ fetchInitialData, staticContext }) {
  const [upcoming, setUpcoming] = useState(() => (__isBrowser__
    ? window.__INITIAL_DATA__
    : staticContext.data));

  const [loading, setLoading] = useState(
    !upcoming,
  );

  const fetchNewUpcomingEvents = useRef(
    !upcoming,
  );

  useEffect(() => {
    if (fetchNewUpcomingEvents.current === true) {
      setLoading(true);

      fetchInitialData()
        .then((events) => {
          setUpcoming(events);
          setLoading(false);
        });
    } else {
      fetchNewUpcomingEvents.current = true;
    }
  }, [fetchNewUpcomingEvents]);

  if (loading === true) {
    return <i className="loading">Loading...️️</i>;
  }

  return (
    <>
      <ul className="grid">
        {upcoming.results.map((
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
