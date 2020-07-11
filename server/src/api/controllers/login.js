const bcrypt = require('bcrypt');
module.exports = (api) => {
    api.post('/login',async (req, res) => {
        const {dbManager, jwt, config} = req.$;
        const { email, password } = req.body;


// TODO: comprobar que user y pass son correctos
        const user = await dbManager.get('users', {find:{email}});
        if (!user) {
            res.status(401).end();
            return;
        } 
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(401).end();
            return;
        }
// TODO: crear tokens de refresco y de auth y devolverlos
        const userModel = {
            ...user,
            password: undefined
        }
        const {
            authSecret,
            refreshSecret,
            authTTL,
            refreshTTL,
            refreshCookie
        } = config.authentication;
        
        const authToken = await jwt.sign({user:userModel},authSecret,{algorithm:'HS512',expiresIn: authTTL})
        
        const refreshToken = await jwt.sign({user:userModel},refreshSecret,{algorithm:'HS512',expiresIn: refreshTTL})
            res.cookie(refreshCookie, refreshToken, {
                    maxAge: refreshTTL * 1000,
                    httpOnly: true,
                    secure: config.protocol === 'https',
                    sameSite: 'none'
            })
                .json({token: authToken});   
        });     
        
}
    
