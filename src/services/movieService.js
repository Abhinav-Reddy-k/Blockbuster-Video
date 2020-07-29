import axios from "axios";
import { apiUrl } from "../config.json";

export function deleteMovie(movieId) {
  return axios.delete(`${apiUrl}/movies/${movieId}`);
}

export function getMovies() {
  return axios.get(`${apiUrl}/movies`);
}

export function getMovie(movieId) {
  return axios.get(`${apiUrl}/movies/${movieId}`);
}

export function saveMovie(movie) {}
