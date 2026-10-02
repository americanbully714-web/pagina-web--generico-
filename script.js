/* ================= ORO & ACERO — 3D + scroll ================= */
(() => {
'use strict';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- cursor ---------- */
const cur = document.getElementById('cursor');
if (cur && !reduce) {
  let tx = 0, ty = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    cur.style.opacity = 1;
    const hot = e.target.closest('a,button,.serv,.barber,.quote,.gal-item,input,select,textarea');
    cur.classList.toggle('hot', !!hot);
  }, { passive: true });
  (function loop() {
    cx = lerp(cx, tx, .18); cy = lerp(cy, ty, .18);
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- datos inventados ---------- */
const SERVICIOS = [
  { n: 'Corte de autor',        d: 'Lectura del cabello, lavado con tónico de eucalipto y acabado a medida. Incluye peinado.', p: '38 €', t: '50 min', tag: 'Top' },
  { n: 'Degradado a navaja',    d: 'Perfilado a máquina y acabado con navaja caliente. El más pedido.', p: '44 €', t: '70 min', tag: 'Favorito' },
  { n: 'Barba clásica',         d: 'Toalla caliente, aceite preafeitado y navaja libre. Bigotealla a medida.', p: '26 €', t: '40 min' },
  { n: 'Ritual grooming',       d: 'Corte + barba + exfoliación de carbón activo + toalla de hidrogelando. Premium.', p: '69 €', t: '110 min', tag: 'Ritual' },
  { n: 'Corte infantil',        d: 'Para los peques. Sin prisa, con chupete de regalo.', p: '22 €', t: '30 min' },
  { n: 'Recorte express',       d: 'Puntas y flequillo. Si tenés que salir ya.', p: '15 €', t: '15 min' }
];

const BARBEROS = [
  { n: 'Matías Urbano',   r: 'Fundador · fades y textures', e: '💈', g: 'linear-gradient(150deg,#2b2118,#4a372a)' },
  { n: 'Iván Sanchis',     r: 'Clásico · afeitado a navaja', e: '🪒', g: 'linear-gradient(150deg,#1a2230,#2f4055)' },
  { n: 'Nico Requena',     r: 'Barba ·Wet shaving',       e: '🧔', g: 'linear-gradient(150deg,#251a26,#43304a)' }
];

const GALERIA = [
  { e: '💈', t: 'Degradado a navaja', s: 'F-blade + perfilado perimetral' },
  { e: '🧔', t: 'Barba esculpida',    s: 'Perfilado + aceite de argán' },
  { e: '✂️', t: 'Textura con volumen', s: 'Corte en capas, dryer' },
  { e: '🪒', t: 'Afeitado clásico',    s: 'Toalla caliente, navaja libre' },
  { e: '💈', t: 'Corte de autor',      s: 'Lectura + peinado' },
  { e: '🧴', t: 'Grooming premium',    s: 'Exfoliación de carbón' }
];

const PASOS = [
  { h: 'Diagnóstico', p: 'Nos sentamos cinco minutos. Miramos el cabello, el encrespado y la línea de nacimiento. No hay turno vacío.' },
  { h: 'El corte',    p: 'Tijera y maquina, alternando. Cada corte sale de un plano, no de una raya al azar.' },
  { h: 'El detalle',  p: 'Perfilado, contornos limpios, cuellos. Lo que separa un corte de un trabajo.' },
  { h: 'El ritual',   p: 'Toalla caliente,utrients y peinado. Te vas viendo mejor de lo que te sentiste.' }
];

const QUOTES = [
  { s: '★★★★★', p: 'Llego con 2 meses sin cortar y salí otro. Matías entendió justo lo que quería sin que supiera explicarlo.', n: 'Dani R.', c: 'Cliente desde 2019' },
  { s: '★★★★★', p: 'El degradado a navaja es otro nivel. Y la barba… pero broma, te deja nuevo.', n: 'Marcos P.', c: 'Cliente' },
  { s: '★★★★★', p: 'Llevo tres sables y nunca más me han tratado así. Cómodo, sin conversación forzada.', n: 'Adrián L.', c: 'Cliente desde 2021' },
  { s: '★★★★★', p: 'El ritual completo vale cada euro. Salí con cara de fin de semana.', n: 'Sergio M.', c: 'Cliente' }
];

/* ---------- render de contenido ---------- */
document.getElementById('servGrid').innerHTML = SERVICIOS.map((s, i) => `
  <article class="serv" data-rv data-tilt style="transition-delay:${i * 60}ms">
    ${s.tag ? `<span class="serv-tag">${s.tag}</span>` : ''}
    <h3>${s.n}</h3><p>${s.d}</p>
    <div class="serv-meta"><span class="serv-price">${s.p}</span><span class="serv-dur">⏱ ${s.t}</span></div>
  </article>`).join('');

document.getElementById('team').innerHTML = BARBEROS.map((b, i) => `
  <article class="barber" data-rv style="transition-delay:${i * 90}ms">
    <div class="barber-av" style="background:${b.g}">
      <span class="barber-emoji">${b.e}</span>
    </div>
    <div class="barber-info">
      <h3>${b.n}</h3><p class="role">${b.r}</p><p>${['Diez años de silla y un archivo de cortes imposible de ordenar.',
        'Aprendió el afeitado clásico en Palermo. Vuelve cada año a afilar su navaja.',
        'Especialista en barbas. Dice que un buen afeitado es medio corte.'][i]}</p>
    </div>
  </article>`).join('');

document.getElementById('gal').innerHTML = GALERIA.map((g, i) => `
  <figure class="gal-item" style="transition-delay:${(i % 3) * 90}ms">
    <div class="gal-card" style="background:linear-gradient(${140 + i * 24}deg,#1d2127,#0d0f12)">
      <span class="gal-emoji">${g.e}</span>
      <figcaption class="gal-cap"><b>${g.t}</b>${g.s}</figcaption>
    </div>
  </figure>`).join('');

document.getElementById('steps').innerHTML = PASOS.map((p, i) => `
  <li class="step" data-rv style="transition-delay:${i * 70}ms">
    <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
    <div><h3>${p.h}</h3><p>${p.p}</p></div>
  </li>`).join('');

document.getElementById('quotes').innerHTML = QUOTES.map((q, i) => `
  <article class="quote" data-rv style="transition-delay:${i * 80}ms">
    <div class="stars">${q.s}</div><p>${q.p}</p>
    <footer><b>${q.n}</b>${q.c}</footer>
  </article>`).join('');

const sel = document.getElementById('f-servicio');
SERVICIOS.forEach(s => { const o = document.createElement('option'); o.value = s.n; o.textContent = `${s.n} · ${s.p}`; sel.appendChild(o); });

/* ---------- reveal al hacer scroll ---------- */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-rv], .gal-item').forEach(el => io.observe(el));

/* hero: letras + reveal */
function playHero() {
  document.querySelectorAll('.hero-copy [data-rv]').forEach((el, i) =>
    setTimeout(() => el.classList.add('in'), reduce ? 0 : 120 + i * 110));
  document.querySelectorAll('.hero-title .w').forEach((w, i) =>
    setTimeout(() => { w.style.transform = 'none'; w.style.opacity = 1; }, reduce ? 0 : 200 + i * 70));
}
playHero();

/* ---------- tilt 3D en tarjetas ---------- */
if (!reduce) {
  document.querySelectorAll('[data-tilt],.barber,.quote').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = `translateY(-8px) perspective(900px) rotateY(${(px - .5) * 13}deg) rotateX(${(.5 - py) * 13}deg)`;
      if (el.classList.contains('serv')) {
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      }
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ---------- nav ---------- */
const nav = document.getElementById('nav');
const onScrollNav = () => nav.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScrollNav, { passive: true }); onScrollNav();

/* ================= ESCENA 3D ================= */
const canvas = document.getElementById('scene');
let hero3d = null;

if (window.THREE && !reduce) {
  try { hero3d = buildScene(canvas); } catch (e) { console.warn('3D no disponible:', e); }
}

function buildScene(cv) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0b0d, 0.055);

  const cam = new THREE.PerspectiveCamera(52, 1, .1, 100);
  cam.position.set(0, .2, 8.4);

  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  scene.add(group);

  /* --- materiales --- */
  const gold = new THREE.MeshStandardMaterial({ color: 0xc9a24a, metalness: .95, roughness: .22 });
  const goldD = new THREE.MeshStandardMaterial({ color: 0x8c6f2a, metalness: .9, roughness: .38 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xd8dde4, metalness: .98, roughness: .12 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x14171b, metalness: .6, roughness: .5 });

  /* --- luz --- */
  scene.add(new THREE.AmbientLight(0x6a7480, .55));
  const key = new THREE.DirectionalLight(0xfff0cf, 2.4); key.position.set(4, 6, 6); scene.add(key);
  const rim = new THREE.PointLight(0xc9a24a, 90, 22); rim.position.set(-5, 2.5, 3); scene.add(rim);
  const back = new THREE.PointLight(0x4a7fd4, 55, 24); back.position.set(4, -3, -5); scene.add(back);
  const pointLight = new THREE.PointLight(0xffffff, 12, 14); pointLight.position.set(0, 2, 3); scene.add(pointLight);

  /* --- LIQUID METAL (torus retorcido) --- */
  const liq = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, .40, 32, 140),
    new THREE.MeshPhysicalMaterial({
      color: 0xc9a24a, metalness: 1, roughness: .16,
      clearcoat: 1, clearcoatRoughness: .12, iridescence: .8, iridescenceIOR: 1.6
    })
  );
  liq.position.set(2.5, .15, 0);
  group.add(liq);

  /* --- TIJERA (scissors) --- */
  const scissors = new THREE.Group();
  const ringG = new THREE.TorusGeometry(.34, .07, 16, 40);
  [-1, 1].forEach(s => {
    const r = new THREE.Mesh(ringG, gold);
    r.position.set(s * .42, -.55, 0);
    scissors.add(r);
  });
  const bladeGeo = new THREE.BoxGeometry(.16, 2.1, .07);
  const bladeMat = steel;
  [-1, 1].forEach((s, i) => {
    const b = new THREE.Mesh(bladeGeo, i ? goldD : bladeMat);
    b.position.set(s * .17, .62, 0);
    b.rotation.z = s * .1;
    scissors.add(b);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(.085, .34, 12), i ? goldD : bladeMat);
    tip.position.set(s * .28, 1.78, 0); tip.rotation.z = s * .1;
    scissors.add(tip);
  });
  const pivot = new THREE.Mesh(new THREE.CylinderGeometry(.11, .11, .17, 20), goldD);
  pivot.rotation.x = Math.PI / 2; pivot.position.set(0, .05, 0);
  scissors.add(pivot);
  scissors.position.set(-2.6, .2, .4);
  scissors.rotation.set(.15, -.5, -.35);
  group.add(scissors);

  /* --- PEINE --- */
  const comb = new THREE.Group();
  const spine = new THREE.Mesh(new THREE.BoxGeometry(2.2, .16, .12), dark);
  comb.add(spine);
  for (let i = 0; i < 15; i++) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.028, .028, .58, 8), dark);
    t.position.set(-1.0 + i * .145, -.36, 0);
    comb.add(t);
  }
  comb.position.set(2.9, -1.9, -.6);
  comb.rotation.set(.2, .3, -.12);
  group.add(comb);

  /* --- NAVIJA --- */
  const razor = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(.085, .07, 1.5, 18), gold);
  handle.rotation.z = .4; razor.add(handle);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .5, 12), goldD);
  neck.position.set(-.3, .82, 0); neck.rotation.z = .4; razor.add(neck);
  const blade = new THREE.Mesh(new THREE.BoxGeometry(.05, .62, .3), steel);
  blade.position.set(-.42, 1.28, 0); razor.add(blade);
  razor.position.set(-3.0, 1.9, -.8);
  razor.rotation.set(.5, .4, -.3);
  group.add(razor);

  /* --- ARO DORADO (decorativo) --- */
  const torus = new THREE.Mesh(new THREE.TorusGeometry(3.4, .035, 12, 90),
    new THREE.MeshStandardMaterial({ color: 0xc9a24a, metalness: 1, roughness: .3, emissive: 0x2a1f08, emissiveIntensity: .4 }));
  torus.position.set(.4, .2, -2.2);
  torus.rotation.x = .5;
  group.add(torus);

  /* --- partículas --- */
  const P = 380, pos = new Float32Array(P * 3);
  for (let i = 0; i < P; i++) {
    pos[i * 3] = (Math.random() - .5) * 16;
    pos[i * 3 + 1] = (Math.random() - .5) * 12;
    pos[i * 3 + 2] = (Math.random() - .5) * 8 - 2;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({
    color: 0xe6d3a0, size: .035, transparent: true, opacity: .55, sizeAttenuation: true
  }));
  scene.add(dust);

  /* --- resize --- */
  function resize() {
    const w = cv.clientWidth || innerWidth, h = cv.clientHeight || innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    /* en móvil alejamos la cámara para que quepa */
    cam.position.z = w < 700 ? 12.5 : (w < 1100 ? 10 : 8.4);
    cam.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  /* --- scroll 3D ligado a la página --- */
  let p = { x: 0, y: 0 }, t = { x: 0, y: 0 };
  function updatePointer() {
    t.x = (innerWidth / 2 ? (pointerX / innerWidth - .5) : 0);
    t.y = (pointerY / innerHeight - .5);
  }
  let pointerX = innerWidth / 2, pointerY = innerHeight / 2;
  addEventListener('pointermove', e => { pointerX = e.clientX; pointerY = e.clientY; }, { passive: true });

  /* --- loop --- */
  const clock = new THREE.Clock();
  function tick() {
    const dt = clock.getDelta();
    const T = clock.elapsedTime;
    updatePointer();

    p.x = lerp(p.x, t.x, .05); p.y = lerp(p.y, t.y, .05);

    /* scroll => rota la escena, se abre la mano, sube la camara */
    const sy = clamp(scrollY / Math.max(1, innerHeight), 0, 3);
    const rotY = sy * .9;
    const rotX = sy * -.42;

    group.rotation.y = rotY + p.x * .34;
    group.rotation.x = rotX + p.y * .2;

    liq.rotation.z = T * .22;
    liq.rotation.x = T * .14;
    liq.position.y = .15 + Math.sin(T * .8) * .22;

    scissors.rotation.y = -.5 + Math.sin(T * .6) * .5 + scrollY * .0012;
    scissors.rotation.z = -.35 + Math.sin(T * .9) * .3;

    comb.rotation.y = .3 + Math.sin(T * .5 + 1) * .6;
    comb.position.y = -1.9 + Math.sin(T * .7) * .25;

    razor.rotation.z = -.3 + Math.sin(T * .8 + 2) * .35;

    torus.rotation.z = T * .08;
    torus.rotation.x = .5 + Math.sin(T * .2) * .3;

    dust.rotation.y = T * .04;
    dust.position.y = Math.sin(T * .2) * .3;

    /* cámara se acerca ligeramente con el scroll */
    cam.position.y = lerp(cam.position.y, .2 + sy * .6, .06);
    cam.lookAt(0, .1, 0);

    renderer.render(scene, cam);
    requestAnimationFrame(tick);
  }
  tick();

  return { scene, renderer };
}

