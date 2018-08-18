# API - Registro de materiales 

Integra autenticación con redes sociales facebook y google.

## Installation

``npm install``

## Prerequisites

Es necesario generar el clientId y clientSecret para facebook y google, una vez generado remplazar en el archivo development.js -> src/resources/config/env/development.js
```
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
```
## Usage

`` npm start ``

