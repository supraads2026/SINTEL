import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const motion = () => !root.classList.contains('no-motion');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let lenis: Lenis | null = null;
let cleanups: (() => void)[] = [];
let firstLoad = true;

// ───────────────── Smooth scroll (persists across pages) ─────────────────
function initLenis() {
  if (!motion() || lenis) return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ───────────────── Preloader (first visit per session) ─────────────────
function runPreloader(): Promise<void> {
  const pl = document.getElementById('preloader');
  if (!pl || root.classList.contains('seen')) return Promise.resolve();
  lenis?.stop();
  const count = document.getElementById('pl-count')!;
  const bar = document.getElementById('pl-bar')!;
  const state = { v: 0 };
  return new Promise((resolve) => {
    const finish = () => {
      try { sessionStorage.setItem('sintel-seen', '1'); } catch {}
      gsap.to(pl, {
        yPercent: -100, duration: 0.85, ease: 'expo.inOut', delay: 0.1,
        onComplete: () => { root.classList.add('seen'); pl.style.transform = ''; lenis?.start(); resolve(); },
      });
    };
    const tick = () => { count.textContent = String(Math.round(state.v)).padStart(2, '0'); bar.style.transform = `scaleX(${state.v / 100})`; };
    // Count to ~80 while loading, then to 100 once the page has loaded
    const t1 = gsap.to(state, { v: 82, duration: 1.4, ease: 'power2.out', onUpdate: tick });
    const done = () => { t1.kill(); gsap.to(state, { v: 100, duration: 0.4, ease: 'power2.inOut', onUpdate: tick, onComplete: finish }); };
    const minTime = new Promise((r) => setTimeout(r, 900));
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }));
    Promise.all([minTime, Promise.race([loaded, new Promise((r) => setTimeout(r, 3500))])]).then(done);
  });
}

// ───────────────── Page-transition curtain ─────────────────
const curtain = () => document.getElementById('curtain')!;
let curtainShown = false;
function curtainIn(name: string) {
  const c = curtain();
  curtainShown = true;
  document.getElementById('curtain-name')!.textContent = name;
  return gsap.timeline()
    .set(c, { clipPath: 'inset(100% 0 0 0)' })
    .to(c, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.inOut' })
    .to(c.querySelector('.in'), { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
    .then(() => {});
}
function curtainOut() {
  const c = curtain();
  if (!curtainShown) return;
  curtainShown = false;
  gsap.timeline()
    .to(c.querySelector('.in'), { opacity: 0, duration: 0.25, delay: 0.15 })
    .to(c, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.05')
    .set(c, { clipPath: 'inset(100% 0 0 0)' });
}

const pageNameFor = (href: string, link?: Element | null) => {
  const t = link?.getAttribute('data-name') || link?.textContent?.replace(/\s+/g, ' ').trim() || '';
  if (t && t.length < 40) return t.replace(/→/g, '').trim();
  return 'SINTEL';
};

document.addEventListener('astro:before-preparation', (ev: any) => {
  const src: Element | undefined = ev.sourceElement;
  const morph = src?.closest?.('[data-morph]');
  if (!motion() || morph) return; // shared-element morph handles these
  const orig = ev.loader;
  ev.loader = async () => {
    await Promise.all([curtainIn(pageNameFor(ev.to.pathname, src?.closest?.('a'))), orig()]);
  };
});

document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((f) => f());
  cleanups = [];
  ScrollTrigger.getAll().forEach((t) => t.kill());
  document.body.classList.remove('menu-open');
});

document.addEventListener('astro:after-swap', () => {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
});

// ───────────────── Per-page setup ─────────────────
document.addEventListener('astro:page-load', async () => {
  initLenis();
  initMenu();
  setActiveNav();
  initNavIndicator();
  initToTop();
  initForms();
  initMaps();
  initFilters();
  initToc();
  initHeroVideos();

  if (firstLoad) { firstLoad = false; await runPreloader(); }
  else curtainOut();

  if (!motion()) {
    gsap.set('[data-reveal], [data-hero-in], .line > span', { clearProps: 'all', opacity: 1 });
    initScrub(false);
    return;
  }
  heroIn();
  initSplits();
  initReveals();
  initWords();
  initSteps();
  initParallax();
  initHoverLists();
  initTilt();
  initMagnetic();
  initHeader();
  initScrub(true);
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

function heroIn() {
  const hero = document.querySelector('.hero, .page-hero');
  if (!hero) return;
  const lines = hero.querySelectorAll('h1 .line > span');
  const ins = hero.querySelectorAll('[data-hero-in]');
  const tl = gsap.timeline({ delay: 0.1 });
  tl.from(lines, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.12 });
  tl.from(ins, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, '-=0.8');
  tl.from(hero.querySelectorAll('.island-tag'), { opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' }, '-=0.6');
}

function initSplits() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (!el.dataset.splitDone) {
      el.innerHTML = `<span class="line"><span>${el.innerHTML}</span></span>`;
      el.dataset.splitDone = '1';
    }
    gsap.from(el.querySelectorAll('.line > span'), {
      yPercent: 110, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
  document.querySelectorAll<HTMLElement>('section:not(.hero):not(.page-hero) h2 .line > span').forEach((s) => {
    if (s.closest('[data-split]')) return;
    gsap.from(s, { yPercent: 110, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: s.parentElement, start: 'top 90%' } });
  });
}

function initReveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }),
  });
}

