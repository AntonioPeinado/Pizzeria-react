module.exports = function (api) {
    api.route('*')
        .get(async (req, res) => {
            const resource = await req.$.dbManager.get(req.path, {
                include: req.query.include && req.query.include.split(',')
            });
            if (!resource) {
                res.status(404).end();
            } else {
                res.json(resource);
            }
        })
        .post(async (req, res) => {
            const resource = await req.$.dbManager.create(req.path, req.body);
            res.status(201).json(resource);
        })
        .put(async (req, res) => {
            const resource = await req.$.dbManager.update(req.path, req.body);
            res.json(resource);
        })
        .delete(async (req, res) => {
            await req.$.dbManager.remove(req.path);
            res.status(204).end();
        });
}