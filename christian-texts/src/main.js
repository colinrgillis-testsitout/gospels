import "./style.css";
import { P, ORDER, C, G_PAR, G_OT, G_NT, G_LANG } from "./data.js";

const $ = (id) => document.getElementById(id);
const tabsEl = $("tabs"), mainEl = $("main"), panel = $("panel"), qEl = $("q");
let fs = 19, drawnBook = null;

function state() {
  const parts = location.hash.slice(1).split("-");
  let book = parts[0];
  if (!P[book]) book = "john";
  const v = parseInt(parts[2], 10);
  const verse = v >= 1 && v <= P[book].verses.length ? v : null;
  return { book, verse };
}
function go(book, verse) {
  location.hash = book + "-" + P[book].ch + (verse ? "-" + verse : "");
}
function label(book, verse) {
  return P[book].name + " " + P[book].ch + (verse ? ":" + verse : ":" + P[book].span);
}

function drawTabs(book) {
  tabsEl.textContent = "";
  ORDER.forEach((b) => {
    const t = document.createElement("button");
    t.className = "tab"; t.setAttribute("role", "tab");
    t.setAttribute("aria-selected", String(b === book));
    t.textContent = P[b].name;
    t.onclick = () => { qEl.value = ""; go(b); };
    tabsEl.appendChild(t);
  });
}

function drawText(book) {
  const p = P[book];
  mainEl.textContent = "";
  const h = document.createElement("h2"); h.className = "ref"; h.textContent = p.name + " " + p.ch + ":" + p.span;
  const s = document.createElement("div"); s.className = "sub"; s.textContent = p.title + " · KJV";
  const t = document.createElement("div"); t.className = "text"; t.style.setProperty("--fs", fs + "px");
  p.verses.forEach((txt, i) => {
    const sp = document.createElement("span"); sp.className = "v"; sp.id = "v" + (i + 1);
    const sup = document.createElement("sup"); sup.textContent = i + 1;
    sp.append(sup, txt + " ");
    sp.onclick = () => {
      const cur = state();
      if (cur.verse === i + 1) go(book); else go(book, i + 1);
    };
    t.appendChild(sp);
  });
  const hint = document.createElement("div"); hint.className = "hint";
  hint.textContent = "Tap any verse to see its connections.";
  const nav = document.createElement("div"); nav.className = "nav";
  const i = ORDER.indexOf(book);
  const prev = document.createElement("button"), next = document.createElement("button");
  prev.textContent = i > 0 ? "← " + P[ORDER[i - 1]].name : "";
  next.textContent = i < 3 ? P[ORDER[i + 1]].name + " →" : "";
  prev.style.visibility = i > 0 ? "visible" : "hidden";
  next.style.visibility = i < 3 ? "visible" : "hidden";
  prev.onclick = () => go(ORDER[i - 1]); next.onclick = () => go(ORDER[i + 1]);
  nav.append(prev, next);
  mainEl.append(h, s, t, hint, nav);
}

function drawPanel(book, verse) {
  panel.textContent = "";
  document.querySelectorAll(".v").forEach((el) => el.classList.toggle("sel", Number(el.id.slice(1)) === verse));
  if (!verse) { panel.classList.remove("open"); if (window.innerWidth >= 900) showIdle(); mainEl.style.paddingBottom = ""; return; }
  panel.classList.add("open");
  mainEl.style.paddingBottom = window.innerWidth < 900 ? "52vh" : "";
  const head = document.createElement("div"); head.className = "sel-ref";
  const r = document.createElement("span"); r.textContent = label(book, verse);
  const x = document.createElement("button"); x.className = "iconbtn close"; x.textContent = "✕"; x.setAttribute("aria-label", "Close");
  x.onclick = () => go(book);
  head.append(r, x);
  const h2 = document.createElement("h2"); h2.textContent = "Connections";
  panel.append(h2, head);
  const items = (C[book] || []).filter((c) => verse >= c.from && verse <= c.to);
  if (!items.length) {
    const e = document.createElement("div"); e.className = "empty";
    e.textContent = "No connections in the sample data for this verse yet.";
    panel.appendChild(e); return;
  }
  [G_PAR, G_OT, G_NT, G_LANG].forEach((g) => {
    const list = items.filter((c) => c.g === g);
    if (!list.length) return;
    const box = document.createElement("div"); box.className = "group";
    const gh = document.createElement("h3"); gh.textContent = g; box.appendChild(gh);
    list.forEach((c) => {
      const it = document.createElement("div"); it.className = "item";
      const b = document.createElement("b"); b.textContent = c.ref; it.appendChild(b);
      if (c.tag) { const tg = document.createElement("span"); tg.className = "tag"; tg.textContent = c.tag; it.appendChild(tg); }
      const n = document.createElement("span"); n.className = "note"; n.textContent = c.note; it.appendChild(n);
      if (c.go) {
        const btn = document.createElement("button"); btn.textContent = "Open " + label(c.go[0], c.go[1]);
        btn.onclick = () => go(c.go[0], c.go[1]);
        it.appendChild(btn);
      }
      box.appendChild(it);
    });
    panel.appendChild(box);
  });
}
function showIdle() {
  panel.classList.add("open");
  const h2 = document.createElement("h2"); h2.textContent = "Connections";
  const e = document.createElement("div"); e.className = "empty";
  e.textContent = "Select a verse to see parallels, Old Testament links and language notes.";
  panel.append(h2, e);
}

function render() {
  const { book, verse } = state();
  if (qEl.value.trim()) return;
  drawTabs(book);
  if (drawnBook !== book) { drawText(book); drawnBook = book; window.scrollTo(0, 0); }
  drawPanel(book, verse);
  if (verse) { const el = $("v" + verse); if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
}

/* Search */
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
qEl.addEventListener("input", () => {
  const q = qEl.value.trim();
  if (!q) { drawnBook = null; render(); return; }
  const re = new RegExp(esc(q), "ig");
  mainEl.textContent = ""; panel.classList.remove("open"); mainEl.style.paddingBottom = "";
  const box = document.createElement("div"); box.className = "results";
  let n = 0;
  ORDER.forEach((b) => P[b].verses.forEach((txt, i) => {
    if (!txt.match(re)) return;
    n++;
    const r = document.createElement("div"); r.className = "r";
    const bold = document.createElement("b"); bold.textContent = label(b, i + 1);
    const body = document.createElement("div");
    let last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(txt))) {
      body.append(txt.slice(last, m.index));
      const mk = document.createElement("mark"); mk.textContent = m[0]; body.appendChild(mk);
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    body.append(txt.slice(last));
    r.append(bold, body);
    r.onclick = () => { qEl.value = ""; drawnBook = null; go(b, i + 1); render(); };
    box.appendChild(r);
  }));
  const head = document.createElement("div"); head.className = "sub";
  head.textContent = n + (n === 1 ? " result" : " results") + " in the loaded passages";
  mainEl.append(head, box);
});

/* Controls */
$("bigger").onclick = () => { fs = Math.min(28, fs + 2); document.querySelector(".text") && document.querySelector(".text").style.setProperty("--fs", fs + "px"); };
$("smaller").onclick = () => { fs = Math.max(14, fs - 2); document.querySelector(".text") && document.querySelector(".text").style.setProperty("--fs", fs + "px"); };
$("theme").onclick = () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
};
window.addEventListener("hashchange", render);
window.addEventListener("resize", () => { const s = state(); if (!qEl.value.trim()) drawPanel(s.book, s.verse); });
render();
