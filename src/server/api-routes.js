import axios from 'axios';
const router = require('express').Router();

function callApi(url, response){
  axios({
    method: 'get',
    url: url,
    responseType: 'stream',
    params:
      {
        sport_id: 1,
        league_id: 94,
        token: '',
      }
  }).then(function (res) {
    res.data.pipe(response);
  });
}

router.get('/liveEvents',(req, res) => {
  callApi('https://api.b365api.com/v1/events/inplay', res);
});

router.get('/upcomingEvents', (req, res) => {
  callApi('https://api.b365api.com/v2/events/upcoming', res);
});

router.get('/eventResults', (req, res) => {
  callApi('https://api.b365api.com/v2/events/ended', res);
});

export default router;
