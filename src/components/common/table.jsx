import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  render() {
    const { sortColumn, onSort, pageMovies, columns } = this.props;
    return (
      <table className="table table-hover">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          columns={columns}
        />
        <TableBody data={pageMovies} columns={columns} />
      </table>
    );
  }
}

export default Table;
