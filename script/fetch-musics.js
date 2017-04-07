"use strict";

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var fs = require('fs');
require('dotenv').config();

var doc = new GoogleSpreadsheet('1HOzyn1HyljTTNfuGaxqdX4bv-uoCewFc8B0IdbwGAFo');
var sheets = [];

async.series([
  function setAuth(step) {
    var creds = JSON.parse(process.env.GOOGLE_CLIENT_SECRET);
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
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
    for (var i in sheets) {
        var sheet = sheets[i];
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
                var row = rows[j];
                var index = parseInt(row.row)-2;
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
            let code = `
import { Music } from '../music';

export class Level${level} \{
        musics: Music[] = [];
        constructor() {
            var master = ${json};
            for (let i in master) {
                let row = master[i];
                this.musics.push(new Music(
                    row.level,
                    row.folder.substring(0, 1),
                    decodeURIComponent(row.title),
                ));
            }
        }
\}
            `;
            fs.writeFileSync("data/musics-level-"+level+".json", json);
            fs.writeFileSync("data/musics-level-"+level+".ts", code);
        });
      }
  }
]);
