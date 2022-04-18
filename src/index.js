import './css/main.css';
import { Notify } from 'notiflix';
import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderGallery';
import getRefs from './js/getRefs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { addBackToTop } from 'vanilla-back-to-top'

const STORAGE_KEY = 'gallery-page-number';
const STORAGE_SEARCH = 'search-end';
const refs = getRefs();
let searchValue = '';
let lightboxGallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
Notify.init({ fontSize: '18px', timeout: 7000});

refs.button.addEventListener('click', onSubmit);
addBackToTop();

function onSubmit(event) {
  event.preventDefault();
  const value = refs.input.value.trim();
  searchValue = value;
  refs.gallery.innerHTML = '';
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  localStorage.removeItem(STORAGE_SEARCH);
  localStorage.removeItem(STORAGE_KEY);
  if (!value) {
    return Notify.warning('Please enter some text to input field!');
  }
  fetchPictures(value)
    .then(response => {
      refs.gallery.innerHTML = '';
      if (response.data.totalHits === 0)
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      renderGallery(response);
      if (response.data.totalHits < 40) {
        localStorage.setItem(STORAGE_SEARCH, 1);
      }
    })
    .catch(onSearchError);
  lightboxGallery.refresh();
  window.addEventListener('scroll', onScroll);
  event.target.form.reset();
};

function onScroll() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
    if (localStorage.getItem(STORAGE_SEARCH)) {
      window.removeEventListener('scroll', onScroll);
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    let pageCounter = 1;
    if (localStorage.getItem(STORAGE_KEY)) {
      pageCounter = localStorage.getItem(STORAGE_KEY);
    }
    fetchPictures(searchValue, Number(pageCounter) + 1)
      .then(response => {
        if (!response.data.hits.length) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(STORAGE_SEARCH, 1);
          window.removeEventListener('scroll', onScroll);
          return Notify.failure("We're sorry, but you've reached the end of search results.");
        }
        let numbers = response.request.responseURL.match(/\d+/g);
        localStorage.setItem(STORAGE_KEY, numbers[numbers.length - 1]);
        renderGallery(response);
        lightboxGallery.refresh();
      })
      .catch(onSearchError);
  }
}

function onSearchError(error) {
  Notify.failure(error);
  console.error(error);
}