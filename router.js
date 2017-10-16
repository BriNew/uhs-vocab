// const express = require('express');
// const router = express.Router();

// const model = require('./models'),
// dictionary = model.dictionary;

// router.get('/', (req, res) => {
//   res.json(dictionary.get(req.query.id));
// });

// router.post('/', (req, res) => {
//   const {id, year, english, lao} = req.query;
//   dictionary.update(
//     {id, year, english, lao}
//   );
//   res.json(true);
// });

// router.put('/', (req, res) => {
//   const {year, english, lao} = req.query;
//   dictionary.create(
//     year, english, lao 
//   );
//   res.json(true);
// });

// router.delete('/', (req, res) => {
//   const {id} = req.query;
//   dictionary.delete(id);
//   res.json(true);
// });

// module.exports = router;

