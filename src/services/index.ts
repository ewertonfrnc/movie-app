import axios from "axios";
import { ACCESS_TOKEN_AUTH, API_URL } from "@env";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
  },
});
