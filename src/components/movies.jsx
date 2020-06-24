import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { pagination } from './utils/pagination';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 5,
    currentPage:1
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage:page });
  };

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  headLine = () => {
    if (this.state.movies.length === 0) {
      return <p className="m-4"> There are no Movies Avialable currently </p>;
    } else {
      return (
        <p className="m-4 lead">
          {" "}
          Showing {this.state.movies.length} movies available in the database
          ....{" "}
        </p>
      );
    }
  };

  render() {

    const { pageSize , currentPage , movies} = this.state;
    const pageMovies = pagination(pageSize, currentPage, movies);
    return (
      <React.Fragment>
        {this.headLine()}
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageMovies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      isLiked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          itemsCount={movies.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
