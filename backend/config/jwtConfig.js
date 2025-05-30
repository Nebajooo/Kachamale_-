const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const opts = {
  secretOrKey: process.env.JWT_SECRET, // Using the JWT secret from the .env file
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"), // Or from header
};

passport.use(
  new JWTstrategy(opts, async (token, done) => {
    try {
      return done(null, token.user); // token should contain a `user` field
    } catch (error) {
      return done(error, false);
    }
  })
);
