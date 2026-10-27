(() => {
  document.querySelectorAll('[data-pain-screen]').forEach(slot => {
    const media = (window.painMedia || {})[slot.dataset.painScreen];
    if (!media || !media.src) return;
    const title = slot.querySelector('strong').textContent;
    const video = document.createElement('video');
    video.src = media.src;
    if (media.poster) video.poster = media.poster;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-label', title);
    video.addEventListener('play', () => document.querySelectorAll('[data-pain-screen] video').forEach(other => { if (other !== video) other.pause(); }));
    slot.replaceChildren(video);
    slot.classList.add('has-video');
  });
})();
