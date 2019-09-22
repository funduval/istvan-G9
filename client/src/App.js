import React, {Component} from 'react';
import logoBlack from './g9.png';
import logoWhite from './g9-white.png';
import './App.css';
import axios from "axios";

class App extends Component {

  constructor (props) {

    super(props);
    
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleReportSubmit = this.handleReportSubmit.bind(this);

    this.state = { 
      apiResponse: '',
      dbResponse: '',
      intervalIsSet: false,
      videoData:[]
    };
}

      callAPI() {
          fetch("http://localhost:9000/api")
              .then(res => res.text())
              .then(res => this.setState({ apiResponse: res }));
      }

      callDB() {
        fetch("http://localhost:9000/db")
            .then(res => res.text())
            .then(res => this.setState({ dbResponse: res
            }))
            .catch(err => err);
      }

      getVideosFromDb = () => {
        fetch("http://localhost:9000/api")
          .then(res => res.json())
          .then(res => this.setState({ videoData: res }));
      };


      handleCreateSubmit = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);

        console.log("this is what the data looks like if you're data " + object) 

        axios.post('http://localhost:9000/api/createVideo', {
          body:json,
        });
      }

     








      handleUpdateSubmit (event) {
        event.preventDefault();
        var data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);

        console.log("this is what the data looks like if you " + json)
       
      
          axios.post('http://localhost:3001/api/updateData', {
         
          });
      
      }

      handleDeleteSubmit (event) {
       
        axios.delete('http://localhost:3001/api/deleteData', {
          data: {
          },
        });
      }

      handleReportSubmit (event) {
        event.preventDefault();
        var data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);

        console.log("this is what the data looks like if you " + json)
       
        axios.get('http://localhost:9000/api/getVideos', {
        });
      }
    
      componentDidMount() {

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
            <tab>
              {videoData.length <= 0 ? "NO DB ENTRIES YET" : videoData.map(video => (
                 <li style={{ padding: "10px 20px 0 40px", listStyleType:"none", textAlign:"left"}} key={video._id}>
                  <span style={{ color: "gray" }}> id: </span> {video._id} <br />
                  <span style={{ color: "gray" }}> name: </span> {video.name} <br />
                  <span style={{ color: "gray" }}> data: </span> {video.brand} <br />
                  <span style={{ color: "gray" }}> viewed: </span> {video.count} <span style={{ color: "gray" }}> times</span>
                </li>
              ))}
            </tab>
          <form  onSubmit={this.handleCreateSubmit}>
          <label htmlFor="videotitle">Enter Video Title</label>
          <input id="name" name="name" type="text" />
  
          <label htmlFor="date">Enter Publish Date</label>
          <input id="date" name="publish_date" type="text" />

          <label htmlFor="videotitle">Enter Brand</label>
          <input id="brand" name="brand" type="text" />
          <button>Create Video!</button>
        </form>
        <form  onSubmit={this.handleDeleteSubmit}>
          <label htmlFor="_id">Enter Id</label>
          <input id="_id" name="_id" type="text" />
          <button>Delete Video!</button>
        </form>
        <form  onSubmit={this.handleUpdateSubmit}>
          <label htmlFor="name">Enter Video</label>
          <input id="name" name="name" type="text" />
  
          <label htmlFor="_id">Enter Id</label>
          <input id="_id" name="_id" type="text" />
          <button>View A Video, Increase its Views</button>
        </form>
        <form  onSubmit={this.handleReportSubmit}>
          <label htmlFor="name">Run a Report</label>
          <input id="name" name="name" type="text" />
          <button>Get Report!</button>
        </form>
        </div>
    );
  }
}

export default App;
