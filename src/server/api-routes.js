import axios from 'axios';
import express from 'express';
import moment from 'moment';
import apicache from 'apicache';

const router = express.Router();
const cache = apicache.middleware;

const upcomingURL = 'https://api.b365api.com/v2/events/upcoming';
const resultsURL = 'https://api.b365api.com/v2/events/ended';

function callApi(url, response, next) {
  axios({
    method: 'get',
    url,
    responseType: 'stream',
    params:
      {
        sport_id: 1,
        league_id: 94,
        token: '',
      },
  }).then((res) => {
    res.data.pipe(response);
  }, (error) => next(error));
}

function callApiByCountry(url, countryCode) {
  return axios({
    method: 'get',
    url,
    params:
      {
        sport_id: 1,
        cc: countryCode,
        token: '',
        skip_esports: true,
      },
  });
}

router.get('/liveEvents', cache('60 seconds'), (req, res, next) => {
  callApi('https://api.b365api.com/v1/events/inplay', res, next);
});

router.get('/upcomingEvents', cache('15 minutes'), (req, res, next) => {
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
      results.forEach((result) => {
        const resultDate = moment.unix(parseInt(result.time, 10)).format('dddd, MMMM Do, YYYY');
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
      results.forEach((result) => {
        const resultDate = moment.unix(parseInt(result.time, 10)).format('dddd, MMMM Do, YYYY');
        if (moment.unix(parseInt(result.time, 10)).isBefore(now)) {
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

export default router;
