import nock from 'nock';
import MovieService from '../../src/services/movieService';
import UrlBuilder, {tmdbDomain} from '../../src/services/urlBuilder';

describe('Movie Service', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    describe('searchMoviesFromKeywords', () => {
        test('should return the exact list of movies the server sends back', () => {
            const expectedMovies = ['The Matrix', 'The Matrix Reloaded'];
            const searchTerm = 'matrix';

            nock(tmdbDomain)
                .get(UrlBuilder.buildSearchUrlWithNoDomain(searchTerm))
                .reply(200, JSON.stringify({ results: expectedMovies } ));

            return MovieService.searchMoviesFromKeywords(searchTerm).then(movies => {
                expect(movies).toEqual(expectedMovies);
            });
        });

        test('should return the exact list of movies the server sends back test 2', () => {
            const expectedMovies = ['The Matrix', 'The Matrix Reloaded'];
            const searchTerm = 'matrix';

            nock(tmdbDomain)
                .get(UrlBuilder.buildSearchUrlWithNoDomain(searchTerm))
                .reply(200, JSON.stringify({ results: expectedMovies } ));

            return MovieService.searchMoviesFromKeywords(searchTerm).then(movies => {
                expect(movies).not.toEqual([]);
            });
        });

        test('should yield empty result set if no keywords are supplied', () => {
            const searchTerm = '';

            return MovieService.searchMoviesFromKeywords(searchTerm).then(result => {
                expect(result).toEqual([]);
            });
        });
    });

    describe('getMovieDetails', () => {
        test('should yield movie details', () => {
            const movieId = 3;
            const expectedResults = { anything: 'some info...' };

            nock(tmdbDomain)
                .get(UrlBuilder.buildGetMovieDetailsUrlWithNoDomain(movieId))
                .reply(200, JSON.stringify(expectedResults));

            return MovieService.getMovieDetails(movieId).then(result => {
                expect(result).toEqual(expectedResults);
            });
        });
    });
});
