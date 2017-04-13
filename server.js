const express = require('express');
const timeout = require('connect-timeout')
const DbmStepup = require('./src/dbm-stepup');
const dbmStepup = new DbmStepup();
const app = express();
const path = require('path');
const minifyHTML = require('express-minify-html');
const compression = require('compression');

let port = process.env.PORT || 3000;

app.use(timeout('20s'));
app.use(compression());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  false
    }
}));

app.set('views', './src');
app.set('view engine', 'ejs');

app.get('/', dbmStepup.topPage);
app.get('/index.html', dbmStepup.topPage);
app.get('/level-:level.html', dbmStepup.levelFolder);
app.get('/deploy', dbmStepup.deploy);

app.listen(port);

console.log('App server listen port: ' + port);
