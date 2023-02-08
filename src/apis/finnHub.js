import axios from "axios";

const TOKEN = "ced5ttqad3i8too9q210ced5ttqad3i8too9q21g";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
