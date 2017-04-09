const express = require('express');
const timeout = require('connect-timeout')
const DbmStepup = require('./src/dbm-stepup');
const dbmStepup = new DbmStepup();
const app = express();
const path = require('path');

app.use(timeout('20s'));
app.use(express.static(path.join(__dirname, '/dist')));

app.set('views', './src');
app.set('view engine', 'ejs');

app.get('/', dbmStepup.topPage);
app.get('/index.html', dbmStepup.topPage);
app.get('/level-:level.html', dbmStepup.levelFolder);
app.get('/deploy', dbmStepup.deploy);

app.listen(process.env.PORT || 3000);