function initWords() {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    if (!el.dataset.wordsDone) {
      const walk = (node: Node) => {
        node.childNodes.forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent!.split(/(\s+)/).forEach((w) => {
              if (!w.trim()) { frag.append(w); return; }
              const s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.append(s);
            });
            n.replaceWith(frag);
          } else walk(n);
        });
      };
      walk(el);
      el.dataset.wordsDone = '1';
    }
    gsap.to(el.querySelectorAll('.w'), {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });
}

function initSteps() {
  document.querySelectorAll('.step').forEach((s) => {
    ScrollTrigger.create({ trigger: s, start: 'top 85%', once: true, onEnter: () => s.classList.add('in') });
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  document.querySelectorAll<HTMLElement>('.hero-media .stage').forEach((el) => {
    gsap.to(el, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: el.closest('.hero'), start: 'top top', end: 'bottom top', scrub: true } });
  });
}

// Loan / property-type lists show their image as an in-row thumbnail (CSS hover zoom),
// so there is no cursor-following image any more.
function initHoverLists() {}

function initTilt() {
  if (!canHover) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 1000 });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    el.addEventListener('mouseleave', () => { rx(0); ry(0); });
  });
}

function initMagnetic() {
  if (!canHover) return;
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    if (el.dataset.mag) return;
    el.dataset.mag = '1';
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('mouseleave', () => { x(0); y(0); });
  });
}

// ───────────────── Header, menu, nav ─────────────────
let headerBound = false;
function initHeader() {
  const h = document.getElementById('site-header')!;
  const update = (y: number, dir: number) => {
    h.classList.toggle('scrolled', y > 40);
    h.classList.toggle('hide', y > 400 && dir > 0 && !document.body.classList.contains('menu-open'));
  };
  update(window.scrollY, 0);
  if (headerBound) return;
  headerBound = true;
  let last = window.scrollY;
  const onScroll = () => { const y = window.scrollY; update(y, y - last); last = y; };
  window.addEventListener('scroll', onScroll, { passive: true });
}

let menuBound = false;
function initMenu() {
  if (menuBound) return;
  menuBound = true;
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn')!;
  const menu = document.getElementById('mobile-menu')!;
  const set = (open: boolean) => {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) lenis?.stop(); else lenis?.start();
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('menu-open')));
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
}

function setActiveNav() {
  const base = (import.meta.env.BASE_URL as string).replace(/\/$/, '');
  const path = location.pathname.slice(base.length) || '/';
  document.querySelectorAll('.nav .nav-item').forEach((item) => {
    const a = item.querySelector<HTMLAnchorElement>('a.nav-link')!;
    const p = new URL(a.href).pathname.slice(base.length);
    item.classList.toggle('active', p !== '/' && path.startsWith(p));
  });
}

let navBound = false;
function initNavIndicator() {
  const nav = document.querySelector<HTMLElement>('.nav');
  const ind = nav?.querySelector<HTMLElement>('.nav-ind');
  if (!nav || !ind) return;
  const moveTo = (el: HTMLElement | null) => {
    if (!el) { ind.style.opacity = '0'; return; }
    const r = el.getBoundingClientRect(), n = nav.getBoundingClientRect();
    ind.style.opacity = '1';
    ind.style.width = `${r.width - 28}px`;
    ind.style.transform = `translateX(${r.left - n.left + 14}px)`;
  };
  const active = () => nav.querySelector<HTMLElement>('.nav-item.active > .nav-link');
  moveTo(active());
  if (navBound) return;
  navBound = true;
  nav.querySelectorAll<HTMLElement>('.nav-item > .nav-link').forEach((a) => a.addEventListener('mouseenter', () => moveTo(a)));
  nav.addEventListener('mouseleave', () => moveTo(active()));
}

