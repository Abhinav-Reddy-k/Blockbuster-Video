import React, { Component } from "react";

class Genre extends Component {
  render() {
    const {
      items,
      onSelectGenre,
      textProperty,
      valueProperty,
      currentGenre,
    } = this.props;
    return (
      <ul className="list-group tm">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            type="button"
            className={
              item[textProperty] === currentGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onSelectGenre(item[textProperty])}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

Genre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Genre;
