// TODO: comprobar si el token de auth es valido
// si no es valido 401

module.exports = async (req, res, next) => {
  const { jwt, config } = req.$;
  const auth = req.get('Authorization');
  const isBearerAuth = auth && auth.startsWith('Bearer ');
  if (!isBearerAuth) {
    res.status(401).end();
    return;
  }
  // si es valido grabar el usuario en req.$ y next
  const { authSecret } = config.authentication;
  const token = auth.split(' ')[1];
  try {
    const payload = await jwt.verify(token, authSecret);
    req.$.user = payload.user;
    next();

  } catch (err) {
    res.status(401).end();
  }
}