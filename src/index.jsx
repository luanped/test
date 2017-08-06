import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs';
import './services/movieService';
import MovieService from './services/movieService';
import LoggerFactory from './utils/loggerFactory';
import './index.css';

const logger = LoggerFactory.createLogger('index.jsx');
const peopleMediaType = 'person';
const movieMediaType = 'movie';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {results: [], details: null};
        this.subscriptions = [];
    }

    componentDidMount() {
        const search$ = Rx.Observable.fromEvent(this._input, 'input')
            .debounceTime(400)
            .switchMap(event => {
                const searchTerm = event.target.value;
                logger.info('Searching movie db with new search term: ', searchTerm);
                return Rx.Observable.fromPromise(MovieService.searchMoviesFromKeywords(searchTerm));
            });

        const subscription = search$.subscribe(results => this.setState({ results: results || [] }));
        this.subscriptions.push(subscription);
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    handleResultItemClick(id, mediaType) {
        if (mediaType === movieMediaType) {
            logger.info('Going to fetch more details about movie id', id);
            const subscription = Rx.Observable.fromPromise(MovieService.getMovieDetails(id))
                                    .subscribe(details => this.setState({ details }));
            this.subscriptions.push(subscription);
        }
    }

    buildMovieDetails() {
        return (
            <div>
                <div>Title: {this.state.details.title}</div>
                <div>Tagline: {this.state.details.tagline}</div>
                <div>Overview: {this.state.details.overview}</div>
                <div>Runtime: {this.state.details.runtime}</div>
                <div>Score: {this.state.details.vote_average}</div>
            </div>
        );
    }

    //the view could be split into smaller components, i.e. shell containing the search form and details panel
    //however since it was such a small app, i felt it was okay to keep it all here
    render() {
        logger.info('Rendering app', this.state.results);
        return (
            <div className='app'>
                <div className='search-form'>
                    <h1 className='search-form__title'>The Movie DB Search Form</h1>
                    <input ref={ r => this._input = r } className='search-form__input' placeholder='starting typing a movie, tv or person name...'/>
                    <ul className='search-form__result-list'>
                        {
                            this.state.results.map(result => {
                                let className = 'search-form__result-item';
                                if (result.media_type === peopleMediaType) {
                                    className += ' search-form__result-item--person';
                                }
                                return <li key={result.id} className={className} onClick={() => this.handleResultItemClick(result.id, result.media_type)}>{result.title} {result.name}</li>;
                            })
                        }
                    </ul>
                </div>
                <div className='search-results'>
                    {this.state.details ? this.buildMovieDetails() : undefined}
                </div>
            </div>
        );
    }
}

const mountpoint = document.createElement('div');
mountpoint.id = 'root';
document.body.appendChild(mountpoint);

ReactDOM.render(<App />, mountpoint);