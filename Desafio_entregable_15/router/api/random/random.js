const express = require('express');
const { getRandom }= require ('../../../controllers/randomControllers');

const randomRoutes = express.Router();

randomRoutes.get('/', (req, res) => {
  const { cant } = req.query;
  if(cant == undefined) return getRandom(res, "start"); 
  if(isNaN(cant)) return res.json({ error: "the quantity entered must be a number" });
  getRandom(res, cant); 
});
randomRoutes.get('/:cant', (req, res) => {
  const { cant } = req.params;
  if(cant == undefined) return getRandom(res, "start"); 
  if(isNaN(cant)) return res.json({ error: "the quantity entered must be a number" });
  getRandom(res, cant); 
});

module.exports = randomRoutes;