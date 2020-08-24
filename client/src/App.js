import React, { Component } from "react";
import logoBlack from "./g9.png";
import logoWhite from "./g9-white.png";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import Movies from "./components/movies";
import "bootstrap/dist/js/bootstrap.bundle.min";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleReportSubmit = this.handleReportSubmit.bind(this);

    this.state = {
      apiResponse: "",
      dbResponse: "",
      intervalIsSet: false,
      videoData: [],
      videoViews: "",
      videoId: "",
      movies: [],
    };
  }

  callAPI() {
    fetch("http://localhost:9000/api")
      .then((res) => res.text())
      .then((res) =>
        this.setState({
          apiResponse: res,
        })
      );
  }

  callDB() {
    fetch("http://localhost:9000/db")
      .then((res) => res.text())
      .then((res) =>
        this.setState({
          dbResponse: res,
        })
      )
      .catch((err) => err);
  }

  getVideosFromDb = () => {
    fetch("http://localhost:9000/api/getVideos")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          videoData: res,
          movies: res,
        })
      );
  };

  handleCreateSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var object = {};

    data.forEach((value, key) => {
      object[key] = value;
    });

    console.log("object is", object);

    axios.post("http://localhost:9000/api/createVideo", object);
  }

  handleUpdateSubmit(event) {
    var data = new FormData(event.target);
    var object = {};

    data.forEach((value, key) => {
      object[key] = value;
    });
    var objIdToUpdate = object._id;
    var views = object.count + 1;

    axios.post("http://localhost:9000/api/updateVideo", {
      _id: objIdToUpdate,
      count: views,
    });
  }

  handleDeleteSubmit(event) {
    var data = new FormData(event.target);
    var object = {};

    data.forEach((value, key) => {
      object[key] = value;
    });

    var objIdToDelete = object._id;

    axios.delete("http://localhost:9000/api/deleteVideo", {
      params: {
        _id: objIdToDelete,
      },
    });
  }

  handleReportSubmit(event) {
    event.preventDefault();

    var data = new FormData(event.target);
    var object = {};

    data.forEach((value, key) => {
      object[key] = value;
    });

    var idLookup = object._id;

    axios
      .get("http://localhost:9000/api/getVideos", {
        params: {
          _id: idLookup,
        },
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
    const { length: count } = this.state.movies;
    if (count === 0)
      return (
        <div className="App">
          <header className="App-header">
            <h2 className="App-title"> MEDIA MGMT </h2>
            <img src={logoWhite} className="App-logo-white" alt="logo" />
            <img src={logoBlack} className="App-logo" alt="logo" />
            <div className="App-owner">
              <span>for </span> group nine media
            </div>
          </header>
          <p>There are no movies in the database.</p>
        </div>
      );

    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title"> MEDIA MGMT </h2>
          <img src={logoWhite} className="App-logo-white" alt="logo" />
          <img src={logoBlack} className="App-logo" alt="logo" />
          <div className="App-owner">
            <span>for </span> group nine media
          </div>
        </header>
        <div className="container">
          <div className="row top-buffer">
            <div className="col-md-3">
              <form onSubmit={this.handleCreateSubmit}>
                <label htmlFor="videotitle"> Create A Video </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Title"
                />
                <input
                  id="date"
                  name="publish_date"
                  type="text"
                  placeholder="Enter Date"
                />
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Enter Brand"
                />
                <button className="btn btn-success"> Create </button>
              </form>
            </div>
            <div className="col-md-3">
              <form onSubmit={this.handleUpdateSubmit}>
                <div className="form-group">
                  <label htmlFor="name"> View A Video </label>
                  <input
                    id="_id"
                    name="_id"
                    type="text"
                    placeholder="Enter Video ID"
                  />
                  <button className="btn btn-info"> View </button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <form onSubmit={this.handleReportSubmit}>
                <div className="form-group">
                  <label htmlFor="name"> Run a Report </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Video ID"
                  />
                  <button className="btn btn-warning"> Report </button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <form id="delete-form" onSubmit={this.handleDeleteSubmit}>
                <div className="form-group">
                  <label htmlFor="_id"> Delete A Video </label>
                  <input
                    id="_id"
                    name="_id"
                    type="text"
                    placeholder="Enter Video ID"
                  />
                  <button className="btn btn-danger"> Delete Video </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>Showing {count} videos in the database.</p>
              <table className="table">
                <thead className="thead-dark ">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Stock</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map((movie) => (
                    <tr key={movie._id}>
                      <td className="align-middle">
                        <h5>{movie.name}</h5>
                      </td>
                      <td className="align-middle">
                        <h5>{movie.brand}</h5>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.handleDelete(movie);
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Movies movies="this.state.movies" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
