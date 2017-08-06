import Rx from 'rxjs';
import fetch from 'isomorphic-fetch';
import LoggerFactory from '../utils/loggerFactory';

const logger = LoggerFactory.createLogger('movieService.js');

export const TMDBDomain = 'https://api.themoviedb.org';
export const SearchMovieUrlBase = '/3/search/multi?api_key=c202e0d8368f638cd5f2de8cc5b618f3&language=en-US&query=';

export default class MovieService {
    static searchMoviesFromKeywords(keywords) {
        if (!keywords) {
            logger.info('removing search terms, clear results');
            return Rx.Observable.of([]);
        }

        return Rx.Observable.create(obs => {
            fetch(TMDBDomain + SearchMovieUrlBase + keywords)
                .then(res => res.json())
                .then(json => {
                    logger.info('successfully retrieved some movies');
                    obs.next(json.results);
                    obs.complete();
                })
                .catch(error => {
                    logger.error('An error occured while trying to search movies');
                    obs.error([]);
                });
        });
    }
}