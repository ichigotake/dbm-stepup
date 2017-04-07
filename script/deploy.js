require('dotenv').config();

ghpages.publish(path.join(__dirname, 'build'), {
  repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/ichigotake/dbm-stepup.git',
  silent: true
}, callback);
