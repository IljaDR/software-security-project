var pool = require('../database/database.js');

class productDAO {
   static async saveUser(user){
      let result = await pool.query(`INSERT INTO user (hash, name, email) VALUES (?, ?, ?);`, [user.hash, user.name, user.email]);
   }

   static async getUserByEmail(email){
      let result = await pool.query(`SELECT * FROM user WHERE email LIKE ?`, email);
      return result[0];
   }

   static async getUserByID(id){
      let result = await pool.query(`SELECT * FROM user WHERE userID LIKE ?`, id);
      return result[0];
   }
}

module.exports = productDAO;
