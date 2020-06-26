import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", lable: "Title" },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { pageMovies, sortColumn, onSort } = this.props;
    return (
      <table className="table table-hover">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
        />
        <TableBody data={pageMovies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
