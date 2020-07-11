import HTTPService from '../core/http-service.js'; //src\core\http-service.js
import config from '../core/config.js';

                                                //src\ingrediente\ingrediente-service.js

const ingredienteService = new HTTPService(config.apiURL + '/ingredients');


export default ingredienteService;