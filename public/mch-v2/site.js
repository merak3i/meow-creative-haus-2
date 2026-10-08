(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hover=matchMedia('(hover:hover)').matches;
const MCH=window.MCH={clamp,ease,reduce,T:{}};

/* theme tokens for canvases */
const listeners=[];MCH.onTheme=f=>listeners.push(f);
function readTokens(){const cs=getComputedStyle(document.documentElement);['paper','paper2','ink','ink2','line','violet','violet2','lilac','graphite','onaccent'].forEach(k=>MCH.T[k]=cs.getPropertyValue('--'+k).trim());listeners.forEach(f=>f());}
readTokens();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',readTokens);
new MutationObserver(readTokens).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

/* nav */
const nav=$('#nav'),burger=$('#burger');
if(burger){burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded','false');}));}

/* broken image fallback */
$$('.media img').forEach(img=>{const f=()=>img.closest('.media').classList.add('noimg');if(img.complete&&img.naturalWidth===0)f();img.addEventListener('error',f);});

/* copy email */
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.copy;const el=document.getElementById(b.dataset.target);
  const done=()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1600);};
  const sel=()=>{if(!el)return;const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected';setTimeout(()=>b.textContent='Copy',1600);};
  try{navigator.clipboard.writeText(t).then(done,sel);}catch(_){sel();}}));

/* work filters */
const fbar=$('#filters');
if(fbar){const cards=$$('.wcard[data-disc]'),cnt=$('#wcount');
  const apply=d=>{let n=0;cards.forEach(c=>{const on=d==='all'||c.dataset.disc.split('|').includes(d);c.hidden=!on;if(on)n++;});
    $$('#filters button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===d));if(cnt)cnt.textContent=n+(n===1?' project':' projects');};
  fbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;apply(b.dataset.f);});
  const h=location.hash.replace('#','');apply(h&&$$('#filters button').some(b=>b.dataset.f===h)?h:'all');}

/* skills filter */
const sbar=$('#sfilters');
if(sbar){const items=$$('.skill[data-tag]');
  sbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset.f;
    items.forEach(i=>i.hidden=!(d==='all'||i.dataset.tag===d));$$('#sfilters button').forEach(x=>x.setAttribute('aria-pressed',x===b));});}

/* ruler + frame names */
const frames=$$('[data-frame]'),frameName=$('#frameName'),ruler=$('.ruler');
const sel=$('#sel'),selLab=sel?sel.querySelector('span'):null,you=$('#you');let selEl=null;
function placeSel(){if(!selEl||!sel)return;const r=selEl.getBoundingClientRect();sel.style.transform=`translate(${r.left}px,${r.top}px)`;sel.style.width=r.width+'px';sel.style.height=r.height+'px';selLab.textContent=`${selEl.dataset.sel}  ${Math.round(r.width)} × ${Math.round(r.height)}`;}
function onScroll(){if(ruler)ruler.style.setProperty('--rx',(-scrollY*.5)+'px');
  if(frames.length&&frameName){let cur=frames[0];frames.forEach(f=>{if(f.getBoundingClientRect().top<innerHeight*.35)cur=f;});frameName.textContent=cur.dataset.frame;}
  placeSel();}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* selection box + named cursor */
if(hover&&sel){
  $$('[data-sel]').forEach(el=>{el.addEventListener('mouseenter',()=>{selEl=el;placeSel();sel.classList.add('on');});el.addEventListener('mouseleave',()=>{selEl=null;sel.classList.remove('on');});});
  let mx=0,my=0,yx=0,yy=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;you.style.opacity=1;});
  document.addEventListener('mouseleave',()=>you.style.opacity=0);
  const tick=()=>{yx+=(mx-yx)*(reduce?1:.25);yy+=(my-yy)*(reduce?1:.25);you.style.transform=`translate(${yx+14}px,${yy+16}px)`;requestAnimationFrame(tick);};tick();
}

