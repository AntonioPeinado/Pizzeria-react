import HTTPService from '../core/http-service';
import config from '../core/config';

const pizzaService = new HTTPService(config.apiURL + '/pizzas')

export default pizzaService;

//pizzas