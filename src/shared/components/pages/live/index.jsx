import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Live({ fetchInitialData, staticContext }) {
  const [events, setEvents] = useState(() => (__isBrowser__
    ? window.__INITIAL_DATA__
    : staticContext.data));

  const [loading, setLoading] = useState(
    !events,
  );

  const fetchNewEvents = useRef(
    !events,
  );

  useEffect(() => {
    if (fetchNewEvents.current === true) {
      setLoading(true);

      fetchInitialData()
        .then((data) => {
          setEvents(data);
          setLoading(false);
        });
    } else {
      fetchNewEvents.current = true;
    }
  }, [fetchNewEvents]);

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

Live.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Live;
