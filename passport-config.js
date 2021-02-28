const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

async function initialize(passport, getUserByEmail, getUserByID){
   const authenticateUser = async (email, password, done) => {
      const user = await getUserByEmail(email);
      if (user == null){
         return done(null, false, { message: 'No user with that email' });
      }
      try {
         if(await bcrypt.compare(password, user.hash)) {
            return done(null, user);
         } else {
            return done(null, false, { message: 'Password incorrect' });
         }
      } catch (e) {
         return done(e)
      }
   }

   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
   passport.serializeUser((user, done) => done(null, user.userID));
   passport.deserializeUser((id, done) => {
      return done(null, getUserByID(id))
   })
}

module.exports = initialize
