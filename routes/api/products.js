const express = require('express');
const router = express.Router();
const productDAO = require('../../lib/models/productDAO.js');

router.get('/', async (req, res) => {
   let products = await productDAO.getAllProducts();
   res.status(200).send(products);
})

router.get('/:id', async (req, res) => {
   let products = await productDAO.getProductByID(req.params.id);
   res.status(200).send(products);
})

router.post('/add', async (req, res) => {
   if(!req.body.name || !req.body.price || !req.body.stock || !req.body.description || !req.body.picture){
      return res.status(400).json({ msg: "Please enter valid values."});
   }
   else{
      await productDAO.addProduct(req.body);
      return res.status(200).json({ msg: "Product succesfully added."});
   }
})

router.get('/:id', async (req, res) => {
   let products = await productDAO.getProductByID(req.params.id);
   res.send(products);
})

router.delete('/:id', async (req, res) => {
   let products = await productDAO.removeProductById(req.params.id);
   res.status(200).send(products);
})

router.put('/update/:id', async (req, res) => {
   if(!req.body.name || !req.body.price || !req.body.stock || !req.body.description || !req.body.picture){
      console.log(req.body.name)
      return res.status(400).json({ msg: "Please enter valid values."});
   }
   else{
      await productDAO.addProduct(req.params.id, req.body);
      return res.status(200).json({ msg: "Product succesfully updated."});
   }
})

module.exports = router;
