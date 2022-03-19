import './css/main.css';
import { Notify } from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPictures } from './js/fetchPictures';
import getRefs from './js/getRefs';

const refs = getRefs();
Notify.init({ fontSize: '18px', });

refs.button.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const value = refs.input.value.trim();
  if (!value) {
    refs.gallery.innerHTML = '';
    return Notify.warning('Please enter some text to input field!');
  }
  fetchPictures(value)
    .then(render)
    .catch(onSearchError);
  event.target.form.reset();
};

function render(array) {
  console.log(array);
  // if (array.length > 10) { Notify.info('Too many matches found. Please enter a more specific name.'); }
  // else if (array.length > 1 && array.length <= 10) { renderList(array); }
  // else if (array.length = 1) { renderInfo(array); }

}

function renderGallery(array) {
  refs.gallery.innerHTML = '';
  // const markup = array.map(item => `<li><img width="30" src="${item.flags.svg}" alt="Flag of ${item.name}"> ${item.name}</li>`).join('');
  // refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onSearchError(error) {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  console.log(error);
}

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
// Notify.failure("We're sorry, but you've reached the end of search results.");
// Notify.info('Hooray! We found ${totalHits} images.');