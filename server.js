const express = require('express');
const DbmStepup = require('./src/dbm-stepup');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '/dist')));

app.set('views', './src');
app.set('view engine', 'ejs');

const top_page = function(req, res, next) {
    res.render('index.ejs', {
        grade: {name: ''},
        grades: new DbmStepup().grades,
    });
};

app.get('/', top_page);
app.get('/index.html', top_page);
app.get('/level-:level.html', (req, res, next) => {
    let name = req.param('level');
    let grades = new DbmStepup().grades;
    let levels = name.split('-');
    let musics = [];
    for (var i in levels) {
        let m = JSON.parse(fs.readFileSync('./data/musics-level-' + levels[i] + '.json'));
        musics = musics.concat(m);
    }
    res.render('folder.ejs', {
        grade: {name: name, levels: levels},
        grades: grades,
        musics: musics,
    });
});

app.get('/deploy', (req, res, next) => require('child_process').exec('npm run fetch && npm run build && npm run deploy', (err, stdout, stderr) => res.send('ok') ));


app.listen(process.env.PORT || 3000);
