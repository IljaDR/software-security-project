const express = require('express');
const router = express.Router();
const productDAO = require('../../lib/models/productDAO.js');

router.get('/', async (req, res) => {
   let products = await productDAO.getAllProducts();
   res.send(products);
})

module.exports = router;
