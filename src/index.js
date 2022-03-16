import './sass/main.scss';
import { Notify } from 'notiflix';
import axios from "axios";

const API_KEY = '24511799-4a7f974650a4e56ef46644e1e';
const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('cats')+"&image_type=photo&orientation=horizontal&safesearch=true";
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

// Notify.failure('Sorry, there are no images matching your search query. Please try again.');