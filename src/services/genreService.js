import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return http.request({
    url: `/genres`,
    baseURL: apiUrl,
  });
}
