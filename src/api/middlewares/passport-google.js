import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../resources/config/env/development';
import User from '../resources/usuario/usuario.model';

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
/* jshint ignore:start */
export const configureGoogleStrategy = () => {

    passport.use(new GoogleStrategy.OAuth2Strategy({
            clientID: devConfig.google.clientId,
            clientSecret: devConfig.google.clientSecret,
            callbackURL: devConfig.google.callbackURL
        },
        async(token, tokenSecret, profile, done) => {
            try {
                // console.log('Token', token);
                // console.log('secretToken', tokenSecret);
                // console.log('profile', profile);
                // console.log('Nombre de user google: ', profile.name.givenName);
                // console.log('Apellido de user google: ', profile.name.familyName);
                // done(null, profile);

                const user = await User.findOne({ 'google.id': profile.id });

                if (user) {
                    console.log('Este usuario ya existe');
                    return done(null, user);
                }

                const newUser = new User({});

                newUser.nombre = profile.name.givenName;
                newUser.apellido = profile.name.familyName;
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.displayName = profile.displayName;
                newUser.google.email = profile.emails[0].value;

                await newUser.save();


                return done(null, newUser);

            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    ));
}