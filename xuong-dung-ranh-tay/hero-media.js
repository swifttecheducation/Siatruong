(() => {
const cfg=window.heroMedia||{}, root=document.querySelector('.content-flow');
if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
const videos=new Set();
const safePlay=v=>{const p=v.play();if(p)p.catch(()=>{v.controls=true;});};
function makeVideo(item,loop){const v=document.createElement('video');v.src=item.src;v.muted=true;v.defaultMuted=true;v.playsInline=true;v.loop=loop;v.preload='metadata';v.setAttribute('aria-label',item.alt||'Video minh họa');if(item.poster)v.poster=item.poster;videos.add(v);return v;}
function mountVideo(selector,item,label){if(!item?.src)return;const box=root.querySelector(selector);box.replaceChildren();box.classList.add('live-media');const v=makeVideo({...item,alt:label},true);v.controls=reduced.matches;box.append(v);}
mountVideo('.raw-thumb',cfg.raw,'RAW CLIP chưa dựng');mountVideo('.reel-result',cfg.reel,'REEL đã dựng từ cùng video');
const toolbar=document.createElement('div');toolbar.className='flow-toolbar';const toggle=document.createElement('button');toggle.type='button';toolbar.append(toggle);
function updateToggle(){toggle.textContent=paused?'Phát video':'Dừng video';toggle.setAttribute('aria-pressed',String(paused));}
function sync(){videos.forEach(v=>{if(paused)v.pause();else if(!v.closest('[hidden]'))safePlay(v);});updateToggle();}
toggle.onclick=()=>{paused=!paused;sync();};updateToggle();
reduced.addEventListener('change',e=>{if(e.matches){paused=true;sync();}});
new IntersectionObserver(entries=>{if(entries[0].isIntersecting)sync();else videos.forEach(v=>v.pause());},{threshold:.15}).observe(root);
document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(v=>v.pause());else sync();});
const samples=[['Một ý hay.','Thành bộ ảnh trượt.'],['Ý tiếp theo.','Giải thích rõ hơn.'],['Điều cần nhớ.','Lưu lại để xem sau.']];
const carousel=root.querySelector('.carousel-result');carousel.replaceChildren();carousel.classList.add('swipe-carousel');carousel.setAttribute('aria-label','CAROUSEL: kéo ngang để xem ảnh');const track=document.createElement('div');track.className='carousel-track';track.tabIndex=0;carousel.append(track);
const slides=cfg.carousel?.length?cfg.carousel:samples.map((x,i)=>({demo:true,title:x[0],body:x[1],alt:`Slide minh họa ${i+1}`}));
slides.forEach((item,i)=>{const el=document.createElement('div');el.className='carousel-page';el.setAttribute('role','group');el.setAttribute('aria-label',`${i+1} / ${slides.length}`);if(item.src){const img=document.createElement('img');img.src=item.src;img.alt=item.alt||`Slide ${i+1}`;img.loading='lazy';el.append(img);}else{el.innerHTML='<small>Minh họa bố cục</small><strong></strong><p></p>';el.querySelector('strong').textContent=item.title;el.querySelector('p').textContent=item.body;}track.append(el);});
let ci=0;const cnav=document.createElement('div');cnav.className='media-nav';const prev=document.createElement('button'),next=document.createElement('button'),status=document.createElement('span');prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','Slide trước');next.setAttribute('aria-label','Slide tiếp');status.setAttribute('aria-live','polite');cnav.append(prev,status,next);carousel.after(cnav);
function cupdate(){ci=Math.round(track.scrollLeft/(track.clientWidth||1));status.textContent=`${ci+1} / ${slides.length}`;prev.disabled=ci===0;next.disabled=ci===slides.length-1;}
function move(n){track.scrollTo({left:Math.max(0,Math.min(slides.length-1,n))*track.clientWidth,behavior:reduced.matches?'instant':'smooth'});}
prev.onclick=()=>move(ci-1);next.onclick=()=>move(ci+1);track.onscroll=cupdate;track.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(ci+(e.key==='ArrowRight'?1:-1));}};cupdate();
const story=root.querySelector('.story-result');story.replaceChildren();story.classList.add('live-story');const bar=document.createElement('div');bar.className='story-bars';const content=document.createElement('div');content.className='story-content';const snav=document.createElement('div');snav.className='media-nav';const sp=document.createElement('button'),sn=document.createElement('button'),ss=document.createElement('span');sp.type=sn.type='button';sp.textContent='‹';sn.textContent='›';sp.setAttribute('aria-label','Story trước');sn.setAttribute('aria-label','Story tiếp');ss.setAttribute('aria-live','polite');snav.append(sp,ss,sn);story.append(bar,content);story.after(snav);
const stories=cfg.stories?.length?cfg.stories:[{demo:true,title:'Có bài mới rồi!',body:'Xem REEL của mình nhé.'},{demo:true,title:'Một ý để lưu lại.',body:'Từ nội dung bạn đã quay.'},{demo:true,title:'Hẹn gặp ở bài tiếp.',body:'Minh họa STORY số 3.'}];let si=0;
stories.forEach(()=>bar.append(document.createElement('i')));
function showStory(n){si=(n+stories.length)%stories.length;const old=content.querySelector('video');if(old){old.pause();videos.delete(old);}content.replaceChildren();const item=stories[si];if(item.type==='video'&&item.src){const v=makeVideo(item,false);v.controls=true;v.onended=()=>showStory(si+1);content.append(v);if(!paused)safePlay(v);}else if(item.src){const img=document.createElement('img');img.src=item.src;img.alt=item.alt||`STORY ${si+1}`;content.append(img);}else{const label=document.createElement('small'),h=document.createElement('strong'),p=document.createElement('p');label.textContent='Minh họa STORY';h.textContent=item.title;p.textContent=item.body;content.append(label,h,p);}ss.textContent=`${si+1} / ${stories.length}`;[...bar.children].forEach((e,i)=>e.classList.toggle('viewed',i<=si));}
sp.onclick=()=>showStory(si-1);sn.onclick=()=>showStory(si+1);content.onclick=e=>{if(e.target.closest('video'))return;const r=content.getBoundingClientRect();showStory(si+(e.clientX-r.left<r.width/2?-1:1));};content.tabIndex=0;content.setAttribute('aria-label','STORY: bấm trái hoặc phải để chuyển');content.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();showStory(si+(e.key==='ArrowRight'?1:-1));}};showStory(0);
if(!cfg.raw?.src&&!cfg.reel?.src&&!cfg.stories?.some(x=>x.type==='video'))toggle.hidden=true;
let bannerVisible=false,manualUntil=0;
root.addEventListener('pointerdown',()=>{manualUntil=Date.now()+8000;},{passive:true});
root.addEventListener('keydown',()=>{manualUntil=Date.now()+8000;});
new IntersectionObserver(entries=>{bannerVisible=entries[0].isIntersecting;},{threshold:.15}).observe(root);
setInterval(()=>{
 if(!bannerVisible||document.hidden||reduced.matches||Date.now()<manualUntil)return;
 move((ci+1)%slides.length);
 showStory(si+1);
},2000);
root.querySelector('figcaption')?.remove();
})();
