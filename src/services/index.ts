import axios from "axios";
import { TMDB_ACCESS_TOKEN_AUTH, TMDB_API_URL } from "@env";

export const api = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN_AUTH}`,
  },
});
