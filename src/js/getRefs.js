export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-form').elements.searchQuery,
    button: document.querySelector('.search-form button'),
    gallery: document.querySelector('.gallery'),
  };
}