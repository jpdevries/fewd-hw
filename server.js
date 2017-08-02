const express = require('express'),
app = express(),
compression = require('compression'),
minifyHTML = require('express-minify-html'),
isProd = (process.env.NODE_ENV == 'production') ? true : false;

import { randomRange, reduceArrayFrequency } from './client/src/utility/utility';

app.set('port', (process.env.PORT || 3001));

if(isProd) {
  app.use(minifyHTML({
    override: true,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));

  app.use(compression({ level: 9, threshold: 0 }));
}

app.use('/',express.static('client/build')); // serve the create react app

const selectionsLast30 = [],
selectionsToday = [];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

//for(let i = 30; i >= 0; i--) {
const now = new Date();
const startTime = now.getTime() - (30*86400000),
endTime = new Date().getTime();
for(let i = startTime; i < endTime; i += 3600000) {
  const date = new Date(i),
  name = `${date.toLocaleDateString()}`,
  //index = `${date.getDate()}. ${months[date.getMonth()]}`,
  index = `${date.getMonth() + 1}/${date.getDate()}`,
  random = randomRange(0, 42),
  uv = random,
  ss = randomRange(0, 20),
  pv = -random;

  selectionsLast30.push(Object.assign({}, makeDTO(i), {
    name,
    index: name
  }));
}

const startToday = new Date(now.getTime());
startToday.setHours(0,0,0,0);
for(let i = startToday.getTime(); i < now.getTime(); i += 60000) {
  selectionsToday.push(makeDTO(i));
}


function makeDTO(i) {
  const date = new Date(i),
  name = `${date.toLocaleTimeString('en-US', { hour12: false })}`,
  index = `${date.toLocaleTimeString('en-US', { hour12: false })}`,
  random = randomRange(0, 42),
  uv = random,
  ss = randomRange(0, 14),
  pv = -random;

  return {
    key: {
      segmentNumber: i,
      dayTimestamp: i,
      timestamp: i
    },
    date,
    name,
    index,
    totalCallsAdded: uv,
    totalCallsRemoved: pv,
    segmentSize: ss
  }

  /*return {
    date,
    name,
    'Removed': pv,
    'Selection size': ss,
    'Added': uv,
    index
  };*/
}


function updateTodayData(date = new Date()) {
  const last = selectionsToday[selectionsToday.length - 1];
  const now = date.getTime();
  for(let i = last.date.getTime(); i < now; i += 1000) {
    selectionsToday.push(makeDTO(i));
  }
  return selectionsToday;
}

function getRealTimeStartPoint() {
  const minutesAgo = new Date().getTime() - (1000 * 60 * 5);
  for(let i = 0; i < selectionsToday.length; i++) {
    const selection = selectionsToday[i];
    if(selection.date.getTime() >= minutesAgo) {
      return selection;
    }
  }
  return makeDTO(minutesAgo);
}

function getRealTimeData() {
  const startPoint = getRealTimeStartPoint();
  const now = new Date().getTime();
  const realTimeData = [];
  for(let i = startPoint.date.getTime(); i < now; i += 10000) {
    realTimeData.push(makeDTO(i));
  }
  return realTimeData;
}


app.get('/selections/', (req, res) => {
  if(req.query.mode == 'real-time') {
    const realTimeData = getRealTimeData();
    res.json(realTimeData);
  } else if(req.query.mode == 'today') {
    const selectionsToday = updateTodayData();
    res.json(reduceArrayFrequency(selectionsToday, 30));
  } else {
    res.json(reduceArrayFrequency(selectionsLast30, 30));
  }

});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
