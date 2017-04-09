const fs = require('fs');

class DbmStepup {
    static grades() {
        return [
                {
                    name: '4',
                    levels: [4],
                },
                {
                    name: '5-6',
                    levels: [5,6],
                },
                {
                    name: '7',
                    levels: [7],
                },
                {
                    name: '8',
                    levels: [8],
                },
                {
                    name: '9',
                    levels: [9],
                },
            ];
    }

    topPage(req, res, next) {
        return res.render('index.ejs', {
            grade: {name: ''},
            grades: DbmStepup.grades(),
        });
    }

    levelFolder(req, res, next) {
        let name = req.params['level'];
        let grades = DbmStepup.grades();
        let levels = name.split('-');
        let musics = [];
        for (var i in levels) {
            let m = JSON.parse(fs.readFileSync('./data/musics-level-' + levels[i] + '.json'));
            musics = musics.concat(m);
        }
        return res.render('folder.ejs', {
            grade: {name: name, levels: levels},
            grades: grades,
            musics: musics,
        });
    }

    deploy(req, res, next) {
        return require('child_process')
            .exec('npm run deploy', (err, stdout, stderr) => res.send('ok') );
    }

}

module.exports = DbmStepup;
