export const devConfig = {
    secret: 'secret',
    google: {
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        callbackURL: 'https://localhost:3000/api/auth/google/callback'
    },
    facebook: {
        app_id: 'app_id',
        app_secret: 'app_secret',
        callbackURL: 'https://localhost:3000/api/auth/facebook/callback'
    }
};