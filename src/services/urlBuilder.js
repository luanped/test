export const tmdbDomain = 'https://api.themoviedb.org';

const searchEndpoint = '/3/search/multi';
const movieEndpoint = '/3/movie/';

const apiKey = '?api_key=c202e0d8368f638cd5f2de8cc5b618f3';
const language = '&language=en-US';

const query = '&query=';

export default class UrlBuilder {
    static buildSearchUrl(searchTerms) {
        return tmdbDomain + this.buildSearchUrlWithNoDomain(searchTerms);
    }

    static buildGetMovieDetailsUrl(movieId) {
        return tmdbDomain + this.buildGetMovieDetailsUrlWithNoDomain(movieId);
    }

    //these no domain functions are mostly to aid testing using nock
    static buildSearchUrlWithNoDomain(searchTerms) {
        return searchEndpoint + apiKey + language + query + searchTerms;
    }

    static buildGetMovieDetailsUrlWithNoDomain(movieId) {
        return movieEndpoint + movieId + apiKey + language;
    }
}