import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { pagination } from "./utils/paginationFunc";
import { getGenres } from "./../services/fakeGenreService";
import Genre from "./common/genreSelect";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 2,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id : "none"}, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentGenre: genre });
  };


  render() {
    const { pageSize, currentPage, movies, currentGenre } = this.state;
    const filtered = currentGenre && currentGenre !== "All Genres"
      ? movies.filter((movie) => movie.genre.name === currentGenre)
      : movies;
    const pageMovies = pagination(pageSize, currentPage, filtered);
    if (pageMovies.length === 0 && currentPage !== 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
    return (
      <div className="row">
        <div className="col-3">
          <Genre
            currentGenre={currentGenre}
            items={this.state.genres}
            onSelectGenre={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p className="m-4 lead">
            {" "}
            Showing {filtered.length} movies available in the database ....{" "}
          </p>
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
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
