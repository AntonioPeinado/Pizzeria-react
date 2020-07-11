function getOrigin(config){
    return config.origin || `${config.protocol}://${config.host}:${config.port}`;
}

module.exports = {
    getOrigin
};