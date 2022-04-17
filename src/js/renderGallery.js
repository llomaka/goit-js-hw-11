import getRefs from './getRefs';
import { Notify } from 'notiflix';

const refs = getRefs();

export function renderGallery(array) {
  refs.gallery.innerHTML = '';
  Notify.success(`Hooray! We found ${array.data.totalHits} images.`);
  const markup = array.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
    <a class="gallery__item" href=${largeImageURL}>
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>: ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>: ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>: ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>: ${downloads}
      </p>
    </div>
  </div>`).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
 }
