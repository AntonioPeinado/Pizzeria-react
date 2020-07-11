const bcrypt = require('bcrypt');

module.exports = (api) => {
    api.post('/register', async (req, res) => {
        const {dbManager} = req.$;
        const { email, password } = req.body;

        // verificar q al registrarse no exista ya un usuario con ese email
        const userExists = await dbManager.get('users', {find:{email}});
        if (userExists) {
            res.status(400).json({error: 'Este mail ya está registrado'}).end();
            return;
        } 
        
        // TODO: modificar la contrasena del body usando bcrypt
        // TODO: utilizar req.$.dbManager para grabar el usuario
        // req.$.dbManager.create('users', body)

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            ...req.body,
            password: encryptedPassword
        }
        const userCreated = await dbManager.create('users', user);
        res.status(201).json(userCreated);
    });
}
    
