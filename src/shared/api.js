import fetch from 'isomorphic-fetch';

export function fetchLiveMatches() {
  const encodedURI = encodeURI('http://localhost:1919/api/liveEvents');

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}

export function fetchUpcomingMatches() {
  const encodedURI = encodeURI('http://localhost:1919/api/upcomingEvents');

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}

export function fetchMatchResults() {
  const encodedURI = encodeURI('http://localhost:1919/api/eventResults');

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data)
    .catch(() => null);
}
