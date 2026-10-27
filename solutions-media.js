(() => {
const cfg=window.heroMedia||{}, own=cfg.solutions||{};
function video(item){const v=document.createElement('video');v.src=item.src;v.controls=true;v.playsInline=true;v.preload='none';if(item.poster)v.poster=item.poster;v.setAttribute('aria-label',item.alt||'Video minh họa thành phẩm');return v;}
const reel=own.reel||cfg.reel, box=document.querySelector('[data-solution="reel"]');if(reel?.src)box.replaceChildren(video(reel));
for(const key of ['carousel','stories']){
 const items=own[key]||cfg[key]||[],el=document.querySelector(`[data-solution="${key}"]`);if(!items.length||!el)continue;
 let i=0;const viewer=document.createElement('div');viewer.className='solution-viewer';const nav=document.createElement('div');nav.className='media-nav';const prev=document.createElement('button'),next=document.createElement('button'),label=document.createElement('span');prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label',key==='carousel'?'Ảnh trước':'STORY trước');next.setAttribute('aria-label',key==='carousel'?'Ảnh tiếp':'STORY tiếp');label.setAttribute('aria-live','polite');nav.append(prev,label,next);el.replaceChildren(viewer,nav);
 function show(n){viewer.querySelector('video')?.pause();i=(n+items.length)%items.length;const x=items[i];if(x.type==='video')viewer.replaceChildren(video(x));else{const img=document.createElement('img');img.src=x.src;img.alt=x.alt||`${key==='carousel'?'CAROUSEL':'STORY'} ${i+1}`;img.loading='lazy';viewer.replaceChildren(img);}label.textContent=`${i+1} / ${items.length}`;}
 prev.onclick=()=>show(i-1);next.onclick=()=>show(i+1);viewer.tabIndex=0;viewer.setAttribute('aria-label',key==='carousel'?'CAROUSEL: vuốt hoặc dùng phím mũi tên':'STORY: dùng nút để chuyển');viewer.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(i+(e.key==='ArrowRight'?1:-1));}};let start=null;viewer.addEventListener('touchstart',e=>{start=e.touches[0].clientX},{passive:true});viewer.addEventListener('touchend',e=>{if(start!==null){const delta=e.changedTouches[0].clientX-start;if(Math.abs(delta)>40)show(i+(delta<0?1:-1));start=null;}},{passive:true});show(0);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('.solution-media video').forEach(v=>v.pause());});
})();
