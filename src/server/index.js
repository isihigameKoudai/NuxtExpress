const { Nuxt, Builder } = require('nuxt');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();
const api = require('./api/');

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api',api);

let config = require('../../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

async function startServer() {

  const nuxt = new Nuxt(config);
  app.use(nuxt.render);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.listen(port, host, () => {
    console.log(`Express server open: http://${host}:${port}/`);
  });
}

startServer();
