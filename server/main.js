const fs = require('fs');
const path = require('path');
const polka = require('polka');
const { INPUTS } = require('../common/constants');
const { isPi } = require('./globals');
const http = require('http');
const WebSocketServer = require('socket.io').Server;
const sirv = require('sirv');
const { json } = require('body-parser');
const updater = require('./utils/updater');

const PORT = process.env.PORT || 6010;

const server = http.createServer();
const app = polka({ server }).listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Running on localhost:${PORT}`);
});

const wsServer = new WebSocketServer(server);
let wsSockets = [];

// serial initialization

const serial = require(`./utils/serial${isPi ? '' : '.mock'}`);
serial
  .on('data', (data) =>
    wsSockets.forEach((sock) => sock.emit('serial data', data))
  )
  .on('command sent', () =>
    wsSockets.forEach((sock) => sock.emit('command sent'))
  );

// socket connection handling

wsServer.on('connection', (socket) => {
  wsSockets.push(socket);
  socket.on(
    'disconnect',
    () => (wsSockets = wsSockets.filter((sock) => sock.id !== socket.id))
  );
  socket.on('check update', () => {
    updater
      .checkUpdate()
      .then((f) => {
        if (f) socket.emit('update available');
      })
      .catch(console.error);
  });
  socket.on('serial command', serial.sendCommand);
  socket.on('update programm', () =>
    updater
      .update()
      .then(() => socket.emit('update done'))
      .catch((err) => socket.emit('update failed', err))
  );
});

// routes

app.get('/locale/:file', (req, res) => {
  const filename = req.params.file;
  const filePath = path.join(__dirname, '..', 'locale', filename + '.json');
  if (fs.existsSync(filePath)) {
    res.end(JSON.stringify(require(filePath)));
  } else {
    res.statusCode = 404;
    res.end();
  }
});
app.use(
  sirv(path.join(__dirname, '..', 'public'), {
    dev: process.platform === 'win32',
    setHeaders: disableCache,
  }),
  json()
);

function disableCache(res, path) {
  if (/.*(.html|.js|.css)/.test(path)) {
    res.setHeader('Cache-Control', 'no-cache');
  }
}
