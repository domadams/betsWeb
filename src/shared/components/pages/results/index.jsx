import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function matchResults({ fetchInitialData, staticContext }) {
  const [results, setResults] = useState(() => (__isBrowser__
    ? window.__INITIAL_DATA__
    : staticContext.data));

  const [loading, setLoading] = useState(
    !results,
  );

  const fetchNewResults = useRef(
    !results,
  );

  useEffect(() => {
    if (fetchNewResults.current === true) {
      setLoading(true);

      fetchInitialData()
        .then((data) => {
          setResults(data);
          setLoading(false);
        });
    } else {
      fetchNewResults.current = true;
    }
  }, [fetchNewResults]);

  if (loading === true) {
    return <i className="loading">Loading...️️</i>;
  }

  return (
    <>
      <ul className="grid">
        {results.results.map((
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

matchResults.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default matchResults;
