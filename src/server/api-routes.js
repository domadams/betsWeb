import axios from 'axios';
import express from 'express';
import moment from 'moment';
import apicache from 'apicache'

const router = express.Router();
const cache = apicache.middleware;

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

function callUpcomingEventsByCountry(countryCode) {
  return axios({
    method: 'get',
    url: 'https://api.b365api.com/v2/events/upcoming',
    params:
      {
        sport_id: 1,
        cc: countryCode,
        token: '',
      },
  });
}

router.get('/liveEvents', cache('60 seconds'), (req, res, next) => {
  callApi('https://api.b365api.com/v1/events/inplay', res, next);
});

router.get('/upcomingEvents', cache('60 seconds') ,(req, res, next) => {
  Promise.all([
    callUpcomingEventsByCountry('gb'),
    callUpcomingEventsByCountry('de'),
  ])
    .then((results) => {
      const mergedResults = [].concat.apply(...results.map((result) => result.data.results));
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

router.get('/eventResults', cache('60 seconds'), (req, res, next) => {
  callApi('https://api.b365api.com/v2/events/ended', res, next);
});

export default router;
