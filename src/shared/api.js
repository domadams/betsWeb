import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

let basePath = 'http://0.0.0.0:8080';

if (__isBrowser__) {
  const {
    protocol,
    hostname,
    port,
  } = window.location;
  basePath = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

export function fetchLiveMatches() {
  const encodedURI = encodeURI(`${basePath}/api/liveEvents`);

  return fetch(encodedURI, {
    headers: {
      'akamai-x-serial-no': '8739201',
    },
  })
    .then((data) => data.json())
    .catch(() => null);
}

export function fetchUpcomingMatches() {
  const encodedURI = encodeURI(`${basePath}/api/upcomingEvents`);

  return fetch(encodedURI, {
    headers: {
      'akamai-x-serial-no': '8739202',
    },
  })
    .then((data) => data.json())
    .catch(() => null);
}

export function fetchMatchResults() {
  const encodedURI = encodeURI(`${basePath}/api/eventResults`);

  return fetch(encodedURI, {
    headers: {
      'akamai-x-serial-no': '8739203',
    },
  })
    .then((data) => data.json())
    .catch(() => null);
}

export function fetchFavourites(favourites) {
  const encodedURI = encodeURI(`${basePath}/api/favourites?${querystring.stringify({ favourites: JSON.stringify(favourites) })}`);
  return fetch(encodedURI, {
    headers: {
      'akamai-x-serial-no': '8739204',
    },
  })
    .then((data) => data.json())
    .catch(() => null);
}
