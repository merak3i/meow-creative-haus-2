/* MCH cats v2: one anatomical rig, four skins (Noir, Pixel, Mochi, Ink).
   Sit: breathing, blinks, cursor-tracking eyes with slit pupils, ear flicks,
   tail wrapped round the paws with a twitching tip, head tilt, tap reaction.
   Walk: lateral-sequence gait (hind, fore, hind, fore), three-segment legs on
   2-bone IK, digitigrade paws that plant and peel, rolling shoulder blades,
   spine flex, a head held steady against the bob, and a tail on springs.
   Fur: soft edge strands and a directional fur texture. Lip-sync mouth.
   Original characters drawn in code. No dependencies. */
(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => t * t * (3 - 2 * t);
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const polar = (len, ang) => [Math.cos(ang) * len, Math.sin(ang) * len];

  const SKINS = {
    noir: {
      name: 'Noir', mode: 'fill', fur: 1,
      coat: ['#5e4e74', '#33293f', '#211a2b'], belly: '#17121f', rim: 'rgba(190,165,225,.55)',
      furHi: 'rgba(205,185,240,.05)', furLo: 'rgba(0,0,0,.12)',
      inner: '#7a5a8e', iris: ['#eef59a', '#b9cc3c', '#6f7d16'], nose: '#2a1f2c', whisker: 'rgba(225,212,240,.55)',
      sit: { w: 46, h: 112, head: 46, ear: 1.0 },
      body: { len: 1.0, depth: 1.0, leg: 1.0, head: 1.0, tail: 1.0 },
      tail: { n: 20, seg: 6.2, w: 7.5 },
    },
    mochi: {
      name: 'Mochi', mode: 'fill', fur: 1.6,
      coat: ['#6e5964', '#3b2e37', '#251c23'], belly: '#1a1418', rim: 'rgba(235,195,170,.38)',
      furHi: 'rgba(255,225,205,.05)', furLo: 'rgba(0,0,0,.12)',
      inner: '#a06c84', iris: ['#ffe1a0', '#f0a83a', '#9a5a12'], nose: '#5a3442', whisker: 'rgba(250,230,220,.5)',
      collar: '#b79ae0', tag: '#f2c25a', round: true,
      sit: { w: 62, h: 98, head: 56, ear: 0.78 },
      body: { len: 0.86, depth: 1.38, leg: 0.74, head: 1.22, tail: 0.75 },
      tail: { n: 15, seg: 6, w: 11 },
    },
    ink: {
      name: 'Ink', mode: 'line', fur: 0.8,
      ink: '#ddd2ee', paper: '#15131c', lineW: 1.5, jitter: 0.9,
      inner: '#ddd2ee', iris: ['#f2f7b0', '#d9e86a', '#a3b22e'], nose: '#ddd2ee', whisker: 'rgba(221,210,238,.75)',
      sit: { w: 44, h: 118, head: 44, ear: 1.05 },
      body: { len: 1.05, depth: 0.95, leg: 1.04, head: 0.98, tail: 1.08 },
      tail: { n: 22, seg: 6.2, w: 2 },
    },
    pixel: {
      name: 'Pixel', mode: 'fill', px: 5, fur: 0,
      coat: ['#4a3a78', '#2b2340', '#151021'], belly: '#100d18', rim: '#7b5cd6',
      furHi: 'rgba(0,0,0,0)', furLo: 'rgba(0,0,0,0)',
      inner: '#8f6ef0', iris: ['#e4ff8a', '#c8f25a', '#7fa21c'], nose: '#a58be8', whisker: 'rgba(0,0,0,0)',
      palette: ['#0c0a12', '#151021', '#2b2340', '#4a3a78', '#7b5cd6', '#a58be8', '#c8f25a', '#f4f0ff', '#e88ab0'],
      sit: { w: 46, h: 106, head: 46, ear: 1.0 },
      body: { len: 0.98, depth: 1.05, leg: 0.98, head: 1.05, tail: 0.95 },
      tail: { n: 16, seg: 7, w: 8 },
    },
  };

  function spline(pts, closed, steps = 8) {
    const out = [], n = pts.length;
    const get = (i) => closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)];
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      for (let s = 0; s < steps; s++) {
        const t = s / steps, t2 = t * t, t3 = t2 * t;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    if (!closed) out.push(pts[n - 1]);
    return out;
  }
  function ellipsePts(cx, cy, rx, ry, rot = 0, n = 28) {
    const o = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU, x = Math.cos(a) * rx, y = Math.sin(a) * ry; o.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); }
    return o;
  }
  function capsule(a, b, wa, wb) {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const pts = [];
    for (let i = 0; i <= 8; i++) { const t = ang + Math.PI / 2 + (i / 8) * Math.PI; pts.push([a[0] + Math.cos(t) * wa, a[1] + Math.sin(t) * wa]); }
    for (let i = 0; i <= 8; i++) { const t = ang - Math.PI / 2 + (i / 8) * Math.PI; pts.push([b[0] + Math.cos(t) * wb, b[1] + Math.sin(t) * wb]); }
    return pts;
  }
  function ik(h, f, a, b, preferX) {
    const dx = f[0] - h[0], dy = f[1] - h[1];
    const d = clamp(Math.hypot(dx, dy), 1e-3, a + b - 0.05);
    const base = Math.atan2(dy, dx);
    const c = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
    const k1 = add(h, polar(a, base + c)), k2 = add(h, polar(a, base - c));
    return preferX > 0 ? (k1[0] > k2[0] ? k1 : k2) : (k1[0] < k2[0] ? k1 : k2);
  }

  const furCache = {};
  function furPattern(ctx, k) {
    if (furCache[k.name]) return furCache[k.name];
    const c = document.createElement('canvas'); c.width = c.height = 96;
    const g = c.getContext('2d');
    let s = 7; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    g.lineCap = 'round';
    for (let i = 0; i < 520; i++) {
      const x = r() * 96, y = r() * 96, l = 2 + r() * 4, a = 0.35 + (r() - 0.5) * 0.7;
      g.strokeStyle = r() < 0.5 ? k.furHi : k.furLo; g.lineWidth = 0.6 + r() * 0.6;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
    return (furCache[k.name] = ctx.createPattern(c, 'repeat'));
  }

  class Cat {
    constructor(canvas, skin, opts = {}) {
      this.cv = canvas; this.ctx = canvas.getContext('2d');
      this.k = { ...SKINS[skin] }; this.skin = skin; this.opts = opts; this.anchor = { x: 0, y: 0 };
      this.reduced = opts.reduced ?? matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.t = Math.random() * 10; this.x = 0.5; this.dir = 1;
      this.pose = 'sit'; this.blend = 0; this.ph = 0; this.goal = null; this.speedK = 0;
      this.look = { x: 0, y: 0 }; this.lookT = { x: 0, y: 0 };
      this.blinkAt = this.t + 1.5 + Math.random() * 3; this.blink = 0;
      this.earL = 0; this.earR = 0; this.earAt = this.t + 2 + Math.random() * 4;
      this.tap = 0; this.bubble = 0; this.mouth = 0; this.mouthT = 0; this.talking = false;
      this.seed = 1 + Math.floor(Math.random() * 1e6); this.boil = 0;
      this.tails = {};
      if (this.k.px) { this.low = document.createElement('canvas'); this.lctx = this.low.getContext('2d'); }
      this.resize();
      if (!opts.place) canvas.addEventListener('pointerdown', () => this.poke());
    }
    resize() {
      const r = this.cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      this.w = Math.max(10, r.width); this.h = Math.max(10, r.height); this.dpr = dpr;
      this.cv.width = Math.round(this.w * dpr); this.cv.height = Math.round(this.h * dpr);
      if (this.low) { this.low.width = Math.ceil(this.w / this.k.px); this.low.height = Math.ceil(this.h / this.k.px); }
    }
    scale() { return this.P ? this.P.scale : Math.min(this.h / 270, this.w / 250); }
    span() { return this.P ? this.P.x1 - this.P.x0 : this.w; }
    pointer(px, py) {
      const r = this.cv.getBoundingClientRect(), s = this.scale();
      const hx = r.left + this.anchor.x, hy = r.top + this.anchor.y - (this.k.sit.h + this.k.sit.head * 0.6) * s;
      this.lookT.x = clamp((px - hx) / 280, -1, 1); this.lookT.y = clamp((py - hy) / 280, -1, 1);
    }
    poke() { this.tap = 1; this.bubble = 1.6; this.earL = 1; this.earR = 1; this.cv.dispatchEvent(new CustomEvent('cat:meow', { bubbles: true, detail: this.skin })); }
    walkTo(x) { this.goal = clamp(x, 0.16, 0.84); this.pose = 'walk'; }
    wander() { this.walkTo(this.x < 0.5 ? 0.76 + Math.random() * 0.06 : 0.18 + Math.random() * 0.06); }

    step(dt) {
      if (this.reduced && !this.talking) dt = 0;
      this.dt = dt;
      this.t += dt;
      const e = 1 - Math.exp(-dt * 5);
      this.look.x = lerp(this.look.x, this.lookT.x, e); this.look.y = lerp(this.look.y, this.lookT.y, e);
      if (this.t > this.blinkAt) { this.blink = 1; this.blinkAt = this.t + (Math.random() < 0.18 ? 0.3 : 2.4 + Math.random() * 4.5); }
      this.blink = Math.max(0, this.blink - dt * 6.5);
      if (this.t > this.earAt) { if (Math.random() < 0.5) this.earL = 1; else this.earR = 1; this.earAt = this.t + 2.5 + Math.random() * 6; }
      this.earL = Math.max(0, this.earL - dt * 4); this.earR = Math.max(0, this.earR - dt * 4);
      this.mouth = lerp(this.mouth, this.mouthT, 1 - Math.exp(-dt * 30));
      this.tap = Math.max(0, this.tap - dt * 2.4); this.bubble = Math.max(0, this.bubble - dt);
      const want = this.pose === 'walk' ? 1 : 0;
      this.blend = clamp(this.blend + Math.sign(want - this.blend) * dt * 4, 0, 1);
      const B = this.k.body, s = this.scale();
      const cycle = 1.05 * Math.sqrt(B.leg), stride = 46 * B.leg, D = 0.64;
      const target = this.pose === 'walk' && this.blend > 0.6 ? 1 : 0;
      this.speedK = lerp(this.speedK, target, 1 - Math.exp(-dt * 3));
      if (this.goal != null && this.pose === 'walk') {
        const d = this.goal - this.x; this.dir = Math.sign(d) || this.dir;
        const v = ((stride * s) / (D * cycle)) * this.speedK;
        const move = Math.min(Math.abs(d), (v * dt) / this.span());
        this.x += this.dir * move;
        this.ph = (this.ph + (dt / cycle) * this.speedK) % 1;
        if (Math.abs(this.goal - this.x) < 0.004) { this.goal = null; this.pose = 'sit'; }
      }
      this.boil += dt;
    }

    draw() {
      const k = this.k;
      let ctx = this.ctx, unit = this.dpr;
      if (k.px) { ctx = this.lctx; unit = 1 / k.px; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, this.low.width, this.low.height); }
      else { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, this.cv.width, this.cv.height); }
      this.P = this.opts.place ? this.opts.place(this) : null;
      if (this.opts.theme) { const T = this.opts.theme(); if (T.ink) { k.ink = T.ink; k.eyeEdge = T.ink; k.nose = T.ink; k.whisker = T.ink; k.inner = T.ink; } if (T.paper) k.paper = T.paper; }
      const s = this.scale();
      const ax = this.P ? this.P.x0 + this.span() * this.x : this.x * this.w, ay = this.P ? this.P.y : this.h - 26;
      this.anchor = { x: ax, y: ay };
      ctx.setTransform(unit * s, 0, 0, unit * s, unit * ax, unit * ay);
      this.jseed = k.mode === 'line' ? this.seed + Math.floor(this.boil * 7) * 7919 : 0;
      const sw = lerp(k.sit.w * 1.5, 70 * k.body.len, this.blend);
      const g = ctx.createRadialGradient(0, 14, 2, 0, 14, sw);
      g.addColorStop(0, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      if (!this.opts.place) { ctx.save(); ctx.scale(1, 0.14); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 14, sw, 0, TAU); ctx.fill(); ctx.restore(); }
      if (this.blend < 1) { ctx.save(); ctx.globalAlpha = 1 - ease(this.blend); this.drawSit(ctx); ctx.restore(); }
      if (this.blend > 0) { ctx.save(); ctx.globalAlpha = ease(this.blend); if (this.dir < 0) ctx.scale(-1, 1); this.drawWalk(ctx); ctx.restore(); }
      if (this.bubble > 0) this.drawBubble(ctx);
      if (k.px) this.blitPixel();
    }

    grad(ctx, y0, y1) {
      const k = this.k; if (k.mode === 'line') return k.paper;
      const g = ctx.createLinearGradient(0, y0, 0, y1);
      g.addColorStop(0, k.coat[0]); g.addColorStop(0.35, k.coat[1]); g.addColorStop(0.85, k.coat[2]); g.addColorStop(1, k.belly);
      return g;
    }
    poly(ctx, pts) {
      ctx.beginPath();
      if (this.jseed) {
        let s = this.jseed; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5) * 2 * this.k.jitter;
        pts.forEach((p, i) => (i ? ctx.lineTo(p[0] + r(), p[1] + r()) : ctx.moveTo(p[0] + r(), p[1] + r())));
      } else pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
    }
    fill(ctx, pts, o = {}) {
      const k = this.k;
      this.poly(ctx, pts);
      if (k.mode === 'line') {
        ctx.fillStyle = k.paper; ctx.fill();
        if (o.rim === false) return;
        ctx.strokeStyle = k.ink; ctx.lineWidth = o.w || k.lineW; ctx.lineJoin = 'round'; ctx.stroke();
        if (o.hatch) this.hatch(ctx, pts, o.hatch);
        return;
      }
      ctx.fillStyle = o.fill || this.G; ctx.fill();
      if (o.shade) { ctx.save(); ctx.globalAlpha *= o.shade; ctx.fillStyle = '#000'; ctx.fill(); ctx.restore(); }
      if (k.fur) {
        ctx.save(); ctx.clip(); ctx.fillStyle = furPattern(ctx, k);
        ctx.fillRect(-400, -400, 800, 800); ctx.restore();
        if (o.fuzz !== false) this.fuzz(ctx, pts, o);
      }
      if (o.rim !== false) {
        ctx.save(); this.poly(ctx, pts); ctx.strokeStyle = k.rim; ctx.globalAlpha *= o.rimA ?? 0.55; ctx.lineWidth = k.px ? 2.4 : 0.9; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
      }
    }
    fuzz(ctx, pts, o) {
      const k = this.k, n = pts.length, base = ctx.globalAlpha;
      ctx.save(); ctx.lineCap = 'round';
      let cx = 0, cy = 0; for (const p of pts) { cx += p[0]; cy += p[1]; } cx /= n; cy /= n;
      for (let i = 0; i < n; i++) {
        const p = pts[i], q = pts[(i + 1) % n];
        const tx = q[0] - p[0], ty = q[1] - p[1], L = Math.hypot(tx, ty) || 1;
        let nx = ty / L, ny = -tx / L;
        if ((p[0] - cx) * nx + (p[1] - cy) * ny < 0) { nx = -nx; ny = -ny; }
        const h = Math.sin(i * 12.9898 + this.seed) * 43758.5453; const r = h - Math.floor(h);
        const len = (1.2 + r * 2.2) * k.fur * (o.fuzzK || 1);
        const up = clamp(-ny, 0, 1);
        ctx.strokeStyle = up > 0.3 ? k.rim : k.coat[2];
        ctx.globalAlpha = base * (up > 0.3 ? 0.28 * up : 0.45);
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(p[0] - nx * 0.8, p[1] - ny * 0.8); ctx.lineTo(p[0] + nx * len + tx / L * len * 0.5, p[1] + ny * len + ty / L * len * 0.5); ctx.stroke();
      }
      ctx.restore();
    }
    hatch(ctx, pts, dir) {
      const k = this.k; ctx.save(); this.poly(ctx, pts); ctx.clip();
      ctx.strokeStyle = k.ink; ctx.globalAlpha *= 0.28; ctx.lineWidth = 0.7;
      let ymax = -1e9; for (const p of pts) ymax = Math.max(ymax, p[1]);
      for (let i = -14; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-200 + i * 9 + 200, ymax - 2); ctx.lineTo(-170 + i * 9 + 200 + dir * 6, ymax - 14); ctx.stroke(); }
      ctx.restore();
    }

    tail(id, root, baseAng, rest, swing) {
      const T = this.k.tail, n = T.n, dt = Math.min(this.dt || 0.016, 0.033);
      let st = this.tails[id];
      if (!st) st = this.tails[id] = { a: rest.slice(), v: new Array(n).fill(0) };
      const pts = [root]; let a = baseAng, p = root;
      for (let i = 0; i < n; i++) {
        const tgt = rest[i] + swing(i / n);
        const acc = (tgt - st.a[i]) * 60 - st.v[i] * 9;
        st.v[i] += acc * dt; st.a[i] += st.v[i] * dt;
        a += st.a[i];
        p = add(p, polar(T.seg * this.k.body.tail * (id === 'walk' ? 0.85 : 1), a)); pts.push(p);
      }
      return pts;
    }
    drawTail(ctx, pts) {
      const k = this.k, T = k.tail;
      const sm = spline(pts, false, 3);
      if (k.mode === 'line') { ctx.beginPath(); sm.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = k.ink; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.stroke(); return; }
      const L = [], R = [];
      for (let i = 0; i < sm.length; i++) {
        const q = sm[Math.min(i + 1, sm.length - 1)], o = sm[Math.max(i - 1, 0)];
        const ang = Math.atan2(q[1] - o[1], q[0] - o[0]) + Math.PI / 2;
        const f = i / (sm.length - 1);
        const w = T.w * (k.round ? 1 - f * 0.25 : 1 - f * 0.55) * (1 + this.tap * 0.4) * (f < 0.08 ? 1.25 : 1);
        L.push(add(sm[i], polar(w / 2, ang))); R.push(add(sm[i], polar(-w / 2, ang)));
      }
      this.fill(ctx, L.concat(R.reverse()), { fuzzK: 1.1, rimA: 0.22 });
    }

    // ---------- seated ----------
    drawSit(ctx) {
      const k = this.k, S = k.sit, W = S.w;
      const br = Math.sin(this.t * 2.0) * 0.012, sq = this.tap * 0.05;
      const H = S.h * (1 + br - sq);
      this.G = this.grad(ctx, -H - 20, 0);
      const n = k.tail.n, rest = [];
      for (let i = 0; i < n; i++) { const f = i / n; rest.push(f < 0.5 ? 0.012 : f < 0.8 ? 0.14 : 0.24); }
      const tp = this.tail('sit', [W * 0.9, -5], Math.PI + 0.03, rest,
        (f) => f > 0.65 ? Math.sin(this.t * 2.4) * 0.12 * (f - 0.65) * 3 * (1 + this.tap * 3) : 0);
      for (const sx of [-1, 1]) this.fill(ctx, ellipsePts(sx * W * 0.98, -4, W * 0.36, 5.5, 0, 18), { rimA: 0.3 });
      const body = spline([
        [-W * 0.34, -H], [-W * 0.58, -H * 0.86], [-W * 0.66, -H * 0.6], [-W * 0.95, -H * 0.42], [-W * 1.14, -H * 0.2], [-W * 1.08, -4],
        [-W * 0.3, -2], [W * 0.3, -2],
        [W * 1.08, -4], [W * 1.14, -H * 0.2], [W * 0.95, -H * 0.42], [W * 0.66, -H * 0.6], [W * 0.58, -H * 0.86], [W * 0.34, -H],
      ], true, 7);
      this.fill(ctx, body, { hatch: 1 });
      if (k.mode === 'fill') {
        for (const sx of [-1, 1]) {
          ctx.save(); this.poly(ctx, body); ctx.clip();
          const g = ctx.createRadialGradient(sx * W * 0.72, -H * 0.36, 2, sx * W * 0.78, -H * 0.24, W * 0.45);
          g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(-300, -300, 600, 600);
          ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(sx * W * 0.8, -H * 0.24, W * 0.34, H * 0.2, sx * 0.3, sx > 0 ? Math.PI * 0.8 : Math.PI * 0.2 - 0.6, sx > 0 ? Math.PI * 1.4 : Math.PI * 0.2 + 0.0); ctx.stroke();
          ctx.restore();
        }
        ctx.save(); this.poly(ctx, body); ctx.clip();
        const g = ctx.createRadialGradient(0, -H * 0.82, 2, 0, -H * 0.75, W * 0.5);
        g.addColorStop(0, k.coat[0]); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha *= 0.55; ctx.fillStyle = g; ctx.fillRect(-200, -300, 400, 400); ctx.restore();
      }
      this.drawTail(ctx, tp);
      for (const sx of [-1, 1]) {
        const x0 = sx * W * 0.2, x1 = sx * W * 0.22;
        this.fill(ctx, capsule([x0, -H * 0.66], [x1, -9], W * 0.17, W * 0.13), { fuzz: false, rimA: 0.06, rim: k.mode === 'line' });
        this.fill(ctx, ellipsePts(x1 + sx * 1, -5, W * 0.17, 5.6, 0, 18), { fuzzK: 0.5, rimA: 0.5 });
        ctx.save(); ctx.strokeStyle = k.mode === 'line' ? k.ink : 'rgba(0,0,0,.55)'; ctx.lineWidth = 0.8;
        ctx.beginPath(); for (const d of [-0.33, 0, 0.33]) { ctx.moveTo(x1 + d * W * 0.17, -1.5); ctx.lineTo(x1 + d * W * 0.15, -5); } ctx.stroke(); ctx.restore();
      }
      if (k.mode === 'fill') { ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(0, -H * 0.6); ctx.quadraticCurveTo(1, -H * 0.3, 0, -10); ctx.stroke(); ctx.restore(); }
      if (k.collar) {
        ctx.save(); ctx.strokeStyle = k.collar; ctx.lineWidth = 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-W * 0.4, -H * 0.95); ctx.quadraticCurveTo(0, -H * 0.86, W * 0.4, -H * 0.95); ctx.stroke();
        this.star(ctx, 0, -H * 0.84, 6, k.tag); ctx.restore();
      }
      const tilt = this.look.x * 0.18 + Math.sin(this.t * 0.6) * 0.035 - this.tap * 0.06 + (this.talking ? Math.sin(this.t * 3.1) * 0.04 : 0);
      ctx.save();
      ctx.translate(this.look.x * 5, -H - S.head * 0.32 + this.look.y * 3 + this.tap * 4 + br * 40);
      ctx.rotate(tilt);
      this.drawFace(ctx, S.head, S.ear);
      ctx.restore();
    }

    star(ctx, x, y, r, c) {
      ctx.save(); ctx.fillStyle = c; ctx.beginPath();
      for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }

    ear(ctx, sx, r, size, tw) {
      const k = this.k;
      ctx.save();
      ctx.translate(sx * r * 0.5, -r * 0.42);
      ctx.rotate(sx * (0.3 + tw * 0.45 + this.tap * 0.35));
      const w = r * 0.48 * size, h = r * 0.8 * size;
      const outer = spline([[-w * 0.55, h * 0.18], [-w * 0.38, -h * 0.45], [-w * 0.05, -h * 0.98], [w * 0.08, -h * 0.98], [w * 0.4, -h * 0.4], [w * 0.55, h * 0.18]], false, 5);
      this.fill(ctx, outer, { fuzzK: 0.7 });
      const inner = spline([[-w * 0.33, h * 0.12], [-w * 0.2, -h * 0.4], [-w * 0.01, -h * 0.78], [w * 0.22, -h * 0.35], [w * 0.32, h * 0.12]], false, 5);
      if (k.mode === 'fill') {
        this.poly(ctx, inner); const g = ctx.createLinearGradient(0, -h, 0, h * 0.2); g.addColorStop(0, k.inner); g.addColorStop(1, 'rgba(0,0,0,.6)');
        ctx.fillStyle = g; ctx.globalAlpha *= 0.85; ctx.fill();
        ctx.strokeStyle = 'rgba(235,225,245,.45)'; ctx.lineWidth = 0.6; ctx.beginPath();
        for (let i = 0; i < 4; i++) { ctx.moveTo(-w * 0.15 + i * w * 0.1, h * 0.1); ctx.lineTo(-w * 0.25 + i * w * 0.14, -h * 0.25); } ctx.stroke();
      } else { this.poly(ctx, inner); ctx.strokeStyle = k.ink; ctx.lineWidth = 0.8; ctx.stroke(); }
      ctx.restore();
    }

    drawFace(ctx, r, earSize) {
      const k = this.k;
      this.G = this.grad(ctx, -r * 2.2, r * 2.2);
      this.ear(ctx, -1, r, earSize, this.earL);
      this.ear(ctx, 1, r, earSize, this.earR);
      const R = k.round ? 1.08 : 1;
      const skull = spline([
        [0, -r * 0.62], [r * 0.45, -r * 0.55], [r * 0.7 * R, -r * 0.2], [r * 0.82 * R, r * 0.12], [r * 0.62 * R, r * 0.4],
        [r * 0.28, r * 0.56], [0, r * 0.6], [-r * 0.28, r * 0.56], [-r * 0.62 * R, r * 0.4], [-r * 0.82 * R, r * 0.12], [-r * 0.7 * R, -r * 0.2], [-r * 0.45, -r * 0.55],
      ], true, 6);
      this.fill(ctx, skull, { fuzzK: 0.9 });
      if (k.mode === 'fill') {
        ctx.save(); this.poly(ctx, skull); ctx.clip();
        let g = ctx.createRadialGradient(0, -r * 0.4, 1, 0, -r * 0.3, r * 0.7); g.addColorStop(0, 'rgba(255,255,255,.09)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r);
        g = ctx.createRadialGradient(0, r * 0.6, 1, 0, r * 0.6, r * 0.6); g.addColorStop(0, 'rgba(0,0,0,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.restore();
      }
      const ex = r * 0.33, ey = -r * 0.04, ew = r * (k.round ? 0.2 : 0.19), eh = r * (k.round ? 0.17 : 0.125);
      const open = clamp(1 - Math.sin(clamp(this.blink, 0, 1) * Math.PI) * 0.97 - this.tap * 0.45, 0.04, 1);
      for (const sx of [-1, 1]) {
        ctx.save(); ctx.translate(sx * ex, ey); ctx.rotate(sx * -0.16);
        const almond = spline([[-ew, 0], [-ew * 0.35, -eh], [ew * 0.45, -eh * 0.95], [ew, -eh * 0.1], [ew * 0.35, eh * 0.85], [-ew * 0.4, eh * 0.8]], true, 6).map(p => [p[0] * sx, p[1]]);
        ctx.save(); ctx.scale(1, open);
        this.poly(ctx, almond);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ew); g.addColorStop(0, k.iris[0]); g.addColorStop(0.55, k.iris[1]); g.addColorStop(1, k.iris[2]);
        ctx.fillStyle = g; ctx.fill(); ctx.save(); ctx.clip();
        const px = this.look.x * ew * 0.35, py = this.look.y * eh * 0.3;
        ctx.fillStyle = '#060508'; ctx.beginPath();
        const pw = (k.round ? ew * 0.42 : ew * 0.13) + this.tap * ew * 0.35 + (this.talking ? ew * 0.05 : 0);
        ctx.ellipse(px, py, pw, eh * 1.15, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-ew, -eh * 1.2, ew * 2, eh * 0.45);
        ctx.fillStyle = 'rgba(255,255,245,.9)'; ctx.beginPath(); ctx.arc(px - ew * 0.32 * sx, py - eh * 0.4, Math.max(0.9, ew * 0.11), 0, TAU); ctx.fill();
        ctx.restore();
        ctx.strokeStyle = k.mode === 'line' ? k.ink : '#050407'; ctx.lineWidth = k.mode === 'line' ? 1.1 : 1.6; this.poly(ctx, almond); ctx.stroke();
        ctx.restore(); ctx.restore();
      }
      const ny = r * 0.2;
      if (k.mode === 'fill') {
        for (const sx of [-1, 1]) { const g = ctx.createRadialGradient(sx * r * 0.13, ny + r * 0.16, 0, sx * r * 0.13, ny + r * 0.16, r * 0.17); g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(sx * r * 0.13, ny + r * 0.16, r * 0.17, r * 0.12, 0, 0, TAU); ctx.fill(); }
        ctx.fillStyle = 'rgba(0,0,0,.6)'; for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { ctx.beginPath(); ctx.arc(sx * (r * 0.08 + i * r * 0.05), ny + r * 0.12 + j * r * 0.05, 0.5, 0, TAU); ctx.fill(); }
      }
      ctx.fillStyle = k.nose; ctx.beginPath();
      ctx.moveTo(-r * 0.085, ny - r * 0.02); ctx.quadraticCurveTo(0, ny - r * 0.06, r * 0.085, ny - r * 0.02); ctx.quadraticCurveTo(r * 0.04, ny + r * 0.06, 0, ny + r * 0.08); ctx.quadraticCurveTo(-r * 0.04, ny + r * 0.06, -r * 0.085, ny - r * 0.02); ctx.fill();
      if (k.mode === 'fill') { ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(-r * 0.02, ny - r * 0.01, r * 0.03, r * 0.012, 0, 0, TAU); ctx.fill(); }
      const m = clamp(this.mouth, 0, 1), my = ny + r * 0.08;
      if (m > 0.04) {
        const jw = r * (0.1 + m * 0.06), jh = r * (0.04 + m * 0.2);
        ctx.save(); ctx.beginPath(); ctx.moveTo(-jw, my + r * 0.05); ctx.quadraticCurveTo(0, my + r * 0.01, jw, my + r * 0.05); ctx.quadraticCurveTo(jw * 0.85, my + r * 0.05 + jh, 0, my + r * 0.06 + jh); ctx.quadraticCurveTo(-jw * 0.85, my + r * 0.05 + jh, -jw, my + r * 0.05); ctx.closePath();
        ctx.fillStyle = '#1b0c14'; ctx.fill(); ctx.clip();
        ctx.fillStyle = '#c4718c'; ctx.beginPath(); ctx.ellipse(0, my + r * 0.06 + jh, jw * 0.6, jh * 0.45, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#f3ecf6'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * jw * 0.55, my + r * 0.035); ctx.lineTo(sx * jw * 0.45, my + r * 0.085); ctx.lineTo(sx * jw * 0.35, my + r * 0.04); ctx.fill(); }
        ctx.restore();
      }
      ctx.strokeStyle = k.mode === 'line' ? k.ink : 'rgba(5,4,8,.85)'; ctx.lineWidth = 1; ctx.lineCap = 'round'; ctx.beginPath();
      const sm = r * (0.02 + this.tap * 0.05);
      ctx.moveTo(0, ny + r * 0.08); ctx.lineTo(0, my + r * 0.05);
      ctx.moveTo(0, my + r * 0.05); ctx.quadraticCurveTo(-r * 0.06, my + r * 0.09 + sm, -r * 0.14, my + r * 0.05);
      ctx.moveTo(0, my + r * 0.05); ctx.quadraticCurveTo(r * 0.06, my + r * 0.09 + sm, r * 0.14, my + r * 0.05);
      ctx.stroke();
      ctx.strokeStyle = k.whisker; ctx.lineWidth = 0.6; ctx.beginPath();
      for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) {
        const y = ny + r * 0.12 + i * r * 0.045, sw = Math.sin(this.t * 1.1 + i + sx) * 1.2 - (this.tap * 3);
        ctx.moveTo(sx * r * 0.22, y); ctx.quadraticCurveTo(sx * r * 0.75, y - r * 0.05 + i * r * 0.03 + sw, sx * r * (1.25 - i * 0.04), y - r * 0.02 + i * r * 0.1 + sw);
      }
      ctx.stroke();
      ctx.beginPath(); for (const sx of [-1, 1]) { ctx.moveTo(sx * r * 0.3, -r * 0.22); ctx.quadraticCurveTo(sx * r * 0.45, -r * 0.45, sx * r * 0.62, -r * 0.6); } ctx.stroke();
    }

    // ---------- walking, side view ----------
    drawWalk(ctx) {
      const k = this.k, B = k.body, ph = this.ph;
      const D = 0.64, stride = 46 * B.leg, lift = 11 * B.leg;
      const fem = 25 * B.leg, tib = 27 * B.leg, meta = 16 * B.leg, hum = 22 * B.leg, rad = 25 * B.leg, mc = 9 * B.leg;
      const hipX = -40 * B.len, shX = 36 * B.len;
      const hipH = 54 * B.leg + 4, shH = 50 * B.leg + 4;
      const off = { hn: 0, fn: 0.25, hf: 0.5, ff: 0.75 };
      const S = (u) => {
        if (u < D) { const s = u / D; return { x: stride * (0.5 - s), y: 0, s, stance: true }; }
        const v = (u - D) / (1 - D); return { x: stride * (-0.5 + ease(v)), y: -lift * Math.sin(Math.PI * Math.pow(v, 0.85)), v, stance: false };
      };
      const hU = (u) => { const f = S(u); return f.stance ? Math.sin(Math.PI * f.s) : 0; };
      const hipLift = (hU(ph) + hU((ph + 0.5) % 1)) * 1.6 - 1.6;
      const shLift = (hU((ph + 0.25) % 1) + hU((ph + 0.75) % 1)) * 1.4 - 1.4;
      const hip = [hipX, -hipH - hipLift], sh = [shX, -shH - shLift];
      const D_ = 20 * B.depth;
      this.G = this.grad(ctx, -hipH - D_ * 1.2, -hipH + D_ * 1.3);
      const legs = {};
      for (const key of ['hn', 'hf', 'fn', 'ff']) {
        const u = (ph + off[key]) % 1, f = S(u), hind = key[0] === 'h';
        const top = hind ? hip : sh;
        const baseX = top[0] + (hind ? 2 : 4);
        const ball = [baseX + f.x, f.y];
        let lower, toe;
        if (hind) {
          const a = f.stance ? (1.18 + 0.35 * f.s * f.s) : (1.45 - 0.55 * Math.sin(Math.PI * f.v));
          lower = add(ball, polar(meta, -Math.PI + a));
          toe = f.stance ? add(ball, [7, 0]) : add(ball, polar(7, 0.9 + Math.sin(Math.PI * f.v) * 0.6));
          if (f.stance && f.s > 0.8) toe = add(ball, polar(7, (f.s - 0.8) * 2.2));
        } else {
          const b = f.stance ? (1.62 - 0.3 * Math.max(0, f.s - 0.6) * 2.5) : (1.3 - 1.25 * Math.sin(Math.PI * Math.pow(f.v, 0.8)));
          lower = add(ball, polar(mc, -b));
          toe = f.stance ? add(ball, [6, 0]) : add(ball, polar(6, 0.6 + Math.sin(Math.PI * f.v) * 1.4));
          if (f.stance && f.s > 0.75) toe = add(ball, polar(6, (f.s - 0.75) * 3));
        }
        const joint = ik(top, lower, hind ? fem : hum, hind ? tib : rad, hind ? 1 : -1);
        legs[key] = { top, joint, lower, ball, toe, hind, far: key[1] === 'f', u };
      }
      const fnAng = Math.atan2(legs.fn.joint[1] - sh[1], legs.fn.joint[0] - sh[0]);
      const scap = add(sh, polar(17 * B.leg, fnAng + Math.PI + 0.25));
      for (const key of ['hf', 'ff']) this.leg(ctx, legs[key], 0.3);
      const root = [hip[0] - 13 * B.len, hip[1] - D_ * 0.55];
      const n = k.tail.n, rest = [];
      for (let i = 0; i < n; i++) { const f = i / n; rest.push(f < 0.25 ? 0.1 : f < 0.55 ? -0.03 : f < 0.8 ? 0.06 : -0.16); }
      const tp = this.tail('walk', root, Math.PI + 0.2, rest, (f) => Math.sin(ph * TAU - f * 3.5) * 0.05 * f);
      this.drawTail(ctx, tp);
      const head = [sh[0] + 22 * B.head + 4, sh[1] - D_ * 1.25 - 5 * B.head + (hipLift + shLift) * 0.4];
      const sag = Math.sin(ph * TAU * 2) * 0.8;
      const trunk = spline([
        root,
        [hip[0] - 6, hip[1] - D_ * 0.72],
        [hip[0] + 18, hip[1] - D_ * 0.8 + sag],
        [(hip[0] + sh[0]) / 2, (hip[1] + sh[1]) / 2 - D_ * 0.76 + sag],
        [scap[0] - 3, Math.min(scap[1], sh[1] - D_ * 0.72)],
        [sh[0] + 12, sh[1] - D_ * 0.95],
        [head[0] - 12 * B.head, head[1] - 4 * B.head],
        [head[0] - 4 * B.head, head[1] + 13 * B.head],
        [sh[0] + 13, sh[1] + D_ * 0.15],
        [sh[0] + 4, sh[1] + D_ * 0.62],
        [sh[0] - 14, sh[1] + D_ * 0.7],
        [(hip[0] + sh[0]) / 2 - 4, (hip[1] + sh[1]) / 2 + D_ * (k.round ? 0.78 : 0.48)],
        [hip[0] + 12, hip[1] + D_ * 0.42],
        [hip[0] - 4, hip[1] + D_ * 0.55],
        [hip[0] - 15, hip[1] + D_ * 0.05],
      ], true, 7);
      this.fill(ctx, trunk, { hatch: 1 });
      if (k.collar) { ctx.save(); ctx.strokeStyle = k.collar; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sh[0] + 12, sh[1] - D_ * 0.95); ctx.quadraticCurveTo(sh[0] + 20, sh[1] - D_ * 0.3, sh[0] + 15, sh[1] + D_ * 0.1); ctx.stroke(); this.star(ctx, sh[0] + 17, sh[1] + D_ * 0.22, 5, k.tag); ctx.restore(); }
      this.leg(ctx, legs.hn, 0, true);
      this.leg(ctx, legs.fn, 0, true);
      ctx.save(); ctx.translate(head[0], head[1]); ctx.rotate(0.12 + this.look.y * 0.1);
      this.drawProfile(ctx, 21 * B.head);
      ctx.restore();
    }

    leg(ctx, L, shade, near) {
      const k = this.k, B = k.body;
      const chain = [L.top, L.joint, L.lower, L.ball, L.toe];
      const w = (L.hind ? [12, 6.2, 3.9, 3.5, 3.0] : [9, 4.8, 3.6, 3.4, 2.9]).map((v) => v * B.leg * (k.round ? 1.15 : 1));
      const left = [], right = [];
      for (let i = 0; i < chain.length; i++) {
        const a = chain[Math.max(0, i - 1)], b = chain[Math.min(chain.length - 1, i + 1)];
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2;
        left.push(add(chain[i], polar(w[i], ang))); right.push(add(chain[i], polar(-w[i], ang)));
      }
      const tip = chain[chain.length - 1], prev = chain[chain.length - 2];
      const ta = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
      const cap = [add(tip, polar(w[4] * 1.1, ta))];
      const outline = spline(left.concat(cap, right.reverse()), true, 5);
      this.fill(ctx, outline, { shade, fuzzK: 0.45, rimA: L.far ? 0.12 : 0.32 });
      if (near) {
        const c = [lerp(L.top[0], L.joint[0], 0.42), lerp(L.top[1], L.joint[1], 0.42) - 3];
        const ang = Math.atan2(L.joint[1] - L.top[1], L.joint[0] - L.top[0]);
        const rx = (L.hind ? 18 : 12) * B.leg, ry = (L.hind ? 12.5 : 8.5) * B.leg * (k.round ? 1.25 : 1);
        this.fill(ctx, ellipsePts(c[0], c[1], rx, ry, ang, 26), { rim: false, fuzz: false });
        if (k.mode === 'fill') { // a soft crease where the thigh meets the flank
          ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.beginPath();
          ctx.ellipse(c[0], c[1], rx * 0.96, ry * 0.96, ang, L.hind ? 0.6 : 0.9, L.hind ? 2.2 : 2.4); ctx.stroke(); ctx.restore();
        } else {
          ctx.save(); ctx.strokeStyle = k.ink; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.ellipse(c[0], c[1], rx * 0.96, ry * 0.96, ang, 0.5, 2.4); ctx.stroke(); ctx.restore();
        }
      }
    }

    drawProfile(ctx, r) {
      const k = this.k;
      const ears = [[-0.42, 0.55, this.earL], [-0.02, 1, this.earR]];
      for (const [ex, a, tw] of ears) {
        ctx.save(); ctx.globalAlpha *= a; ctx.translate(ex * r, -r * 0.62); ctx.rotate(-0.15 + tw * 0.4 - this.tap * 0.3);
        const e = spline([[-r * 0.32, r * 0.18], [-r * 0.22, -r * 0.45], [-r * 0.04, -r * 0.95], [r * 0.06, -r * 0.92], [r * 0.25, -r * 0.4], [r * 0.32, r * 0.2]], false, 5);
        this.fill(ctx, e, { fuzzK: 0.6 });
        if (k.mode === 'fill' && a === 1) { ctx.fillStyle = k.inner; ctx.globalAlpha *= 0.7; this.poly(ctx, spline([[-r * 0.14, r * 0.1], [-r * 0.06, -r * 0.5], [r * 0.02, -r * 0.74], [r * 0.12, -r * 0.35], [r * 0.16, r * 0.1]], false, 4)); ctx.fill(); }
        ctx.restore();
      }
      const p = spline([
        [-r * 0.95, -r * 0.05], [-r * 0.55, -r * 0.72], [r * 0.15, -r * 0.82], [r * 0.62, -r * 0.48], [r * 0.95, -r * 0.18],
        [r * 1.16, r * 0.04], [r * 1.12, r * 0.28], [r * 0.88, r * 0.46], [r * 0.6, r * 0.62], [r * 0.05, r * 0.66], [-r * 0.6, r * 0.55],
      ], true, 6);
      this.fill(ctx, p, { fuzzK: 0.8 });
      const open = clamp(1 - Math.sin(clamp(this.blink, 0, 1) * Math.PI) * 0.96, 0.05, 1);
      ctx.save(); ctx.translate(r * 0.52, -r * 0.2); ctx.rotate(-0.12); ctx.scale(1, open);
      const al = spline([[-r * 0.2, 0], [-r * 0.02, -r * 0.14], [r * 0.18, -r * 0.06], [r * 0.2, r * 0.02], [r * 0.02, r * 0.1]], true, 5);
      this.poly(ctx, al); const g = ctx.createRadialGradient(r * 0.02, 0, 0, r * 0.02, 0, r * 0.2); g.addColorStop(0, k.iris[0]); g.addColorStop(0.6, k.iris[1]); g.addColorStop(1, k.iris[2]);
      ctx.fillStyle = g; ctx.fill(); ctx.save(); ctx.clip();
      ctx.fillStyle = '#060508'; ctx.beginPath(); ctx.ellipse(r * 0.06, 0, k.round ? r * 0.09 : r * 0.035, r * 0.14, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,245,.9)'; ctx.beginPath(); ctx.arc(r * 0.0, -r * 0.05, Math.max(0.8, r * 0.03), 0, TAU); ctx.fill(); ctx.restore();
      ctx.strokeStyle = k.mode === 'line' ? k.ink : '#050407'; ctx.lineWidth = 1.1; this.poly(ctx, al); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = k.nose; ctx.beginPath(); ctx.ellipse(r * 1.1, r * 0.06, r * 0.07, r * 0.05, 0.4, 0, TAU); ctx.fill();
      ctx.strokeStyle = k.mode === 'line' ? k.ink : 'rgba(5,4,8,.8)'; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(r * 1.08, r * 0.14); ctx.quadraticCurveTo(r * 1.0, r * 0.32, r * 0.78, r * 0.3); ctx.stroke();
      ctx.strokeStyle = k.whisker; ctx.lineWidth = 0.55; ctx.beginPath();
      for (let i = 0; i < 4; i++) { ctx.moveTo(r * 0.88, r * 0.2 + i * r * 0.05); ctx.quadraticCurveTo(r * 1.4, r * 0.12 + i * r * 0.07, r * 1.95, r * 0.08 + i * r * 0.16); }
      ctx.stroke();
    }

    drawBubble(ctx) {
      const a = clamp(this.bubble, 0, 1);
      ctx.save(); ctx.globalAlpha = a;
      const y = -this.k.sit.h - this.k.sit.head * 1.9 - (1.6 - this.bubble) * 14;
      ctx.font = this.k.px ? '700 20px monospace' : '600 16px ui-sans-serif, system-ui'; ctx.textAlign = 'center';
      const word = { noir: 'mrrp?', mochi: 'mew!', ink: 'meow', pixel: 'MEOW' }[this.skin];
      const w = ctx.measureText(word).width + 22, bx = 54;
      ctx.fillStyle = this.k.mode === 'line' ? '#15131c' : 'rgba(30,24,44,.92)';
      ctx.strokeStyle = this.k.mode === 'line' ? this.k.ink : 'rgba(176,150,206,.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(bx - w / 2, y - 22, w, 32, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = this.k.mode === 'line' ? this.k.ink : '#ece4ff'; ctx.fillText(word, bx, y);
      ctx.restore();
    }

    blitPixel() {
      const k = this.k, l = this.lctx, w = this.low.width, h = this.low.height;
      const img = l.getImageData(0, 0, w, h), d = img.data;
      const pal = k.palette.map((c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]);
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 110) { d[i + 3] = 0; continue; }
        let best = 0, bd = 1e9;
        for (let p = 0; p < pal.length; p++) { const e = (d[i] - pal[p][0]) ** 2 + (d[i + 1] - pal[p][1]) ** 2 + (d[i + 2] - pal[p][2]) ** 2; if (e < bd) { bd = e; best = p; } }
        d[i] = pal[best][0]; d[i + 1] = pal[best][1]; d[i + 2] = pal[best][2]; d[i + 3] = 255;
      }
      const a = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) a[i] = d[i * 4 + 3] ? 1 : 0;
      for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
        const i = y * w + x; if (a[i]) continue;
        if (a[i - 1] || a[i + 1] || a[i - w] || a[i + w]) { const j = i * 4; d[j] = 12; d[j + 1] = 10; d[j + 2] = 18; d[j + 3] = 255; }
      }
      l.putImageData(img, 0, 0);
      const c = this.ctx; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, this.cv.width, this.cv.height);
      c.imageSmoothingEnabled = false; c.drawImage(this.low, 0, 0, w * k.px * this.dpr, h * k.px * this.dpr);
    }
  }

  function mount(root = document, opts = {}) {
    const cats = [...root.querySelectorAll('canvas[data-cat]')].map((c) => new Cat(c, c.dataset.cat, opts));
    let last = performance.now(); const visible = new Set(cats);
    const io = new IntersectionObserver((es) => es.forEach((e) => { const c = cats.find((x) => x.cv === e.target); if (c) e.isIntersecting ? visible.add(c) : visible.delete(c); }));
    cats.forEach((c) => io.observe(c.cv));
    addEventListener('pointermove', (e) => cats.forEach((c) => c.pointer(e.clientX, e.clientY)), { passive: true });
    addEventListener('resize', () => cats.forEach((c) => c.resize()));
    const loop = (now) => { const dt = Math.min(0.05, (now - last) / 1000); last = now; for (const c of visible) { c.step(dt); c.draw(); } requestAnimationFrame(loop); };
    cats.forEach((c) => { c.step(0); c.draw(); });
    requestAnimationFrame(loop);
    return cats;
  }
  window.MCHCats = { Cat, SKINS, mount };
})();
