import Rx from 'rxjs';
import $ from 'jquery';
import LoggerFactory from '../utils/loggerFactory';

const logger = LoggerFactory.createLogger('movieService');
const searchMovieUrlBase = 'https://api.themoviedb.org/3/search/multi?api_key=c202e0d8368f638cd5f2de8cc5b618f3&language=en-US&query=';

export function searchMoviesFromKeywords(keywords) {
    return Rx.Observable.create(obs => {
        $.get(searchMovieUrlBase + keywords, (data, status) => {
            if (status === 'success') {
                logger.info('successfully retrieved some movies');
                obs.next(data);
                obs.complete();
            } else {
                logger.error('error encountered while trying to query for movies');
                obs.error('An error has occurred');
            }
        });
    });
}

searchMoviesFromKeywords('doraemon').subscribe(x => console.log('!!!!!!!!!!', x), () => {}, () => console.log('completed'));