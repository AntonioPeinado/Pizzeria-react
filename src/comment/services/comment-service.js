import HTTPService from '../../core/http-service';
import config from '../../core/config';

const commentsService = new HTTPService(config.apiURL + '/comments');
export {commentsService};