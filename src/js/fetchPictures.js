const API_KEY = '24511799-4a7f974650a4e56ef46644e1e';
const BASE_URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=";
const PARAMS = '&image_type=photo&orientation=horizontal&safesearch=true';

export function fetchPictures(input) {
  return fetch(BASE_URL + encodeURIComponent(input) + PARAMS).then(response => response.json()).catch(error => console.log(error));
}