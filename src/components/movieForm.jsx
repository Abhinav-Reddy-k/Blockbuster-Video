import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <h1>Movie Form - {match.params.id}</h1>
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={this.handleSave}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