/* si 3D no hay, el hero se ve bien con el gradiente + brillos */
if (!hero3d) document.body.classList.add('no3d');

/* ---------- parallax suave en cards al hacer scroll ---------- */
if (!reduce) {
  document.querySelectorAll('.gal-item').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `translateY(-6px) perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ---------- formulario ---------- */
const form = document.getElementById('formReserva');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.value.trim();
    f.classList.toggle('invalid', bad);
    if (bad && ok) { f.focus(); ok = false; }
  });
  if (!ok) { msg.textContent = 'Revisá los campos marcados.'; msg.className = 'form-msg err'; return; }

  const data = Object.fromEntries(new FormData(form));
  msg.textContent = `¡Listo ${data.nombre.split(' ')[0]}! Te esperamos el ${data.fecha} a las ${data.hora}. Te mandamos confirmación por WhatsApp.`;
  msg.className = 'form-msg ok';
  form.querySelector('button').textContent = 'Reserva confirmada ✓';
  form.querySelector('button').disabled = true;
  setTimeout(() => {
    form.reset();
    form.querySelector('button').textContent = 'Confirmar reserva';
    form.querySelector('button').disabled = false;
  }, 4000);
});

/* ---------- scroll-snap suave para las galerías ---------- */
document.querySelectorAll('.gal').forEach(g => {
  g.addEventListener('click', e => {
    if (e.target.closest('.gal-item')) {
      const it = e.target.closest('.gal-item');
      it.style.transform = 'scale(.96)';
      setTimeout(() => it.style.transform = '', 260);
    }
  });
});

})();