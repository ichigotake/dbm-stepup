# DBM STEP UP

[![CircleCI](https://circleci.com/gh/ichigotake/dbm-stepup.svg?style=svg)](https://circleci.com/gh/ichigotake/dbm-stepup)

## DEVELOPMENT

### Create a service account

1. Create a service account in the [Google Developer Console](https://console.developers.google.com/project)
    - ref: https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method
2. Put your JSON key file as `script/google.json`

### Start server

```
npm install
npm start
```

### DEPLOY

Deploy to GitHub pages with [gh-pages](https://www.npmjs.com/package/gh-pages).

```
npm run deploy
```

## Resource

Download music data from spreadsheet when `npm run fetch`.

Spreadsheet: [皿ありDBM譜面一覧 - Google スプレッドシート](https://docs.google.com/spreadsheets/d/1HOzyn1HyljTTNfuGaxqdX4bv-uoCewFc8B0IdbwGAFo/edit#gid=703547426)
