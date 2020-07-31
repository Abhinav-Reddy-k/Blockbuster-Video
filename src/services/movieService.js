import http from "./httpService";
import { apiUrl } from "../config.json";

function MovieUrl(id) {
  return `${apiUrl}/movies/${id}`;
}

export function deleteMovie(movieId) {
  return http.delete(MovieUrl(movieId));
}

export function getMovies() {
  return http.get(`${apiUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(MovieUrl(movieId));
}

export function saveMovie(movie) {
  let body = { ...movie };
  delete body._id;
  if (movie._id === "new") {
    return http.post(`${apiUrl}/movies`, body);
  }
  return http.put(MovieUrl(movie._id), body);
}
