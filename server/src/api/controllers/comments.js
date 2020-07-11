module.exports = function (api) {
    api.route('/comments')
        .post((req, res, next) => {
            req.body.created = new Date().toUTCString();
            req.body.user = req.$.user.id;
            next();
        });
}