import fetch from 'isomorphic-fetch';

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

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}

export function fetchUpcomingMatches() {
  const encodedURI = encodeURI(`${basePath}/api/upcomingEvents`);

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}

export function fetchMatchResults() {
  const encodedURI = encodeURI(`${basePath}/api/eventResults`);

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}
