const express = require('express');
const cors = require('cors');
const corsGate = require('cors-gate');
const util = require('../util');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers');
const {error, provider, auth} = require('./middlewares');
const jwt = require ('./jwt');

function create(dbManager, config){
    const api = express.Router();
    api.use(bodyParser.json());
    api.use(cookieParser());

    // fallback al referrer
    api.use(corsGate.originFallbackToReferrer());
    
    // habilitar cors
    api.use(cors({
        origin: config.allowedOrigins,
        credentials: true
    }));
    // habilitar csrf usando el origin y el referrer
    api.use(corsGate({
        strict: true,
        allowSafe: false,
        origin: util.getOrigin(config)
    }));
    api.use(provider({dbManager, config, jwt}));
    controllers.public.forEach((controller) => {
        controller(api);
    });
    api.use(auth);
    controllers.private.forEach((controller) => {
        controller(api);
    });
    api.use(error);
    return api;
}


module.exports = {create};