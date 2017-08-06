import fetch from 'isomorphic-fetch';
import LoggerFactory from '../utils/loggerFactory';
import UrlBuilder from './urlBuilder';

const logger = LoggerFactory.createLogger('movieService.js');

export default class MovieService {
    static searchMoviesFromKeywords(searchTerm) {
        if (!searchTerm) {
            logger.info('removing search terms, clear results');
            return new Promise((resolve, reject) => resolve([]));
        }

        return fetch(UrlBuilder.buildSearchUrl(searchTerm))
            .then(res => res.json())
            .then(json => json.results)
            .catch(error => {
                logger.error('An error occured while trying to search movies', error);
            });
    }
}