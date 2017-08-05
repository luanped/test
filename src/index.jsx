import React from 'react';
import ReactDOM from 'react-dom';
import './services/movieService';

class App extends React.Component {
    render() {
        return (
          <div>
              Hello World
          </div>
        );
    }
}

const mountpoint = document.createElement('div');
mountpoint.id = 'root';
document.body.appendChild(mountpoint);

ReactDOM.render(<App />, mountpoint);