import React, { Component } from 'react';
import logoBlack from './g9.png';
import logoWhite from './g9-white.png';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends Component {

  constructor(props) {

    super(props);

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleReportSubmit = this.handleReportSubmit.bind(this);

    this.state = {
      apiResponse: '',
      dbResponse: '',
      intervalIsSet: false,
      videoData: [],
      videoViews:'',
      videoId:""
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
      .then(res => this.setState({
        dbResponse: res
      }))
      .catch(err => err);
  }

  getVideosFromDb = () => {

      fetch("http://localhost:9000/api/getVideos")
      .then(res => res.json())
      .then(res => this.setState({ videoData: res }));

  }

  handleCreateSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let object = {};

    data.forEach((value, key) => { object[key] = value });

    console.log("object is", object)

    axios.post('http://localhost:9000/api/createVideo', object);

  }

  handleUpdateSubmit(event) {
      const data = new FormData(event.target);
      let object = {};

      data.forEach((value, key) => { object[key] = value });
      let objIdToUpdate = object._id;
      let views = object.count + 1;
     
      axios.post("http://localhost:9000/api/updateVideo", {
        _id: objIdToUpdate,
        count: views 
      })
    };

  

  handleDeleteSubmit(event) {
    const data = new FormData(event.target);
    let object = {};

    data.forEach((value, key) => { object[key] = value });

    let objIdToDelete = object._id;

    axios.delete('http://localhost:9000/api/deleteVideo', {
      params: {
        _id: objIdToDelete,
      }
    })
  }

  handleReportSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    let object = {};

    data.forEach((value, key) => { object[key] = value });

    let idLookup = object._id

    axios.get('http://localhost:9000/api/getVideos', {
        params: {
          _id: idLookup,

        }
      })
      .then(function (response) {
        console.log("Viewed this many times", response.count);
      })
      .catch(function (error) {
        console.log(error);
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
                <div className="container">
                <div className="row top-buffer">
                    <div className="col-md-3">
                      <form onSubmit={this.handleCreateSubmit}>
                        <label htmlFor="videotitle">Create A Video</label>
                        <input id="name" name="name" type="text" placeholder="Enter Title"/>
                        <input id="date" name="publish_date" type="text" placeholder="Enter Date"/>
                        <input id="brand" name="brand" type="text" placeholder="Enter Brand"/>
                        <button className="btn btn-success">Create</button>
                      </form>
                  </div>
                  <div className="col-md-3">
                    <form onSubmit={this.handleUpdateSubmit}>
                    <div class="form-group">
                      <label htmlFor="name">View A Video</label>
                      <input id="_id" name="_id" type="text" placeholder="Enter Video ID"/>
                      <button className="btn btn-info">View</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-3">
                    <form onSubmit={this.handleReportSubmit}>
                    <div class="form-group">
                      <label htmlFor="name">Run a Report</label>
                      <input id="name" name="name" type="text" placeholder="Enter Video ID" />
                      <button className="btn btn-warning">Report</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-3">
                    <form id="delete-form" onSubmit={this.handleDeleteSubmit}>
                    <div class="form-group">
                      <label htmlFor="_id">Delete A Video</label>
                      <input id="_id" name="_id" type="text" placeholder="Enter Video ID"/>
                      <button className="btn btn-danger">Delete Video</button>
                      </div>
                      </form>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-12">
                    <h2>MOST POPULAR VIDEOS</h2>
                    <ul>
                      {videoData.length <= 0 ? "NO DB ENTRIES YET" : videoData.map(video => (
                        <li class="list-item" style={{listStyleType: "none", textAlign: "left" }} key={video._id}>
                          <span style={{ color: "gray" }}> id: </span> {video._id} <br />
                          <span style={{ color: "gray" }}> name: </span> {video.name} <br />
                          <span style={{ color: "gray" }}> data: </span> {video.brand} <br />
                          <span style={{ color: "gray" }}> viewed: </span> {video.count} <span style={{ color: "gray" }}> times</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default App;
