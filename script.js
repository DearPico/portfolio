document.body.classList.add("loading");

const bootOverlay=document.querySelector(".boot-overlay");
if(bootOverlay){
  if(sessionStorage.getItem("tkBootSeen")==="true"){
    bootOverlay.classList.add("skip");
  }else{
    sessionStorage.setItem("tkBootSeen","true");
  }
}

setTimeout(()=>document.body.classList.remove("loading"),80);

const canvas=document.getElementById("bg");
if(canvas){
const ctx=canvas.getContext("2d");let w,h,particles;
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;particles=Array.from({length:Math.min(130,Math.floor(w*h/11500))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,r:Math.random()*1.9+.4}))}
resize();addEventListener("resize",resize);
let mouse={x:w/2,y:h/2};
addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY;document.documentElement.style.setProperty("--mx",`${e.clientX}px`);document.documentElement.style.setProperty("--my",`${e.clientY}px`)});
function draw(){ctx.clearRect(0,0,w,h);for(let i=0;i<particles.length;i++){const p=particles[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;let dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.hypot(dx,dy);if(d<160){p.x-=dx*.002;p.y-=dy*.002}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(210,225,255,.55)";ctx.fill();for(let j=i+1;j<particles.length;j++){const q=particles[j],ld=Math.hypot(p.x-q.x,p.y-q.y);if(ld<110){ctx.strokeStyle=`rgba(34,211,238,${(1-ld/110)*.13})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(draw)}draw();
}

const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
if(dot&&ring){let rx=0,ry=0;addEventListener("mousemove",e=>{dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";rx+=(e.clientX-rx)*.18;ry+=(e.clientY-ry)*.18;ring.style.left=rx+"px";ring.style.top=ry+"px"});}

document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.18}px)`;if(ring){ring.style.width="54px";ring.style.height="54px";ring.style.background="rgba(34,211,238,.08)"}});el.addEventListener("mouseleave",()=>{el.style.transform="";if(ring){ring.style.width="";ring.style.height="";ring.style.background=""}})});
document.querySelectorAll(".tilt,.hero-panel").forEach(card=>{card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateX(${y*-8}deg) rotateY(${x*8}deg) translateY(-5px)`});card.addEventListener("mouseleave",()=>card.style.transform="")});
const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target)}}),{threshold:.22,rootMargin:"0px 0px -80px 0px"});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

document.querySelectorAll("a[href$='.html'], a[href^='projects/'], a[href='../index.html']").forEach(a=>{
  a.addEventListener("click",e=>{
    if(a.target||a.href.includes("#")) return;
    e.preventDefault();
    document.body.classList.add("loading");

const bootOverlay=document.querySelector(".boot-overlay");
if(bootOverlay){
  if(sessionStorage.getItem("tkBootSeen")==="true"){
    bootOverlay.classList.add("skip");
  }else{
    sessionStorage.setItem("tkBootSeen","true");
  }
}

    setTimeout(()=>location.href=a.href,180);
  })
});


const lightbox=document.querySelector(".lightbox");
if(lightbox){
  const img=lightbox.querySelector("img");
  document.querySelectorAll(".gallery img").forEach(g=>g.addEventListener("click",()=>{img.src=g.src;lightbox.classList.add("show")}));
  lightbox.addEventListener("click",()=>lightbox.classList.remove("show"));
}


const toTop=document.querySelector(".to-top");
if(toTop){
  const toggleTop=()=>toTop.classList.toggle("show",scrollY>520);
  addEventListener("scroll",toggleTop,{passive:true});
  toggleTop();
  toTop.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
}


document.querySelectorAll(".project-card,.mini-card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty("--card-x",`${e.clientX-r.left}px`);
    card.style.setProperty("--card-y",`${e.clientY-r.top}px`);
  });
});

let soundOn=false;
const soundBtn=document.createElement("button");
soundBtn.className="sound-toggle magnetic";
soundBtn.type="button";
soundBtn.textContent="🔇";
soundBtn.title="Activer/désactiver les petits sons";
document.body.appendChild(soundBtn);

function blip(){
  if(!soundOn) return;
  try{
    const ac=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ac.createOscillator();
    const gain=ac.createGain();
    osc.type="sine";
    osc.frequency.value=520;
    gain.gain.value=.025;
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.07);
    osc.stop(ac.currentTime+.08);
  }catch(e){}
}
soundBtn.addEventListener("click",()=>{
  soundOn=!soundOn;
  soundBtn.textContent=soundOn?"🔊":"🔇";
  blip();
});
document.querySelectorAll(".btn,.project-card,.doc-card,.mini-card").forEach(el=>el.addEventListener("mouseenter",blip));

let typed="";
const egg=document.createElement("div");
egg.className="egg";
egg.textContent="Documentation unlocked: GDD mode activated.";
document.body.appendChild(egg);
addEventListener("keydown",e=>{
  typed=(typed+e.key.toLowerCase()).slice(-12);
  if(typed.includes("gdd")){
    egg.classList.add("show");
    setTimeout(()=>egg.classList.remove("show"),2200);
  }
});

const lightboxV4=document.querySelector(".lightbox");
if(lightboxV4){
  const galleryImgs=[...document.querySelectorAll(".gallery img")];
  const lbImg=lightboxV4.querySelector("img");
  let currentIndex=0;
  function openLb(i){currentIndex=i;lbImg.src=galleryImgs[currentIndex].src;lightboxV4.classList.add("show")}
  function closeLb(){lightboxV4.classList.remove("show")}
  function moveLb(dir){if(!lightboxV4.classList.contains("show"))return;currentIndex=(currentIndex+dir+galleryImgs.length)%galleryImgs.length;lbImg.src=galleryImgs[currentIndex].src}
  galleryImgs.forEach((g,i)=>g.addEventListener("click",e=>{e.stopPropagation();openLb(i)}));
  addEventListener("keydown",e=>{
    if(e.key==="Escape")closeLb();
    if(e.key==="ArrowRight")moveLb(1);
    if(e.key==="ArrowLeft")moveLb(-1);
  });
}
