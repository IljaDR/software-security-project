const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticationDAO = require('../../lib/models/authenticationDAO.js');
const passport = require('passport');

router.post('/register', async (req, res) => {
   try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      let user = {
         hash: hashedPassword,
         name: req.body.name,
         email: req.body.email
      }
      authenticationDAO.saveUser(user);
      res.redirect('/login');
   } catch {
      res.redirect('/register');
   }
});

router.post('/login', passport.authenticate('local',{
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true
}));

router.delete('/logout', (req, res) => {
   req.logOut();
   res.redirect('/login');
})

module.exports = router;
