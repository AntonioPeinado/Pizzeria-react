
module.exports = (api) => {
    api.post('/refresh', async (req, res) => {
        const { jwt, config } = req.$;
        const {
            authSecret,
            refreshSecret,
            authTTL,
            refreshCookie
        } = config.authentication;
            // comprobar que el token de refresco existe
        const token = req.cookies[refreshCookie];
        if (!token) {
            res.status(401).end();
            return;
        }
        // verificamos que el token de refresco es válido
        
        let decoded;
        try {
          decoded = await jwt.verify(token, refreshSecret);
        } catch (err) {
            res.status(401).end();
            console.error(err)
            return;
        }
        // creamos un nuevo token de autenticación
        const authToken = await jwt.sign({ user: decoded.user }, authSecret, { algorithm: 'HS512', expiresIn: authTTL })
        res.json({ token: authToken });
    })
}