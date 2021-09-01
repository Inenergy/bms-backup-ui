const client = require('./wsClient');

module.exports = function handleInput(name, value) {
  client.emit('serial command', [name, value])
}