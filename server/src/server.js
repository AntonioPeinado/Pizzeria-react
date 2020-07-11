const express = require('express');
const { DBManager } = require('./db-manager');
const api = require('./api');

async function create(config) {
    const app = express();
    const dbManager = await DBManager.create(config.db);
    app.use('/api', api.create(dbManager, config));
    Object.values(config.statics).forEach((dir) => {
        app.use(express.static(dir));
    });
    app.listen(config.port, () => {
        console.log(`server listening on http://localhost:${config.port}`);
    });
    return app;
}

module.exports = { create };


