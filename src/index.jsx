import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs';
import './services/movieService';
import MovieService from './services/movieService';

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
                return MovieService.searchMoviesFromKeywords(searchTerm);
            });

        this._subscription = search$.subscribe(results => this.setState({results}));
    }

    componentWillUnmount() {
        this._subscription.unsubscribe();
    }

    render() {
        return (
            <div>
                <input ref={ r => this._input = r } type='text' onChange={this.handleInputChange}/>
                <ul>
                    {
                        this.state.results.map(result => {
                            return <li key={result.id}>{result.title} {result.name}</li>;
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