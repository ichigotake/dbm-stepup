const sleep = require('sleep');
const fs = require('fs');
const pg = require('pg');
let config = {
  user: 'kckhnjjolusmtn', //env var: PGUSER
  database: 'd5m1qk18p3lu94', //env var: PGDATABASE
  password: '63ae50bf812758afcc2a38757f03454d805985218ce1366da1d671b7b3c55811', //env var: PGPASSWORD
  host: 'ec2-23-21-111-81.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
const pool = new pg.Pool(config);
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});
//export the query method for passing queries to the pool
let query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};
let connect = function (callback) {
    return pool.connect(callback);
};

pool.connect((err, client, done) => {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    let levels = [5,6,7,8,9];
    for (let i in levels) {
        let level = levels [i];
        let json = fs.readFileSync('data/musics-level-' + level + '.json');
        let musics = JSON.parse(json);
        for (let j in musics) {
            let music = musics[j];
            if (music.folder === "") {
                continue;
            }
            let favorite = (music.favorite !== undefined);
            let f_category = music.folder.substring(0, 1);
            let f_grade = music.folder.length === 1 ? music.folder.substring(1, 1) : 2;
            let title = decodeURIComponent(music.title);
            let level = parseInt(music.level);

            let query = "INSERT INTO musics (title, level, folder_category, folder_grade, favorite)"
                + " VALUES($1::varchar, $2::int, $3::char, $4::int, $5::boolean)"
                + "ON CONFLICT (title, level) "
                + "DO UPDATE SET folder_category = $3::char, folder_grade = $4::int, favorite = $5::boolean";
            client.query(query, [title, level, f_category, f_grade, favorite], (err, result) => {
                // if (err) throw err;

                // // just print the result to the console
                // console.log(result.rows[0]); // outputs: { name: 'brianc' }
                // // console.log(query + "\n");
                // client.end(function (err) {
                //     if (err) throw err;
                // });
            });
            // sleep.msleep(50);
        }
    }
    done();
});
