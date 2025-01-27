
const express = require('express');

const next = require('next');
// const cookieParser = require('cookie-parser');
const path = require('path');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // server.use(cookieParser());

    server.use('/static', express.static(path.join(__dirname, 'static')));

    server.get('/client/edit/:id', (req, res) => {
      const actualPage = '/client/edit';
      const queryParams = { clientId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/branch/edit/:id', (req, res) => {
      const actualPage = '/branch/edit';
      const queryParams = { branchId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/expense/edit/:id', (req, res) => {
      const actualPage = '/expense/edit';
      const queryParams = { expenseId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/invoice/edit/:id', (req, res) => {
      const actualPage = '/invoice/edit';
      const queryParams = { invoiceId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/organization/edit/:id', (req, res) => {
      const actualPage = '/organization/edit';
      const queryParams = { organizationId: req.params.id };
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
