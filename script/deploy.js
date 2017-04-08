const ghpages = require('gh-pages');
require('dotenv').config();

ghpages.publish(path.join(__dirname, 'build'), {
  repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/' + process.env.GITHUB_REPO,
  silent: true
}, callback);
