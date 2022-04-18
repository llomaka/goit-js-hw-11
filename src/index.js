import './css/main.css';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderGallery';
import getRefs from './js/getRefs';

const STORAGE_KEY = 'gallery-page-number';
const refs = getRefs();
Notify.init({ fontSize: '18px', timeout: 7000});

refs.button.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const value = refs.input.value.trim();
  refs.gallery.innerHTML = '';
  if (!value) {
    return Notify.warning('Please enter some text to input field!');
  }
  fetchPictures(value)
    .then(response => {
      refs.gallery.innerHTML = '';
      if (response.data.totalHits === 0)
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      localStorage.removeItem(STORAGE_KEY);
      renderGallery(response);
    })
    .catch(onSearchError);
  let lightboxGallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      let pageCounter = 1;
      if (localStorage.getItem(STORAGE_KEY)) {
        pageCounter = localStorage.getItem(STORAGE_KEY);
      }
      fetchPictures(value, Number(pageCounter) + 1)
        .then(response => {
          if (!response.data.hits.length) {
            localStorage.removeItem(STORAGE_KEY);
            return Notify.failure("We're sorry, but you've reached the end of search results.");
          }
          let numbers = response.request.responseURL.match(/\d+/g);
          localStorage.setItem(STORAGE_KEY, numbers[numbers.length - 1]);
          renderGallery(response);
          lightboxGallery.refresh();
        })
        .catch(onSearchError);
    }
  });
  event.target.form.reset();
};

function onSearchError(error) {
  Notify.failure(error);
  console.log(error);
}