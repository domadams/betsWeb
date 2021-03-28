import axios from 'axios';
import express from 'express';
import apicache from 'apicache';
import getDate from './utils/getDate';
import { freeLeagues } from '../shared/leagues';
import countries from '../shared/countries';
import favouritesOrder from '../shared/favouritesOrder';
import teamData from '../shared/teamData/teamData';

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
        token: '',
      },
  });
}

function callApiByDateAndCountry(url, date, countryCode, page) {
  return axios({
    method: 'get',
    url,
    params:
      {
        sport_id: 1,
        skip_esports: true,
        token: '',
        day: date,
        cc: countryCode,
        page,
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
        token: '',
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
  const promises = [];

  countries.forEach((country) => {
    if (country.component && !country.exclude) {
      promises.push(callApiByDateAndCountry(upcomingURL, getDate(), country.cc, 1));
      promises.push(callApiByDateAndCountry(upcomingURL, getDate(), country.cc, 2));
      promises.push(callApiByDateAndCountry(upcomingURL, getDate(1), country.cc, 1));
      promises.push(callApiByDateAndCountry(upcomingURL, getDate(1), country.cc, 2));
    }
  });

  Promise.all(promises)
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
        if (freeLeagues.includes(result.league.name)) {
          const resultDate = new Date(parseInt(result.time * 1000, 10)).toLocaleDateString('en-GB', options);
          const comingDate = upcomingEvents.find((event) => event.date === resultDate);
          if (comingDate) {
            const league = comingDate.matches.find((evt) => evt.leagueName === result.league.name);
            if (league) {
              league.upcomingMatches.push(result);
            } else {
              comingDate.matches.push({
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
        }
      });

      upcomingEvents.forEach((event) => {
        const sortedResult = [];
        freeLeagues.forEach((key) => {
          let found = false;
          event.matches = event.matches.filter((item) => {
            if (!found && item.leagueName === key) {
              sortedResult.push(item);
              found = true;
              return false;
            }
            return true;
          });
        });
        event.matches = sortedResult;
      });

      res.json(upcomingEvents);
    }, (error) => next(error));
});

router.get('/eventResults', cache('15 minutes'), (req, res, next) => {
  const promises = [];

  countries.forEach((country) => {
    if (country.component && !country.exclude) {
      promises.push(callApiByDateAndCountry(resultsURL, getDate(), country.cc, 1));
      promises.push(callApiByDateAndCountry(resultsURL, getDate(), country.cc, 2));
      promises.push(callApiByDateAndCountry(resultsURL, getDate(-1), country.cc, 1));
      promises.push(callApiByDateAndCountry(resultsURL, getDate(-1), country.cc, 2));
    }
  });

  Promise.all(promises)
    .then((results) => [].concat(...results.map((result) => result.data.results)))
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
        if (freeLeagues.includes(result.league.name)) {
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
        }
      });

      matchResults.forEach((event) => {
        const sortedResult = [];
        freeLeagues.forEach((key) => {
          let found = false;
          event.matches = event.matches.filter((item) => {
            if (!found && item.leagueName === key) {
              sortedResult.push(item);
              found = true;
              return false;
            }
            return true;
          });
        });
        event.matches = sortedResult;
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
        let mergedResults = [].concat(...results.map((result) => result.data.results));
        const sortedResults = [];

        favouritesOrder.forEach((key) => {
          const events = [];
          mergedResults = mergedResults.filter((item) => {
            if (item.time_status === key.time_status) {
              const homeTeam = teamData.find((team) => team.teamId === item.home.id);
              const awayTeam = teamData.find((team) => team.teamId === item.away.id);
              if (homeTeam && homeTeam.stats) {
                item.home.stats = homeTeam.stats;
              }
              if (awayTeam && awayTeam.stats) {
                item.away.stats = awayTeam.stats;
              }
              events.push(item);
              return false;
            }
            return true;
          });
          events.sort((a, b) => {
            a.time.localeCompare(b.time);
          });
          sortedResults.push({
            label: key.label,
            matches: events,
          });
        });

        res.json(sortedResults);
      });
  } else {
    res.json([]);
  }
});

export default router;
