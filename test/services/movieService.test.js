import nock from 'nock';
import MovieService, {SearchMovieUrlBase, TMDBDomain} from '../../src/services/movieService';

describe('Movie Service', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    test('should return the exact list of movies the server sends back', () => {
        const expectedMovies = ['The Matrix', 'The Matrix Reloaded'];
        const searchTerm = 'matrix';

        nock(TMDBDomain)
            .get(SearchMovieUrlBase + searchTerm)
            .reply(200, JSON.stringify({ results: expectedMovies } ));

        MovieService.searchMoviesFromKeywords('matrix').subscribe(movies => {
            expect(movies).toEqual(expectedMovies);
        });
    });

    test('should return the exact list of movies the server sends back test 2', () => {
        const expectedMovies = ['The Matrix', 'The Matrix Reloaded'];
        const searchTerm = 'matrix';

        nock(TMDBDomain)
            .get(SearchMovieUrlBase + searchTerm)
            .reply(200, JSON.stringify({ results: expectedMovies } ));

        MovieService.searchMoviesFromKeywords('matrix').subscribe(movies => {
            expect(movies).not.toEqual([]);
        });
    });

    test('should error if the request fails', () => {
        const searchTerm = 'matrix';

        nock(TMDBDomain)
            .get(SearchMovieUrlBase + searchTerm)
            .reply(400);

        MovieService.searchMoviesFromKeywords('matrix').subscribe(null, error => {
            expect(error).toEqual([]);
        });
    });
});
