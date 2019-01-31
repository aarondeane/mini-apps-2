const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/bitcoin', (req, res) => {
  console.log('Heard you!')
  request.get('https://api.coindesk.com/v1/bpi/historical/close.json', (err, response, body) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(body);
    }
  });
});

const PORT = 6001;
app.listen(PORT, () => console.log(`Express listening on port ${PORT}!`));
