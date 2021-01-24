var pool = require('../database/database.js');

class productDAO {
   static async getAllProducts(){
      let result = await pool.query(`SELECT * FROM product`);
      return result;
   }

   static async getProductByID(id){
      let result = await pool.query(`SELECT * FROM product WHERE productID = ?`,[id]);
      return result;
   }

   static async addProduct(product){
      let result = await pool.query(`INSERT INTO product (name, price, stock, description, picture) VALUES (?, ?, ?, ?, ?);`,[product.name, product.price, product.stock, product.description, product.picture]);
   }

   static async removeProductById(id){
      let result = await pool.query(`DELETE FROM product WHERE productID = ?`,[id]);
   }

   static async addProduct(id, product){
      let result = await pool.query(`UPDATE product SET name = ?, price = ?, stock = ?, description = ?, picture = ? WHERE productID = ?;`,[product.name, product.price, product.stock, product.description, product.picture, id]);
   }
}

module.exports = productDAO;