/* theme toggle */
const tb=$('#theme'),root=document.documentElement,mqDark=matchMedia('(prefers-color-scheme: dark)');
const curTheme=()=>root.dataset.theme||(mqDark.matches?'dark':'light');
function showTheme(){if(!tb)return;const c=curTheme();tb.querySelector('span').textContent=c==='dark'?'Dark':'Light';tb.setAttribute('aria-label',`Theme: ${c}. Switch to ${c==='dark'?'light':'dark'}`);}
if(tb){showTheme();mqDark.addEventListener('change',showTheme);
  tb.addEventListener('click',()=>{const n=curTheme()==='dark'?'light':'dark';root.classList.add('theming');root.setAttribute('data-theme',n);try{localStorage.setItem('mch-theme',n);}catch(_){}showTheme();setTimeout(()=>root.classList.remove('theming'),500);});}

/* pinned page heroes */
const pins=$$('.phero.pin');
const pinOff=matchMedia('(max-width:900px),(max-height:620px)');
function pinFit(){pins.forEach(s=>{s.classList.remove('nopin');const st=s.querySelector('.pstage');s.classList.toggle('nopin',pinOff.matches||reduce||st.scrollHeight>innerHeight+2);});pinUpdate();}
MCH.pinP=s=>{if(!s||s.classList.contains('nopin'))return null;const r=s.getBoundingClientRect(),d=s.offsetHeight-innerHeight;return d>0?clamp(-r.top/d):0;};
function pinUpdate(){pins.forEach(s=>{let p=MCH.pinP(s);if(p===null)p=clamp(scrollY/(innerHeight*.75));s.style.setProperty('--pp',p.toFixed(4));const i=p<.3?0:p<.62?1:2;s.querySelectorAll('.psteps span').forEach((e,k)=>e.classList.toggle('on',k<=i));});}
if(pins.length){addEventListener('scroll',pinUpdate,{passive:true});addEventListener('resize',pinFit);addEventListener('load',pinFit);pinFit();}

/* scroll-scrubbed sections */
if(!reduce){
  const sc=$$('main .frame .head h2, main .frame .ftag, .wcard, .card, .case, .rows>a, .skill, .svc>*, .site, .stats>*, .gallery>*, .faq details, .acc details, .meta3>*, .fgrid>*').filter(el=>!el.closest('#hero')&&!el.closest('.phero'));
  const slabs=$$('main .slab').filter(el=>!el.closest('#hero'));
  sc.forEach(el=>{el.classList.add('sc');const sib=el.parentElement?[...el.parentElement.children].indexOf(el):0;el._lag=(sib%4)*.06;});
  slabs.forEach(el=>el.classList.add('scs'));
  let ticking=false;
  function scrub(){ticking=false;const vh=innerHeight,end=clamp(1-(document.documentElement.scrollHeight-scrollY-vh)/160);
    sc.forEach(el=>{const r=el.getBoundingClientRect();if(r.top>vh*1.25||r.bottom<-200)return;el.style.setProperty('--s',Math.max(r.top<vh?end:0,clamp((vh-r.top)/(vh*.32)-el._lag*3)).toFixed(3));});
    slabs.forEach(el=>{const r=el.getBoundingClientRect();if(r.top>vh*1.25||r.bottom<-200)return;el.style.setProperty('--s',Math.max(r.top<vh?end:0,clamp((vh-r.top)/(vh*.55))).toFixed(3));});}
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(scrub);}},{passive:true});addEventListener('resize',scrub);scrub();
}

