import request from 'request';

const router = require('express').Router();

router.get('/liveEvents', (req, res) => {
  const encodedURI = encodeURI('https://api.b365api.com/v1/events/inplay?sport_id=1&token=TOKEN');
  request(encodedURI).pipe(res);
});

router.get('/upcomingEvents', (req, res) => {
  const encodedURI = encodeURI('https://api.b365api.com/v2/events/upcoming?sport_id=1&skip_esports=yes&token=TOKEN');
  request(encodedURI).pipe(res);
});

router.get('/eventResults', (req, res) => {
  const encodedURI = encodeURI('https://api.b365api.com/v2/events/ended?sport_id=1&token=TOKEN');
  request(encodedURI).pipe(res);
});

export default router;
