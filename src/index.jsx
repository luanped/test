import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs';
import './services/movieService';
import MovieService from './services/movieService';
import LoggerFactory from './utils/loggerFactory';
import './index.css';

const logger = LoggerFactory.createLogger('index.jsx');
const peopleMediaType = 'person';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {results: []};
    }

    componentDidMount() {
        const search$ = Rx.Observable.fromEvent(this._input, 'input')
            .debounceTime(400)
            .switchMap(event => {
                const searchTerm = event.target.value;
                logger.info('Searching movie db with new search term: ', searchTerm);
                return MovieService.searchMoviesFromKeywords(searchTerm);
            });

        this._subscription = search$.subscribe(results => this.setState({results}));
    }

    componentWillUnmount() {
        this._subscription.unsubscribe();
    }

    render() {
        logger.info('Rendering app', this.state.results);
        return (
            <div className='search-form'>
                <h1 className='search-form__title'>The Movie DB Search Form</h1>
                <input ref={ r => this._input = r } className='search-form__input' />
                <ul className='search-form__result-list'>
                    {
                        this.state.results.map(result => {
                            let className = 'search-form__result-item';
                            if (result.media_type === peopleMediaType) {
                                className += ' search-form__result-item--person';
                            }
                            return <li key={result.id} className={className}>{result.title} {result.name}</li>;
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mountpoint = document.createElement('div');
mountpoint.id = 'root';
document.body.appendChild(mountpoint);

ReactDOM.render(<App />, mountpoint);