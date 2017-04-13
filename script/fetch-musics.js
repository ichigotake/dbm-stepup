const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename) + '/../';
require('dotenv').config();

var doc = new GoogleSpreadsheet('1HOzyn1HyljTTNfuGaxqdX4bv-uoCewFc8B0IdbwGAFo');
var sheets = [];

async.series([
  function setAuth(step) {
    'use strict';
    doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_CLIENT_SECRET), step);
  },
  function getInfoAndWorksheets(step) {
    'use strict';
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      for (var i in info.worksheets) {
          var level = parseInt(info.worksheets[i].title);
          sheets[level-1] = info.worksheets[i];
      }
      step();
    });
  },
  function workingWithRows(step) {
    'use strict';
    for (var i in sheets) {
        let sheet = sheets[i];
        let level = parseInt(i)+1;
        sheet.getCells({
            "min-row": 2,
            "min-col": 1,
            "max-col": 2,
            "offset": 2,
            "return-empty": true,
        }, function( err, rows ){
            var musics = [];
            for (var j in rows) {
                let row = rows[j];
                let index = parseInt(row.row)-2;
                if (!musics[index]) {
                    musics[index] = {};
                }
                if (row.col === 1) {
                    musics[index]["title"] = encodeURIComponent(row.value);
                } else {
                    musics[index]["folder"] = row.value;
                }
                musics[index].level = level;
            }
            let json = JSON.stringify(musics);
            fs.writeFileSync("data/musics-level-"+level+".json", json);
        });
      }
  }
]);
