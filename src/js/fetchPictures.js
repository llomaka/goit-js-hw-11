import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';
const AUTH_TOKEN = '?key=24511799-4a7f974650a4e56ef46644e1e&q=';
const PARAMS = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export async function fetchPictures(input) {
  const data = await axios(AUTH_TOKEN + input + PARAMS);
  return data;
}