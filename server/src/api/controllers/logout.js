module.exports = (api) => {
    api.post('/logout', (req, res) => {
        // TODO: eliminar la cookie de refresco
        const { refreshCookie } = req.$.config.authentication
        res.clearCookie(refreshCookie, {
            httpOnly: true,
            sameSite: 'none',
            secure: req.$.config.protocol === 'https'
        }).status(204).end();
    });
}