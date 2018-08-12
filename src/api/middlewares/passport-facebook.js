import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { devConfig } from '../resources/config/env/development';
import User from '../resources/usuario/usuario.model';

/* jshint ignore:start */
export const configureFacebookStrategy = () => {

    passport.use(new FacebookStrategy.Strategy({
            clientID: devConfig.facebook.app_id,
            clientSecret: devConfig.facebook.app_secret,
            callbackURL: devConfig.facebook.callbackURL,
            profileFields: ['id', 'displayName', 'emails', 'name']
        },

        async function(accessToken, refreshToken, profile, done) {

            try {

                console.log('Nombre usuario facebook: ', profile.name.givenName);
                console.log('Apellido usuario facebook: ', profile.name.familyName);
                console.log('id: ', profile.id);
                const user = await User.findOne({ 'facebook.id': profile.id });


                if (user) {
                    console.log('Este usuario de facebook ya existe');
                    return done(null, user);
                }

                const newUser = new User({});
                newUser.nombre = profile.name.givenName;
                newUser.apellido = profile.name.familyName;
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                newUser.facebook.displayName = profile.displayName;
                newUser.facebook.email = profile.emails[0].value;

                await newUser.save();

            } catch (error) {
                console.log('Algo salio mal, intentalo nuevamente', error);
                return done(error);
            }
        }

    ));

};