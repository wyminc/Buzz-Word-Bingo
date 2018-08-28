const express = require('express');
const app = express();
const bp = require('body-parser');

app.use(bp.urlencoded({ extended: true }));

let nextId = 3;
const spells = [
  {
    id: 1,
    name: 'Magic Missiles',
    damage: 10
  },
  {
    id: 2,
    name: 'Frost Shield',
    damage: -100
  }
];

app.get('/getallspells', (req, res) => {
  res.json(spells);
});

app.get('/spell/:id/', (req, res) => {
  const { id } = req.params;
  // const resData = spells.filter(item => item.id === id);
  const resData = spells.filter(item => {
    return item.id == id;
  });

  console.log('resData', resData);
  res.json(resData[0]);
});

app.post('/addspell', (req, res) => {
  console.log('req.body', req.body);
  let spellObject = req.body;
  spellObject.id = nextId;
  spells.push(spellObject);
  res.redirect(`/spell/${nextId}`);
  nextId++;
});

app.delete('/removespell/:id', (req, res) => {
  //...
})

app.listen(8090, () => {
  console.log('APP IZ UP');
});