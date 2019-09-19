import React, {Component} from 'react';
import logoBlack from './g9.png';
import logoWhite from './g9-white.png';
import './App.css';


class App extends Component {

  constructor (props) {
    super(props);
    this.state = { apiResponse: '' };
}

      callAPI() {
          fetch("http://localhost:9000/testAPI")
              .then(res => res.text())
              .then(res => this.setState({ apiResponse: res }));
      }
      componentWillMount() {
          this.callAPI();
      }

  render() {
    return ( 
        <div className="App">
          <header className="App-header">
          <h2 className="App-title">MEDIA MGMT</h2>
             <img src={logoWhite} className="App-logo-white" alt="logo" />
        <img src={logoBlack} className="App-logo" alt="logo" />
        <div className="App-owner"> <span>for</span> group nine media</div>
        <p className="App-intro">{this.state.apiResponse}</p>
        <footer className="App-dev">
          <div>Funda Istvan, 2019</div>
        </footer>
          </header>
        </div>
    );
  }
}

export default App;
