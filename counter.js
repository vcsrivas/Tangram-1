/* Anonymous usage counter.
   Sends NO personal data: no ID, no name, no location, no device info.
   Each phone only says "add 1" to a few shared counters:
     devices-total       first time the game is ever opened on a phone
     installs-total      first time it is opened as an installed app (home screen / Play Store)
     users-d-YYYY-MM-DD  once per phone per day   (daily users)
     users-w-YYYY-Wnn    once per phone per week  (weekly users)
     new-d-YYYY-MM-DD    new phones that day
     solved-total        puzzles solved (all players together)
   Days and weeks use India Standard Time. View the numbers on stats.html. */
const COUNTER = { api: 'https://abacus.jasoncameron.dev', ns: 'tangram-vcs-7lava6iw' };

function istParts(ms) {
  const d = new Date((ms || Date.now()) + 5.5 * 3600e3);
  const day = d.toISOString().slice(0, 10);
  // ISO week number
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dow = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - dow);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t - y0) / 864e5 + 1) / 7);
  return { day, week: t.getUTCFullYear() + '-W' + String(wk).padStart(2, '0') };
}
function counterHit(key) {
  return fetch(`${COUNTER.api}/hit/${COUNTER.ns}/${key}`, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' })
    .then(r => { if (!r.ok) throw new Error(r.status); return true; });
}
(function () {
  let st = {};
  try { st = JSON.parse(localStorage.getItem('tg-usage') || '{}'); } catch (e) {}
  const saveSt = () => { try { localStorage.setItem('tg-usage', JSON.stringify(st)); } catch (e) {} };
  const standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true
    || document.referrer.startsWith('android-app://');
  async function run() {
    if (!navigator.onLine) return;
    const { day, week } = istParts();
    const jobs = [];
    // each counter is marked as done only after it was sent, so offline days are retried later
    if (!st.device) jobs.push(['devices-total', () => { st.device = 1; }], ['new-d-' + day, () => {}]);
    if (standalone && !st.install) jobs.push(['installs-total', () => { st.install = 1; }]);
    if (st.day !== day) jobs.push(['users-d-' + day, () => { st.day = day; }]);
    if (st.week !== week) jobs.push(['users-w-' + week, () => { st.week = week; }]);
    for (const [key, done] of jobs) {
      try { await counterHit(key); done(); saveSt(); } catch (e) { return; }
    }
  }
  window.countSolved = function () {
    st.pendingSolved = (st.pendingSolved || 0) + 1; saveSt(); flushSolved();
  };
  async function flushSolved() {
    while (st.pendingSolved > 0 && navigator.onLine) {
      try { await counterHit('solved-total'); st.pendingSolved--; saveSt(); } catch (e) { return; }
    }
  }
  addEventListener('load', () => setTimeout(() => { run(); flushSolved(); }, 1500));
  addEventListener('online', () => { run(); flushSolved(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) run(); });
})();
