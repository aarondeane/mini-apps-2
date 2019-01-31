const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.put('/events', (req, res, next) => {
  console.log(req.body);
  res.status(200).send();
})

server.use(router);
server.listen(3000, () => { console.log('JSON Server is running') } );
