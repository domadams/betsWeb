import axios from 'axios';

const router = require('express').Router();

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

function callUpcomingEvents(countryCode) {
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

router.get('/liveEvents', (req, res, next) => {
  callApi('https://api.b365api.com/v1/events/inplay', res, next);
});

router.get('/upcomingEvents', (req, res, next) => {
  Promise.all([callUpcomingEvents('gb'), callUpcomingEvents('de')])
    .then((results) => {
      const mergedResults = [].concat.apply(...results.map((result) => result.data.results));

      return mergedResults.sort((a, b) => a.league.name.localeCompare(b.league.name));
    })
    .then((results) => {
      const upcomingEvents = [];
      results.forEach((result) => {
        const league = upcomingEvents.find((event) => event.leagueName === result.league.name);
        if (league) {
          league.upcomingMatches.push(result);
        } else {
          upcomingEvents.push({
            leagueName: result.league.name,
            countryCode: result.league.cc,
            upcomingMatches: [
              result,
            ],
          });
        }
      });
      res.json(upcomingEvents);
    }, (error) => next(error));
});

router.get('/eventResults', (req, res, next) => {
  callApi('https://api.b365api.com/v2/events/ended', res, next);
});

export default router;
