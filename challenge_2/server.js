const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const mcache = require('memory-cache');
const cryptoKey = require('./API Keys/config');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const cache = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      console.log('Cached response');
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.get('/api/:id', cache(3600), (req, res) => { // Middleware is caching for 3 hrs
  const cryptoSymbol = req.params.id;
  console.log('Crypto to be queried: ', cryptoSymbol);
  request.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${cryptoSymbol}&tsym=USD&limit=30&key=${cryptoKey}`, (err, response, body) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(body);
    }
  });
});

const PORT = 6001;
app.listen(PORT, () => console.log(`Express listening on port ${PORT}!`));
