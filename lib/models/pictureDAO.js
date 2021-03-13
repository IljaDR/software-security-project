var pool = require('../database/database.js');

class pictureDAO {
   static async getPictureByProductID(id){
      let result = await pool.query(`SELECT picture.location from picture
         JOIN product_pictures ON picture.id = product_pictures.picture_id
         JOIN antique ON product_pictures.product_id = antique.id
         WHERE antique.id = ?`,[id]);
      return result;
   }
}

module.exports = pictureDAO;
