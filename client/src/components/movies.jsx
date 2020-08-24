import React, { Component } from "react";

const Movies = ({movies}) => (

    return (
      <div>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead className="thead-dark ">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td className="align-middle">
                  <h5>{movie.title}</h5>
                </td>
                <td className="align-middle">
                  <h5>{movie.genre.name}</h5>
                </td>
                <td className="align-middle">
                  <h5>{movie.numberInStock}</h5>
                </td>
                <td className="align-middle">
                  <h5>{movie.dailyRentalRate}</h5>
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
      </div>
    );
  
)
