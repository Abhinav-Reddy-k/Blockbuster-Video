import React from "react";
import { getMovie, saveMovie } from "./../services/movieService";
import Forms from "./common/forms";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

const Joi = require("@hapi/joi");

class MovieForm extends Forms {
  state = {
    data: {
      _id: "new",
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

  async populateGenres() {
    let { data: genres } = await getGenres();
    console.log(genres);
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToData(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/pageNotFound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
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

  doSubmit = async () => {
    console.log("Submitted");
    await saveMovie(this.state.data);
    toast.success("Movie Saved Succesfully");
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
