module.exports = (dependencies) => (req, res, next) => {
    req.$ = Object.assign(req.$ || {}, dependencies);
    next();
}