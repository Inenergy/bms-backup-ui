const fs = require('fs');
const { getFormatedDate } = require('../../common/helpers');
const { SERIAL_DATA } = require('../../common/constants');

let log, logPath, logName;

const tableHeader =
  ['Time']
    .concat(
      SERIAL_DATA.map(
        (entry) => `${entry.name}${entry.units ? ', ' + entry.units : ''}`
      )
    )
    .join('\t') + '\r\n';

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
    new Date().toTimeString().slice(0, 8),
    ...SERIAL_DATA.map((entry) => serialData[entry.name]??'').flatMap((v) =>
      typeof v == 'object' ? Object.values(v) : v
    ),
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
