const form = document.querySelector('.search-form');
const videoWrapper = document.querySelector('.video-wrapper');
const loading = document.querySelector('.loading');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('.search-form__input');
  const videoId = getYoutubeVideoId(input.value);
  
  if (!videoId) {
    alert('Invalid YouTube link');
    return;
  }
  
  loading.classList.remove('hidden');
  videoWrapper.innerHTML = '';
  
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '560');
  iframe.setAttribute('height', '315');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  
  iframe.addEventListener('load', () => {
    loading.classList.add('hidden');
    videoWrapper.appendChild(iframe);
  });
});

function getYoutubeVideoId(url) {
  const pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(pattern);

  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
}
