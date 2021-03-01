import axios from 'axios';
import express from 'express';
import apicache from 'apicache';
import { freeLeagues } from '../shared/leagues';

const router = express.Router();
const cache = apicache.middleware;

const liveEvents = 'https://api.b365api.com/v1/events/inplay';
const upcomingURL = 'https://api.b365api.com/v2/events/upcoming';
const resultsURL = 'https://api.b365api.com/v2/events/ended';
const eventView = 'https://api.b365api.com/v1/event/view';

function callApi(url) {
  return axios({
    method: 'get',
    url,
    params:
      {
        sport_id: 1,
        skip_esports: true,
        token: '71705-bVomi4R8vMvyBY',
      },
  });
}

function callEventApi(url, eventId) {
  return axios({
    method: 'get',
    url,
    params:
      {
        event_id: eventId,
        token: '71705-bVomi4R8vMvyBY',
      },
  });
}

function callApiByCountry(url, countryCode) {
  return axios({
    method: 'get',
    url,
    params:
      {
        sport_id: 1,
        cc: countryCode,
        token: '71705-bVomi4R8vMvyBY',
        skip_esports: true,
      },
  });
}

router.get('/liveEvents', cache('20 seconds'), (req, res, next) => {
  Promise.all([
    callApi(liveEvents),
  ])
    .then((results) => {
      const mergedResults = [].concat(...results.map((result) => result.data.results));
      return mergedResults.sort((a, b) => b.time.localeCompare(a.time));
    })
    .then((results) => {
      let currentEvents = [];
      results.forEach((result) => {
        if (result.scores) {
          const league = currentEvents.find((e) => e.leagueName === result.league.name);
          if (league) {
            league.liveMatches.push(result);
          } else {
            currentEvents.push({
              leagueName: result.league.name,
              countryCode: result.league.cc,
              liveMatches: [
                result,
              ],
            });
          }
        }
      });
      const sortedResult = [];
      freeLeagues.forEach((key) => {
        let found = false;
        currentEvents = currentEvents.filter((item) => {
          if (!found && item.leagueName === key) {
            sortedResult.push(item);
            found = true;
            return false;
          }
          return true;
        });
      });
      res.json(sortedResult);
    }, (error) => next(error));
});

router.get('/upcomingEvents', cache('30 minutes'), (req, res, next) => {
  Promise.all([
    callApiByCountry(upcomingURL, 'gb'),
    callApiByCountry(upcomingURL, 'it'),
    callApiByCountry(upcomingURL, 'de'),
    callApiByCountry(upcomingURL, 'es'),
    callApiByCountry(upcomingURL, 'fr'),
  ])
    .then((results) => {
      const mergedResults = [].concat(...results.map((result) => result.data.results));
      return mergedResults.sort((a, b) => a.time.localeCompare(b.time));
    })
    .then((results) => {
      const upcomingEvents = [];
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      results.forEach((result) => {
        const resultDate = new Date(parseInt(result.time * 1000, 10)).toLocaleDateString('en-GB', options);
        const upcomingDate = upcomingEvents.find((event) => event.date === resultDate);
        if (upcomingDate) {
          const league = upcomingDate.matches.find((evt) => evt.leagueName === result.league.name);
          if (league) {
            league.upcomingMatches.push(result);
          } else {
            upcomingDate.matches.push({
              leagueName: result.league.name,
              countryCode: result.league.cc,
              upcomingMatches: [
                result,
              ],
            });
          }
        } else {
          upcomingEvents.push({
            date: resultDate,
            matches: [
              {
                leagueName: result.league.name,
                countryCode: result.league.cc,
                upcomingMatches: [
                  result,
                ],
              },
            ],
          });
        }
      });
      res.json(upcomingEvents);
    }, (error) => next(error));
});

router.get('/eventResults', cache('15 minutes'), (req, res, next) => {
  Promise.all([
    callApiByCountry(resultsURL, 'gb'),
    callApiByCountry(resultsURL, 'it'),
    callApiByCountry(resultsURL, 'de'),
    callApiByCountry(resultsURL, 'es'),
    callApiByCountry(resultsURL, 'fr'),
  ])
    .then((results) => {
      const mergedResults = [].concat(...results.map((result) => result.data.results));
      return mergedResults.sort((a, b) => b.time.localeCompare(a.time));
    })
    .then((results) => {
      const matchResults = [];
      const now = Date.now();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      results.forEach((result) => {
        const resultDate = new Date(parseInt(result.time * 1000, 10)).toLocaleDateString('en-GB', options);
        if (new Date(parseInt(result.time * 1000, 10)).valueOf() < now.valueOf()) {
          const upcomingDate = matchResults.find((event) => event.date === resultDate);
          if (upcomingDate && result.scores) {
            const league = upcomingDate.matches.find((e) => e.leagueName === result.league.name);
            if (league) {
              league.endedMatches.push(result);
            } else {
              upcomingDate.matches.push({
                leagueName: result.league.name,
                countryCode: result.league.cc,
                endedMatches: [
                  result,
                ],
              });
            }
          } else if (result.scores) {
            matchResults.push({
              date: resultDate,
              matches: [
                {
                  leagueName: result.league.name,
                  countryCode: result.league.cc,
                  endedMatches: [
                    result,
                  ],
                },
              ],
            });
          }
        }
      });
      res.json(matchResults);
    }, (error) => next(error));
});

router.get('/favourites', (req, res, next) => {
  const favourites = JSON.parse(decodeURIComponent(req.query.favourites) || []);
  const promises = [];

  favourites.forEach((favourite) => {
    promises.push(callEventApi(eventView, favourite));
  });

  if (favourites && favourites.length > 0) {
    Promise.all(promises)
      .then((results) => {
        const mergedResults = [].concat(...results.map((result) => result.data.results));
        res.json(mergedResults);
      });
  } else {
    res.json([]);
  }
});

export default router;
