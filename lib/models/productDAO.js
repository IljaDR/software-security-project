var pool = require('../database/database.js');

class productDAO {
   static async getAllProducts(){
      let result = await pool.query('SELECT * FROM product');
      return result;
   }
}

module.exports = productDAO;
