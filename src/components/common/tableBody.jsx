import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class TableBody extends Component {
  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);
    if (column.path === "title")
      return (
        <Link to={`/movies/${movie._id}`}>{_.get(movie, column.path)}</Link>
      );
    else {
      return _.get(movie, column.path);
    }
  };

  getCellKey = (movie, column) => {
    return movie._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.getCellKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
