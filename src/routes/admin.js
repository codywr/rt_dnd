
const express = require('express');
const mongodb = require('mongodb').MongoClient;

const adminRouter = express.Router();

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'rtDnDApp';
const collectionName = 'games';

const games = [
  {
    title: 'Pits of Caldun',
    text: 'Sounds have been head eminating from the caves to the north. At first, they were only the sound of rocks falling, but now cries rend the night filling hearts with dread of what is coming.',
    master: 'tannerr',
    players: [
      { codyr: 'Nemaris' },
      { sheriser: 'Jess' },
      { heberb: 'Ricky' },
    ],
  },
  {
    title: 'Sword of VorStrahd',
    text: 'An evil has begun to spread through the villages surrounding StrausStrahd, a once great kingdom that now a city that doesn\'t even claim a dot on the map. The few merchants who leave its walls speak only of great posperity, encouraging others to visit.',
    master: 'codyr',
    players: [
      { tanner: 'Lenimmer' },
      { sheriser: 'LuLu' },
      { heberb: 'Balad' },
      { davidv: 'Erkstro' },
    ],
  },
  {
    title: 'Endless gems',
    master: 'heberb',
    text: 'Now an aging lord of the cosmos, Planos is looking for a successor. You have been paired with a villianos lot to capture all 5 endless gems and replace Planos on his throne ... if your so called "allies" don\'t kill you in the process.',
    players: [
      { codyr: 'Trent' },
      { sheriser: 'Lucinda' },
      { tannerr: 'Volo' },
    ],
  },
];

adminRouter.route('/newGame').get((req, res) => {
  mongodb.connect(dbUrl, (connErr, client) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertMany(games, (insertErr, results) => {
      res.send(results); // Display results for feedback
      client.close();
    });
  });
});

module.exports = adminRouter;
