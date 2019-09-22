import React, {Component} from 'react';
import logoBlack from './g9.png';
import logoWhite from './g9-white.png';
import './App.css';


class App extends Component {

  constructor (props) {

    super(props);
    
    this.state = { 
      apiResponse: '',
      dbResponse: '',
      intervalIsSet: false,
      videoData:[]
    };
}

      callAPI() {
          fetch("http://localhost:9000/testAPI")
              .then(res => res.text())
              .then(res => this.setState({ apiResponse: res }));
      }

      callDB() {
        fetch("http://localhost:9000/testDB")
            .then(res => res.text())
            .then(res => this.setState({ dbResponse: res
            }))
            .catch(err => err);
      }

      getVideosFromDb = () => {
        fetch("http://localhost:9000/testAPI")
          .then(res => res.json())
          .then(res => this.setState({ videoData: res }));
      };

      componentDidMount() {
         // this.callAPI();
         // this.callDB();
          this.getVideosFromDb();

      }

      render() {
        const { videoData } = this.state;
        return (
          
          
        <div className="App">
          <header className="App-header">
            <h2 className="App-title">MEDIA MGMT</h2>
              <img src={logoWhite} className="App-logo-white" alt="logo" />
              <img src={logoBlack} className="App-logo" alt="logo" />
            <div className="App-owner"> <span>for</span> group nine media</div>
          </header>
          <h2>TOP THREE MOST POPULAR VIDEOS</h2>
            <ul>
              {videoData.length <= 0 ? "NO DB ENTRIES YET" : videoData.map(video => (
                 <li style={{ padding: "10px", listStyleType:"none", textAlign:"left"}} key={video._id}>
                  <span style={{ color: "gray" }}> id: </span> {video._id} <br />
                  <span style={{ color: "gray" }}> name: </span> {video.name} <br />
                  <span style={{ color: "gray" }}> data: </span> {video.brand} <br />
                  <span style={{ color: "gray" }}> viewed: </span> {video.views.count} <span style={{ color: "gray" }}> times</span>
                </li>
              ))}
            </ul>
        <footer className="App-dev">
          <div>Funda Istvan, 2019</div>
        </footer>
        </div>
    );
  }
}

export default App;
