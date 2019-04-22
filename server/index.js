
const express = require('express');

const next = require('next');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());

    server.use('/static', express.static(path.join(__dirname, 'static')));

    server.get('/canvas/:id', (req, res) => {
      const actualPage = '/canvas';
      const queryParams = { canvasId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/player/:id', (req, res) => {
      const actualPage = '/player';
      const queryParams = { canvasId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/*', (req, res) => handle(req, res));

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
