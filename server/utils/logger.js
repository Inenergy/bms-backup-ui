const fs = require('fs');
const { getFormatedDate } = require('../../common/helpers');
const { SERIAL_DATA } = require('../../common/constants');

let log, logPath, logName;

const tableHeader =
  ['Time']
    .concat(
      SERIAL_DATA.map(
        (entry) => `${entry.label}${entry.units ? ', ' + entry.units : ''}`
      )
    )
    .join('\t') + '/r/n';

async function start() {
  const logDir = 'logs';
  try {
    await fs.promises.access(logDir);
  } catch {
    await fs.promises.mkdir(logDir);
  }
  logName = `${getFormatedDate('YYYY-MM-DD--HH-mm-ss')}.log`;
  logPath = `${logDir}/${logName}`;
  log = fs.createWriteStream(logPath);
  writeLogData(tableHeader);
  return logPath;
}

function writeRow(boosterState) {
  writeLogData(getLogRow(boosterState));
}

function getLogRow(serialData) {
  const row = [
    new Date().toLocaleTimeString('ru-RU'),
    ...Object.values(serialData),
  ];
  return row.join('\t') + '\r\n';
}

function writeLogData(row) {
  try {
    log.write(row, 'ascii');
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  start,
  writeRow,
};