/* margin notes: one unique line per box, on hover */
const zq=$('#zq'),zd=$('#zqdata');
if(hover&&zq&&zd){
  let data=[];try{data=JSON.parse(zd.textContent);}catch(_){}
  const UNION='main > section, main .slab, footer, footer .fgrid>*, .wcard, .card, .case, .rows>a, .skill, .svc, .site, .stats>*, .gallery>*, .faq details, .acc details, .meta3>*, .portrait';
  const boxes=$$(UNION);
  if(boxes.length===data.length){
    const BUSY='.nav, input, textarea, select, button, .btn, .pill, .link, .go, .chip, .filters, #theme';
    const p=zq.querySelector('p'),ct=zq.querySelector('cite'),num=$('#zqn');
    let cur=null,timer=0,mx=0,my=0,zx=0,zy=0,running=false;
    function setQuote(box){const [t,src,gid,tot]=data[boxes.indexOf(box)];clearTimeout(timer);
      p.innerHTML=t.split(' ').map(w=>`<i>${w}</i>`).join(' ');ct.textContent=src||'Overheard at the studio';
      num.textContent=String(gid).padStart(3,'0')+'/'+tot;zq.classList.toggle('dk',!!box.closest('.slab'));
      const ws=[...p.querySelectorAll('i')];let k=0;const step=()=>{if(k<ws.length){ws[k++].classList.add('v');timer=setTimeout(step,reduce?0:30);}};step();}
    function place(){const w=zq.offsetWidth,h=zq.offsetHeight;let x=zx+18,y=zy+46;if(x+w>innerWidth-12)x=zx-w-18;if(y+h>innerHeight-12)y=zy-h-18;zq.style.transform=`translate(${Math.round(x)}px,${Math.round(y)}px)`;}
    function loop(){zx+=(mx-zx)*(reduce?1:.14);zy+=(my-zy)*(reduce?1:.14);place();if(Math.abs(mx-zx)+Math.abs(my-zy)>.5)requestAnimationFrame(loop);else running=false;}
    function over(t){if(!t||!t.closest)return null;if(t.closest(BUSY))return null;return t.closest(UNION);}
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;const box=over(e.target);
      if(!box){zq.classList.remove('on');cur=null;return;}
      if(box!==cur){if(!cur){zx=mx;zy=my;}cur=box;setQuote(box);}
      zq.classList.add('on');if(!running){running=true;requestAnimationFrame(loop);}},{passive:true});
    document.addEventListener('mouseleave',()=>{zq.classList.remove('on');cur=null;});
    addEventListener('scroll',()=>{const b=over(document.elementFromPoint(mx,my));if(b!==cur){zq.classList.remove('on');cur=null;}},{passive:true});
  }
}

/* ---------- shared sketch engine ---------- */
const nz=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return (x-Math.floor(x))*2-1;};
MCH.nz=nz;
function rectPts(x,y,w,h,seed,j){const pts=[],seg=5,c=[[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]];
  for(let s=0;s<4;s++){const [ax,ay]=c[s],[bx,by]=c[s+1];for(let i=0;i<seg;i++){const t=i/seg;pts.push([ax+(bx-ax)*t+nz(seed+s*13+i)*j,ay+(by-ay)*t+nz(seed+s*13+i+71)*j]);}}
  pts.push([x+nz(seed+4)*j,y+nz(seed+3)*j]);pts.push([x+w*.06+nz(seed+5)*j,y+nz(seed+6)*j*1.4]);return pts;}
function partial(g,pts,a){if(a<=0)return;const L=a*(pts.length-1),n=Math.floor(L),f=L-n;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);
  for(let i=0;i<n&&i<pts.length-1;i++)g.lineTo(pts[i+1][0],pts[i+1][1]);
  if(n<pts.length-1){const A=pts[n],B=pts[n+1];g.lineTo(A[0]+(B[0]-A[0])*f,A[1]+(B[1]-A[1])*f);}g.stroke();}
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect?g.roundRect(x,y,w,h,r):g.rect(x,y,w,h);}
function art(g,x,y,w,h,v,a,time){const T=MCH.T;if(a<=0)return;g.save();g.globalAlpha=a;rr(g,x,y,w,h,Math.min(w,h)*.04);g.clip();
  const gr=g.createLinearGradient(x,y,x,y+h);gr.addColorStop(0,T.lilac);gr.addColorStop(1,T.violet2);g.fillStyle=gr;g.fillRect(x,y,w,h);
  const sx=x+w*(.28+.18*((v*37)%3)/2),sy=y+h*(.32+.08*(v%2));g.fillStyle=T.paper;g.beginPath();g.arc(sx,sy,Math.min(w,h)*.16,0,Math.PI*2);g.fill();
  g.fillStyle=T.violet;g.globalAlpha=a*.9;g.beginPath();g.moveTo(x,y+h*.72);
  for(let i=0;i<=12;i++){const px=x+w*i/12;g.lineTo(px,y+h*(.68+.05*Math.sin(i*.9+v*1.7+(reduce?0:time*.0006))));}
  g.lineTo(x+w,y+h);g.lineTo(x,y+h);g.closePath();g.fill();g.restore();}
function scribble(g,x,y,w,h,j,a,seed,bold){if(a<=0)return;const n=Math.max(6,Math.round(w/8));const cy=y+h/2;g.beginPath();
  for(let i=0;i<=n*a;i++){const t=i/n;const px=x+w*t,py=cy+Math.sin(t*n*1.7+seed)*h*.45*j+nz(seed+i)*h*.15*j;i?g.lineTo(px,py):g.moveTo(px,py);}
  g.lineWidth=bold?2:1.1;g.stroke();}
