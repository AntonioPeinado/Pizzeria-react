const server = require('./src/server');
const config = require('./config');

server.create(config);
// const jwt = require('./src/api/jwt');
// const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjExNDg3YzEtZDZmOS00ZjMzLWJheXVpdGdramNndDE5LTg1ODdkZmZiNzVlMCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0In0sImlhdCI6MTU5MTc4MjkzMiwiZXhwIjo1OTQzNzQ5MzJ9.BfQEGcIa4-ZOkRbke-uziYk4RGJwWNqEct0UeQ3UQ4UjilbeDqFu8WENPXgmfXjUlpHnasZLeaK1PDVG_w8B-Q'
// const tokenOk = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjExNDg3YzEtZDZmOS00ZjMzLWJheXVpdGdramNndDE5LTg1ODdkZmZiNzVlMCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0In0sImlhdCI6MTU5MTc4MjkzMiwiZXhwIjoyNTk0Mzc0OTMyfQ.oewAD_nlOScWYOEIdga-zeOk7Jluo8S-Q08BcNOI8bUCJsZlWh9T3qMbLRnzsW2CnMe-m586RJkPyvrD1bqHvA'
// async function run(){

//     // invalid token - asynchronous
// try {
//     var decoded = await jwt.verify(tokenOk, 'secret');
//     console.log(decoded)
//     const authToken = await jwt.sign({user:decoded.user},config.authentication.authSecret,{algorithm:'HS512',expiresIn: config.authentication.authTTL})
//     console.log(authToken)
// } catch(err) {
//       console.error(err)
//     // err
// }
// console.log('ya podemos hacer pruebas')
// }
// run();