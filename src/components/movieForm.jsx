import React from "react";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import Forms from "./common/forms";
import { getGenres } from "../services/fakeGenreService";

const Joi = require("@hapi/joi");

class MovieForm extends Forms {
  state = {
    data: {
      _id: "id",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .label("Number In Stock")
      .required(),
    dailyRentalRate: Joi.number().max(10).min(0).label("Rate").required(),
  }).options({ abortEarly: false });

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/pageNotFound");

    this.setState({ data: this.mapToData(movie) });
  }

  mapToData = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    console.log("Submitted");
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="col-6 container">
        <h1 className="bm">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
