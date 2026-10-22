/* MCH roaming cats: one cat per page, each with its own habit.
   Home keeps Ink on the hero frame. Every other page gets one of these,
   living along the bottom edge of the screen:
     Noir    patrols the edge end to end, stops to stare when you come close
     Pixel   stalks your cursor, wiggles, pounces
     Mochi   naps in a loaf, wakes with a yawn when you get near, dozes off again
     Mishri  hides below the edge, peeks up when you stop scrolling, ducks when you move
   Tap a cat to hear it talk (lip-synced). Needs mch-cats.js. */
(function () {
  'use strict';
  if (!window.MCHCats || window.__mchRoam) return;
  window.__mchRoam = true;
  const path = (location.pathname.replace(/\/mch-v2/, '').replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '')) || '/';
  if (path === '/') return; // Ink's page

  const CAST = {
    noir: { name: 'Noir', habit: 'patrol', line: "I'm Noir. I don't chase things. I wait until they come to me... and they always do.", audio: '/mch-v2/assets/cat-noir.mp3' },
    pixel: { name: 'Pixel', habit: 'stalk', line: 'Pixel here. Eight bits, nine lives, zero bugs. Well... maybe one bug. I ate it.', audio: '/mch-v2/assets/cat-pixel.mp3' },
    mochi: { name: 'Mochi', habit: 'nap', line: "Hi! I'm Mochi. I'm round on purpose. More of me to love, and more of me to sit on your keyboard.", audio: '/mch-v2/assets/cat-mochi.mp3' },
    mishri: { name: 'Mishri', habit: 'peek', line: "Mishri. White as sugar, twice as sweet. Don't scroll so fast, I was hiding.", audio: '/mch-v2/assets/cat-mishri.mp3' },
  };
  // one cat per page; case studies share the cast, picked by name so a page always gets the same cat
  const MAP = {
    '/work': 'noir', '/lab': 'pixel', '/services': 'mochi', '/journal': 'mishri',
    '/updates': 'pixel', '/studio-notes': 'mochi', '/tales-of-meow': 'mishri', '/50-shades-of-meow': 'noir',
    '/tech-misc-larp': 'pixel', '/privacy': 'mochi', '/lab/skills': 'mishri',
  };
  const ORDER = ['noir', 'pixel', 'mochi', 'mishri'];
  let id = MAP[path];
  if (!id) { let h = 7; for (const c of path) h = (h * 31 + c.charCodeAt(0)) >>> 0; id = ORDER[h % ORDER.length]; }
  const who = CAST[id];

  const css = document.createElement('style');
  css.textContent = `#roamcat{position:fixed;left:0;bottom:0;width:100vw;height:230px;pointer-events:none;z-index:45}
#roambtn{position:fixed;left:0;top:0;width:96px;height:120px;z-index:46;background:none;border:0;padding:0;cursor:pointer;border-radius:40px}
#roambtn:focus-visible{outline:2px solid var(--violet,#a98cf5);outline-offset:2px}
#roamcap{position:fixed;left:0;top:0;z-index:47;max-width:min(320px,70vw);margin:0;padding:10px 14px 11px;border-radius:14px 14px 14px 3px;background:var(--paper,#15131c);color:var(--ink,#ece6f7);border:1px solid var(--line,#2a2636);font-size:14px;line-height:1.4;box-shadow:0 8px 30px rgba(0,0,0,.25);opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s;pointer-events:none}
#roamcap.on{opacity:1;transform:none}#roamcap b{display:block;font-family:var(--pix,monospace);font-size:12px;letter-spacing:.04em;color:var(--violet,#a98cf5);margin-bottom:3px}
#roamzz{position:fixed;left:0;top:0;z-index:46;pointer-events:none;font-family:var(--pix,monospace);color:var(--ink2,#9b93ad);font-size:15px;opacity:0;transition:opacity .6s}
@media print{#roamcat,#roambtn,#roamcap,#roamzz{display:none}}`;
  document.head.appendChild(css);
  const cv = document.createElement('canvas'); cv.id = 'roamcat'; cv.setAttribute('aria-hidden', 'true');
  const btn = document.createElement('button'); btn.id = 'roambtn'; btn.type = 'button'; btn.setAttribute('aria-label', `${who.name}, the studio cat. Tap to hear ${who.name} talk`);
  const cap = document.createElement('p'); cap.id = 'roamcap'; cap.setAttribute('aria-live', 'polite');
  const zz = document.createElement('span'); zz.id = 'roamzz'; zz.textContent = 'z z z';
  const au = new Audio(); au.preload = 'none'; au.src = who.audio;
  document.body.append(cv, btn, cap, zz);

  const phone = () => innerWidth < 700;
  const scaleNow = () => (phone() ? 0.42 : 0.62);
  // stay clear of the music switch on the right
  const lane = () => ({ x0: 28, x1: Math.max(200, innerWidth - (phone() ? 120 : 190)) });
  let peekY = 0; // 0 hidden, 1 fully up (Mishri)
  const place = (c) => {
    const s = scaleNow(), L = lane(), h = cv.clientHeight;
    let y = h - 12;
    if (who.habit === 'peek') {
      const S = c.k.sit, show = (S.head * 1.25 + 20) * s; // head and paws above the edge
      y = h + (S.h * s) - show * peekY + 4;
      c.edgeY = peekY > 0.02 ? (h - 3 - y) / s : null;
    }
    return { x0: L.x0, x1: L.x1, y, scale: s };
  };
  const cat = new MCHCats.Cat(cv, id, { place, shadow: who.habit !== 'peek', range: [0.02, 0.98] });
  const reduced = cat.reduced;

  // ---- talking, lip-synced
  let actx, an, data, talking = false;
  function mouth() { if (!talking) return; an.getFloatTimeDomainData(data); let q = 0; for (const v of data) q += v * v; cat.mouthT = Math.min(1, Math.max(0, (Math.sqrt(q / data.length) - 0.012) * 9)); requestAnimationFrame(mouth); }
  async function talk() {
    if (talking) { au.pause(); done(); return; }
    wake(); cat.poke(); cat.bubble = 0;
    try { actx = actx || new AudioContext(); if (!an) { const src = actx.createMediaElementSource(au); an = actx.createAnalyser(); an.fftSize = 1024; an.smoothingTimeConstant = 0.2; src.connect(an); an.connect(actx.destination); data = new Float32Array(an.fftSize); } await actx.resume(); } catch (e) { /* plays without lip sync */ }
    const bg = [...document.querySelectorAll('audio')].find((a) => !a.paused); bgVol = bg ? bg.volume : 1; bgEl = bg; if (bg) bg.volume = bgVol * 0.3;
    cap.innerHTML = `<b>${who.name}</b>${who.line}`; cap.classList.add('on');
    talking = true; cat.talking = true; au.currentTime = 0;
    try { await au.play(); if (an) mouth(); } catch (e) { setTimeout(done, 3500); }
  }
  let bgVol = 1, bgEl = null;
  function done() { talking = false; cat.talking = false; cat.mouthT = 0; if (bgEl) bgEl.volume = bgVol; bgEl = null; setTimeout(() => { if (!talking) cap.classList.remove('on'); }, 1600); }
  au.addEventListener('ended', done);
  btn.addEventListener('click', talk);

  // ---- what the page is doing
  let mx = -1e4, my = -1e4, lastMove = 0, lastScroll = 0, scrollV = 0, lastY = scrollY;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; lastMove = performance.now(); cat.pointer(mx, my); }, { passive: true });
  addEventListener('scroll', () => { const now = performance.now(); scrollV = Math.abs(scrollY - lastY); lastY = scrollY; lastScroll = now; cat.lookT.y = -0.9; }, { passive: true });
  addEventListener('resize', () => cat.resize());
  const xFrac = (px) => { const L = lane(); return (px - L.x0) / (L.x1 - L.x0); };
  const near = (r) => Math.hypot(mx - cat.anchor.x, my - (innerHeight - 60)) < r;

  // ---- habits
  let mode = 'idle', until = 0, sleepAt = 0, caught = -1;
  function wake() { if (who.habit === 'nap' && cat.loaf > 0.5) { mode = 'yawn'; until = performance.now() + 1100; } if (who.habit === 'peek') { mode = 'up'; until = performance.now() + 6000; } }
  const H = {
    patrol(now) { // end to end, a stop to stare whenever you come close
      if (talking) { cat.pose = 'sit'; cat.goal = null; return; }
      if (near(170) && mode !== 'stare') { mode = 'stare'; cat.goal = null; cat.pose = 'sit'; until = now + 2600; cat.earL = cat.earR = 1; }
      if (mode === 'stare') { if (now > until && !near(170)) mode = 'idle'; return; }
      if (cat.pose === 'sit' && now > until) {
        cat.run = 0.85; cat.walkTo(cat.x < 0.5 ? 0.9 + Math.random() * 0.08 : 0.02 + Math.random() * 0.08);
        until = now + 4000 + Math.random() * 5000; // sits a while at each end
      }
      if (scrollV > 60 && cat.pose === 'walk') { cat.goal = null; cat.pose = 'sit'; until = now + 1800; scrollV = 0; } // a big scroll startles him into sitting
    },
    stalk(now) { // tracks the cursor along the edge, crouches, wiggles, pounces
      if (talking) { cat.crouch = Math.max(0, cat.crouch - 0.05); cat.pose = 'sit'; cat.goal = null; return; }
      const fx = xFrac(mx), active = now - lastMove < 9000 && mx > -1e3;
      if (mode === 'crouch') {
        cat.crouch = Math.min(1, cat.crouch + 0.06);
        if (now > until) { mode = 'pounce'; cat.crouch = 0; cat.run = 4.2; cat.walkTo(fx); }
        return;
      }
      if (mode === 'pounce') { if (cat.pose === 'sit') { mode = 'idle'; cat.run = 1; caught = lastMove; cat.word = 'MEOW'; cat.bubble = 1.6; until = now + 1500; } return; }
      cat.crouch = Math.max(0, cat.crouch - 0.04);
      if (!active || now < until) return;
      const d = fx - cat.x;
      if (Math.abs(d) > 0.14) { cat.run = Math.abs(d) > 0.35 ? 3.6 : 2.2; cat.walkTo(fx - Math.sign(d) * 0.06); }
      else if (cat.pose === 'sit' && caught !== lastMove && my > innerHeight * 0.55 && now - lastMove > 450) { mode = 'crouch'; until = now + 900; cat.goal = null; }
    },
    nap(now) { // a loaf in the corner; wakes with a yawn, dozes off when you leave
      const target = mode === 'sleep' ? 1 : 0;
      cat.loaf += (target - cat.loaf) * 0.04;
      if (mode === 'idle') { mode = 'sleep'; cat.x = 0.04; }
      if (mode === 'sleep') { if (near(150) || talking) { mode = 'yawn'; until = now + 1100; } }
      else if (mode === 'yawn') { cat.mouthT = talking ? cat.mouthT : 0.85; cat.squint = 1; if (now > until) { cat.mouthT = 0; cat.squint = 0; mode = 'awake'; sleepAt = now + 6000; } }
      else if (mode === 'awake') {
        if (near(150) || talking) sleepAt = now + 6000;
        if (now > sleepAt && cat.pose === 'sit') {
          if (Math.random() < 0.4) { cat.walkTo(Math.random() * 0.9); mode = 'wander'; } else mode = 'sleep';
        }
      } else if (mode === 'wander' && cat.pose === 'sit') mode = 'sleep';
      zz.style.opacity = cat.loaf > 0.85 && !reduced ? 1 : 0;
      if (cat.loaf > 0.5) { const s = cat.scale(); zz.style.transform = `translate(${cat.anchor.x + 26 * s}px,${innerHeight - cv.clientHeight + cat.anchor.y - 135 * s - (now / 60) % 18}px)`; }
    },
    peek(now) { // under the edge; up when the page is still, down when it moves
      const still = now - lastScroll > 1400;
      if (mode === 'idle' && still && now > until) { mode = 'up'; cat.x = 0.12 + Math.random() * 0.76; until = now + 7000 + Math.random() * 6000; }
      if (mode === 'up') {
        if (!still && !talking) { mode = 'idle'; until = now + 900; }
        else if (now > until && !talking && !near(160)) { mode = 'idle'; until = now + 5000 + Math.random() * 6000; }
      }
      const want = mode === 'up' ? 1 : 0;
      peekY += (want - peekY) * (want ? 0.06 : 0.22);
      if (peekY < 0.03 && !want) peekY = 0;
    },
  };

  // ---- loop
  let last = performance.now();
  if (who.habit === 'nap') { cat.loaf = 1; mode = 'sleep'; cat.x = 0.04; }
  else if (who.habit === 'patrol') { cat.x = 0.1; until = performance.now() + 2500; }
  else if (who.habit === 'stalk') cat.x = 0.6;
  if (reduced && who.habit === 'peek') peekY = 1;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!reduced) H[who.habit](now);
    cat.lookT.y *= 0.96;
    cat.step(dt); cat.draw();
    // the tap target follows the cat
    const s = cat.scale(), a = cat.anchor, top = innerHeight - cv.clientHeight;
    const hidden = who.habit === 'peek' && peekY < 0.4;
    const bh = (who.habit === 'peek' ? 90 : 175 * (1 - 0.4 * cat.loaf)) * s / 0.62, bw = 110 * s / 0.62;
    btn.style.transform = `translate(${a.x - bw / 2}px,${top + Math.min(a.y, cv.clientHeight) - bh}px)`;
    btn.style.width = bw + 'px'; btn.style.height = bh + 'px';
    btn.style.visibility = hidden ? 'hidden' : 'visible';
    const cw = cap.offsetWidth || 260;
    cap.style.left = Math.max(12, Math.min(innerWidth - cw - 12, a.x - 30)) + 'px';
    cap.style.top = Math.max(70, top + Math.min(a.y, cv.clientHeight) - bh - cap.offsetHeight - 10) + 'px';
    requestAnimationFrame(frame);
  }
  cat.resize();
  requestAnimationFrame(frame);
  window.MCHRoam = { cat, id, habit: who.habit, get mode() { return mode; }, get peek() { return peekY; } };
})();
