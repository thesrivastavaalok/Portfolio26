// Scroll reveal for cards and projects
const targets = document.querySelectorAll('.card, .project-card, .section > h2, .tags-banner');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  targets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
}

// Stats counter animation
const stats = document.querySelector('.stats');
if (stats && !reduce && 'IntersectionObserver' in window) {
  const so = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    so.disconnect();
    stats.querySelectorAll('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suf = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1200;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + (p === 1 ? suf : '');
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  so.observe(stats);
}
