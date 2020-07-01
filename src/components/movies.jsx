import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Pagination from "./common/pagination";
import { pagination } from "./utils/paginationFunc";
import { getGenres } from "./../services/fakeGenreService";
import Genre from "./common/genreSelect";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "./common/serach";

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

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "none" }, ...getGenres()];
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
    if (this.searchValue) this.setState({currentGenre: "All Genre"});
    this.setState({ currentGenre: genre, searchValue:"" });
    this.setState({ currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchValue) => {
    this.setState({ searchValue, currentPage:1, currentGenre:"All Genres" });
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
          <Link to="/movies/new" className="btn btn-primary btn-sm">
            New Movie
          </Link>
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
