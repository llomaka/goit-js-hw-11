import './css/main.css';
import { Notify } from 'notiflix';
import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderGallery';
import getRefs from './js/getRefs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import $ from "jquery";
import InfiniteScroll from "infinite-scroll";

const refs = getRefs();
Notify.init({ fontSize: '18px', timeout: 10000});

refs.button.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const value = refs.input.value.trim();
  if (!value) {
    refs.gallery.innerHTML = '';
    return Notify.warning('Please enter some text to input field!');
  }
  fetchPictures(value)
    .then(response => {
      if (response.data.totalHits === 0)
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      renderGallery(response);
      let lightboxGallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
      // let infScroll = new InfiniteScroll( refs.gallery, {
      //   path: `${response.data.request.responseURL}&page=2`,
      //   append: '.post',
      //   status: '.scroller-status',
      // });
      render(response);
    })
    .catch(onSearchError);

  event.target.form.reset();
};

function render(array) {
  console.log(array);
}

function onSearchError(error) {
  Notify.failure(error);
  console.log(error);
}

// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

// Notify.failure("We're sorry, but you've reached the end of search results.");