let topBound = false;
function initToTop() {
  if (topBound) return;
  topBound = true;
  const b = document.querySelector<HTMLButtonElement>('.to-top')!;
  window.addEventListener('scroll', () => b.classList.toggle('show', window.scrollY > window.innerHeight), { passive: true });
  b.addEventListener('click', () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' })));
}

// ───────────────── Video ─────────────────
function initHeroVideos() {
  document.querySelectorAll<HTMLVideoElement>('video[data-hero-video]').forEach((v) => {
    if (!motion()) { v.remove(); return; }
    whenIdle(() => {
    v.preload = 'auto';
    v.play().then(() => v.previousElementSibling?.classList.contains('poster') && gsap.to(v.previousElementSibling, { opacity: 0, duration: 0.6, delay: 0.3 })).catch(() => {});
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    cleanups.push(() => io.disconnect());
    });
  });
}

function whenIdle(fn: () => void) {
  const go = () => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
  if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
}

function initScrub(on: boolean) {
  const sec = document.querySelector<HTMLElement>('[data-scrub]');
  if (!sec) return;
  const v = sec.querySelector('video')!;
  if (!on) { v.remove(); return; }
  v.preload = 'auto';
  v.load();
  const setup = () => {
    const dur = v.duration || 5.5;
    let target = 0;
    let raf = 0;
    const apply = () => { raf = 0; if (Math.abs(v.currentTime - target) > 0.01) v.currentTime = target; };
    ScrollTrigger.create({
      trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: (st) => { target = st.progress * (dur - 0.05); if (!raf) raf = requestAnimationFrame(apply); },
    });
    gsap.to(sec.querySelector('img'), { opacity: 0, duration: 0.4 });
  };
  if (v.readyState >= 1) setup(); else v.addEventListener('loadedmetadata', setup, { once: true });
}

// ───────────────── Forms ─────────────────
function formToText(f: HTMLFormElement) {
  const d = new FormData(f);
  const lines = [
    'Hi SINTEL, I would like to enquire.',
    d.get('name') && `Name: ${d.get('name')}`,
    d.get('mobile') && `Mobile: ${d.get('mobile')}`,
    d.get('interested_in') && `Interested in: ${d.get('interested_in')}`,
    d.get('need') && `Need: ${d.get('need')}`,
    ...[...d.entries()].filter(([k]) => !['access_key', 'subject', 'botcheck', 'name', 'mobile', 'interested_in', 'need', 'message', 'consent'].includes(k)).map(([k, v]) => v && `${k.replace(/_/g, ' ')}: ${v}`),
    d.get('message') && `Message: ${d.get('message')}`,
  ].filter(Boolean);
  return lines.join('\n');
}
const waNumber = () => (document.querySelector<HTMLAnchorElement>('.wa-float')!.href.match(/wa\.me\/(\d+)/) || [])[1];

function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-enquiry]').forEach((f) => {
    if (f.dataset.bound) return;
    f.dataset.bound = '1';
    const status = f.querySelector<HTMLElement>('.form-status')!;
    const say = (t: string, cls = '') => { status.textContent = t; status.className = `form-status full ${cls}`; };
    f.querySelector('[data-wa-send]')?.addEventListener('click', () => {
      window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(formToText(f))}`, '_blank', 'noopener');
    });
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      const key = (f.querySelector<HTMLInputElement>('[name=access_key]')!.value || '').trim();
      if (!key) {
        // No email service configured yet: send the enquiry on WhatsApp instead.
        window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(formToText(f))}`, '_blank', 'noopener');
        say('Opening WhatsApp with your enquiry…', 'ok');
        return;
      }
      say('Sending…');
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) });
        const j = await res.json();
        if (j.success) { f.reset(); say('Thank you. We have your enquiry and will call you back soon.', 'ok'); }
        else throw new Error(j.message);
      } catch {
        say('Sorry, that did not send. Please try WhatsApp or call us.', 'err');
      }
    });
  });
}

function initMaps() {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((box) => {
    box.querySelector('button')?.addEventListener('click', () => {
      box.innerHTML = `<iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(box.dataset.map!)}&output=embed"></iframe>`;
    }, { once: true });
  });
}

function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filters]').forEach((bar) => {
    const grid = document.querySelector<HTMLElement>(bar.dataset.filters!)!;
    bar.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.addEventListener('click', () => {
      bar.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const k = b.dataset.k;
      grid.querySelectorAll<HTMLElement>('.prop-card').forEach((c) => { c.hidden = !!k && k !== 'all' && c.dataset.type !== k; });
      ScrollTrigger.refresh();
    }));
  });
}

function initToc() {
  const toc = document.querySelector<HTMLElement>('.toc');
  if (!toc) return;
  toc.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector<HTMLElement>(a.hash);
      if (!t) return;
      e.preventDefault();
      t.querySelector('details')?.setAttribute('open', '');
      lenis ? lenis.scrollTo(t, { offset: -100 }) : t.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
