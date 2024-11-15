import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getCurrentUser } from "./../services/authService";
import { getGenres } from "./../services/genreService";
import { deleteMovie, getMovies } from "./../services/movieService";
import Genre from "./common/genreSelect";
import Pagination from "./common/pagination";
import Search from "./common/serach";
import MoviesTable from "./moviesTable";
import { pagination } from "./utils/paginationFunc";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 8,
    currentPage: 1,
    currentGenre: "All Genres",
    searchValue: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ name: "All Genres", _id: "none" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
      toast.info("Movie Deleted Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status > 400 && ex.response.status < 500) {
        toast.error("The movie is already deleted");
      }
      this.setState({ movies: originalMovies });
    }
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
    if (this.searchValue) this.setState({ currentGenre: "All Genre" });
    this.setState({ currentGenre: genre, searchValue: "" });
    this.setState({ currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchValue) => {
    this.setState({ searchValue, currentPage: 1, currentGenre: "All Genres" });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      sortColumn,
      searchValue,
    } = this.state;
    let filtered;
    if (searchValue)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    else
      filtered =
        currentGenre && currentGenre !== "All Genres"
          ? movies.filter((movie) => movie.genre.name === currentGenre)
          : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pageMovies = pagination(pageSize, currentPage, sorted);
    if (pageMovies.length === 0 && currentPage !== 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
    return { pageMovies, filtered };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      sortColumn,
      searchValue,
    } = this.state;
    const user = getCurrentUser();
    const { pageMovies, filtered } = this.getPageData();

    return (
      <div className="row">
        <div className="col-sm-4 col-md-3 col-lg-3">
          <Genre
            currentGenre={currentGenre}
            items={this.state.genres}
            onSelectGenre={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p className="m-4 lead">
            Showing {filtered.length} movies available in the database ....
          </p>
          {user && user.isAdmin && (
            <Link to="/movies/new" className="btn btn-primary btn-sm">
              New Movie
            </Link>
          )}
          <Search value={searchValue} onChange={this.handleSearch} />
          <MoviesTable
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            pageMovies={pageMovies}
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
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