MCH.draw={rectPts,partial,rr,art,scribble};

/* page layouts for the inner-page boards */
const NAV=[{k:'box',r:[.03,.04,.94,.08]},{k:'text',r:[.06,.07,.08,.024],bold:1},{k:'text',r:[.58,.075,.07,.014]},{k:'text',r:[.67,.075,.07,.014]},{k:'btn',r:[.8,.058,.14,.046],acc:1}];
const L={
 work:[...NAV,{k:'text',r:[.06,.19,.5,.06],bold:1},
   {k:'card',r:[.06,.32,.27,.29],v:1},{k:'card',r:[.365,.32,.27,.29],v:2},{k:'card',r:[.67,.32,.27,.29],v:3},
   {k:'card',r:[.06,.65,.27,.29],v:4},{k:'card',r:[.365,.65,.27,.29],v:5},{k:'card',r:[.67,.65,.27,.29],v:6}],
 list:[...NAV,{k:'text',r:[.06,.2,.56,.07],bold:1},{k:'text',r:[.06,.3,.4,.016]},
   {k:'row',r:[.06,.4,.88,.12]},{k:'row',r:[.06,.54,.88,.12]},{k:'row',r:[.06,.68,.88,.12]},{k:'slab',r:[.06,.83,.88,.12]}],
 lab:[...NAV,{k:'text',r:[.06,.2,.44,.07],bold:1},{k:'slab',r:[.06,.33,.88,.3]},
   {k:'card',r:[.06,.67,.27,.27],v:2},{k:'card',r:[.365,.67,.27,.27],v:3},{k:'card',r:[.67,.67,.27,.27],v:4}],
 doc:[...NAV,{k:'text',r:[.18,.2,.4,.07],bold:1},...Array.from({length:9},(_,i)=>({k:'text',r:[.18,.33+i*.055,.64-(i%3)*.12,.016]})),{k:'slab',r:[.18,.84,.64,.1]}],
 case:[...NAV,{k:'text',r:[.06,.19,.36,.07],bold:1},{k:'text',r:[.06,.29,.3,.016]},{k:'btn',r:[.06,.34,.14,.05],acc:1},
   {k:'img',r:[.5,.17,.44,.27],v:0},{k:'slab',r:[.06,.49,.88,.16]},
   {k:'img',r:[.06,.69,.27,.25],v:2},{k:'img',r:[.365,.69,.27,.25],v:3},{k:'img',r:[.67,.69,.27,.25],v:4}],
 timeline:[...NAV,{k:'text',r:[.06,.2,.5,.07],bold:1},{k:'slab',r:[.06,.32,.88,.18]},
   ...Array.from({length:4},(_,i)=>({k:'row',r:[.06,.54+i*.105,.88,.09]}))],
};
function board(cv){const g=cv.getContext('2d');let W=0,H=0;const lay=L[cv.dataset.layout]||L.list;const t0=performance.now();let time=0;
  function size(){const d=Math.min(devicePixelRatio||1,2);const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=Math.round(W*d);cv.height=Math.round(H*d);g.setTransform(d,0,0,d,0,0);}
  size();addEventListener('resize',size);
  function frame(now){time=now;const T=MCH.T;g.clearRect(0,0,W,H);
    const intro=reduce?1:ease(clamp((now-t0)/1400));
    const pp=MCH.pinP(cv.closest('.phero.pin'));const p=pp===null?clamp(scrollY/(innerHeight*.75)):clamp(pp/.92);
    const sk=clamp(.25+intro*.55+p*1.6), k=ease(clamp((p-.12)/.32)), f=ease(clamp((p-.36)/.4));
    const pad=2,B={x:pad,y:pad,w:W-pad*2,h:H-pad*2},j=(1-k)*B.w*.012;
    g.fillStyle=T.paper;g.globalAlpha=.4+.6*f;rr(g,B.x,B.y,B.w,B.h,6);g.fill();g.globalAlpha=1;
    g.strokeStyle=T.graphite;g.lineWidth=1;g.globalAlpha=.3+.4*(1-f);partial(g,rectPts(B.x,B.y,B.w,B.h,3,j),clamp(sk*1.6));g.globalAlpha=1;
    const ga=k*(1-f*.8);if(ga>0){const cols=12,gut=B.w*.012,cw=(B.w*.88-gut*11)/12;for(let c=0;c<cols;c++){const cx=B.x+B.w*.06+c*(cw+gut);g.fillStyle=T.violet;g.globalAlpha=ga*.06;g.fillRect(cx,B.y+B.h*.04,cw,B.h*.92*clamp(k*1.4-c*.03));}g.globalAlpha=1;}
    lay.forEach((e,i)=>{const [rx,ry,rw,rh]=e.r;const x=B.x+rx*B.w,y=B.y+ry*B.h,w=rw*B.w,h=rh*B.h;const a=clamp((sk*1.3-i/lay.length*.8)/.3);if(a<=0)return;const seed=i*31+7;
      g.strokeStyle=T.graphite;g.lineWidth=1.1;g.globalAlpha=.9-.55*f;
      if(e.k==='text'){if(f<1){g.globalAlpha=.85*(1-f);scribble(g,x,y,w,h,1-k,a,seed,e.bold);}
        if(f>0){g.globalAlpha=f;g.fillStyle=e.bold?T.ink:T.graphite;rr(g,x,y+(e.bold?0:h*.15),w,e.bold?h*.82:h*.7,e.bold?3:h);g.fill();}return;}
      if(e.k==='row'){g.globalAlpha=(.9-.55*f);g.beginPath();g.moveTo(x,y+h);g.lineTo(x+w*a,y+h+nz(seed)*j);g.stroke();
        if(f<1){g.globalAlpha=.8*(1-f);scribble(g,x,y+h*.25,w*.12,h*.2,1-k,a,seed);scribble(g,x+w*.22,y+h*.2,w*.5,h*.3,1-k,a,seed+5,1);}
        if(f>0){g.globalAlpha=f;g.fillStyle=T.graphite;rr(g,x,y+h*.3,w*.1,h*.14,h);g.fill();g.fillStyle=T.ink;rr(g,x+w*.22,y+h*.22,w*.45,h*.26,3);g.fill();g.fillStyle=T.graphite;rr(g,x+w*.22,y+h*.6,w*.35,h*.12,h);g.fill();g.fillStyle=T.violet;g.beginPath();g.arc(x+w*.97,y+h*.38,h*.12,0,Math.PI*2);g.fill();}
        return;}
      partial(g,rectPts(x,y,w,h,seed,j),a);
      if(e.k==='img'&&f<1){g.globalAlpha=(1-f)*.55*a;g.beginPath();g.moveTo(x,y);g.lineTo(x+w*a,y+h*a);g.moveTo(x+w,y);g.lineTo(x+w-w*a,y+h*a);g.stroke();}
      if(f>0){g.globalAlpha=f;
        if(e.k==='box'){g.fillStyle=T.paper2;rr(g,x,y,w,h,4);g.fill();}
        if(e.k==='btn'){g.fillStyle=e.acc?T.violet:T.paper;rr(g,x,y,w,h,h/2);g.fill();g.fillStyle=T.onaccent;rr(g,x+w*.22,y+h*.42,w*.56,h*.16,2);g.fill();}
        if(e.k==='img')art(g,x,y,w,h,e.v||0,f,time);
        if(e.k==='card'){g.fillStyle=T.paper;rr(g,x,y,w,h,4);g.fill();art(g,x+w*.06,y+h*.07,w*.88,h*.55,e.v||0,f,time);g.globalAlpha=f;g.fillStyle=T.ink;rr(g,x+w*.06,y+h*.7,w*.6,h*.08,2);g.fill();g.fillStyle=T.graphite;rr(g,x+w*.06,y+h*.83,w*.8,h*.05,2);g.fill();}
        if(e.k==='slab'){g.fillStyle='#15141b';rr(g,x,y,w,h,6);g.fill();g.fillStyle='#ab9eff';rr(g,x+w*.05,y+h*.3,w*.35,h*.18,3);g.fill();g.fillStyle='rgba(241,240,244,.6)';rr(g,x+w*.05,y+h*.6,w*.5,h*.1,h);g.fill();g.fillStyle='#ab9eff';rr(g,x+w*.78,y+h*.36,w*.16,h*.28,h);g.fill();}
      }
      g.globalAlpha=1;});
    if(intro<1||cv.getBoundingClientRect().bottom>0&&cv.getBoundingClientRect().top<innerHeight)requestAnimationFrame(frame);else requestAnimationFrame(idle);
  }
  function idle(){if(cv.getBoundingClientRect().bottom>0&&cv.getBoundingClientRect().top<innerHeight)requestAnimationFrame(frame);else setTimeout(()=>requestAnimationFrame(idle),200);}
  MCH.onTheme(()=>{});requestAnimationFrame(frame);
}
$$('canvas[data-layout]').forEach(board);

