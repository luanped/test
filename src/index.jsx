import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
          <div>
              Hello World
          </div>
        );
    }
}

let mountpoint = document.createElement('div');
mountpoint.id = 'root';
document.body.appendChild(mountpoint);

ReactDOM.render(<App />, mountpoint);