(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-pain-screen]').forEach(slot=>{
  const key=slot.dataset.painScreen;
  if ((window.painMedia||{})[key]?.src) return;
  const image=document.createElement('img');
  image.alt={capcut:'Illustration : cắt timeline, căn phụ đề và thêm minh họa',canva:'Illustration : kéo chữ, căn lề và thay đổi màu trên các slide',story:'Illustration : sắp xếp ba khung STORY và thêm lời nhắc'}[key];
  image.loading='lazy';
  let paused=reduced.matches;
  const poster='media/demo/'+key+'-poster.png',gif='media/demo/'+key+'.gif';
  image.src=paused?poster:gif;
  const sync=()=>{image.src=paused?poster:gif;};
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  slot.replaceChildren(image);slot.classList.add('has-illustration');sync();
 });
})();