/* ---------- mini build screens ---------- */
function drawMinis(){const T=MCH.T;$$('canvas[data-ui]').forEach(c=>{const d=Math.min(devicePixelRatio||1,2),r=c.getBoundingClientRect();if(!r.width)return;c.width=r.width*d;c.height=r.height*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);const w=r.width,h=r.height,t=c.dataset.ui;
  const R=(a,b,cw,ch,rad,col)=>{x.fillStyle=col;x.beginPath();x.roundRect?x.roundRect(a,b,cw,ch,rad):x.rect(a,b,cw,ch);x.fill();};
  x.clearRect(0,0,w,h);
  if(t==='chat'){R(0,0,w*.26,h,0,T.paper);for(let i=0;i<5;i++)R(w*.04,h*(.1+i*.14),w*.18,h*.06,3,i===1?T.violet:T.line);
    R(w*.32,h*.12,w*.42,h*.13,8,T.paper);R(w*.48,h*.32,w*.46,h*.13,8,T.violet);R(w*.32,h*.52,w*.36,h*.13,8,T.paper);R(w*.3,h*.8,w*.64,h*.11,10,T.paper);R(w*.86,h*.82,w*.06,h*.07,6,T.violet);}
  if(t==='builder'){R(0,0,w,h*.1,0,T.paper);for(let i=0;i<3;i++)R(w*.04+i*w*.1,h*.03,w*.07,h*.04,2,T.line);R(w*.82,h*.025,w*.14,h*.05,8,T.violet);
    R(w*.04,h*.16,w*.2,h*.78,4,T.paper);for(let i=0;i<4;i++)R(w*.06,h*(.2+i*.17),w*.16,h*.13,3,i===0?T.lilac:T.line);
    R(w*.28,h*.16,w*.68,h*.78,4,T.paper);R(w*.32,h*.21,w*.6,h*.3,3,T.lilac);R(w*.32,h*.56,w*.4,h*.06,2,T.ink);R(w*.32,h*.66,w*.52,h*.035,2,T.line);R(w*.32,h*.72,w*.46,h*.035,2,T.line);R(w*.32,h*.8,w*.16,h*.07,8,T.violet);}
  if(t==='story'){const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,T.lilac);gr.addColorStop(1,T.violet2);x.fillStyle=gr;x.fillRect(0,0,w,h);
    x.fillStyle=T.paper;x.beginPath();x.arc(w*.72,h*.3,h*.14,0,Math.PI*2);x.fill();
    x.fillStyle=T.ink;const cx=w*.34,cy=h*.66;x.beginPath();x.ellipse(cx,cy,w*.12,h*.15,0,0,Math.PI*2);x.fill();x.beginPath();x.arc(cx,cy-h*.2,h*.1,0,Math.PI*2);x.fill();
    x.beginPath();x.moveTo(cx-h*.09,cy-h*.25);x.lineTo(cx-h*.07,cy-h*.37);x.lineTo(cx-h*.02,cy-h*.28);x.fill();x.beginPath();x.moveTo(cx+h*.09,cy-h*.25);x.lineTo(cx+h*.07,cy-h*.37);x.lineTo(cx+h*.02,cy-h*.28);x.fill();
    x.strokeStyle=T.ink;x.lineWidth=h*.03;x.lineCap='round';x.beginPath();x.moveTo(cx+w*.1,cy+h*.1);x.quadraticCurveTo(cx+w*.26,cy+h*.12,cx+w*.22,cy-h*.08);x.stroke();
    R(0,h*.86,w,h*.14,0,T.ink);R(w*.05,h*.91,w*.18,h*.03,2,T.violet2);}
});}
drawMinis();addEventListener('load',drawMinis);addEventListener('resize',drawMinis);MCH.onTheme(drawMinis);
})();
