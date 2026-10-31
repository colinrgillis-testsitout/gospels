import "./style.css";
import { BOOKS, TRANSLATIONS, CONN, G_PAR, G_OT, G_NT, G_LANG } from "./data.js";

const $ = (id) => document.getElementById(id);
const tabsEl = $("tabs"), ctlEl = $("ctl"), mainEl = $("main"), panel = $("panel"), qEl = $("q"), hdr = document.querySelector("header");
const BOOK = Object.fromEntries(BOOKS.map((b) => [b.id, b]));
const cache = new Map();
let fs = 19, drawnKey = null, renderId = 0;

/* Preferences (per-browser convenience; safe if storage is blocked) */
function pref(key, fallback) { try { return localStorage.getItem("ct:" + key) ?? fallback; } catch { return fallback; } }
function setPref(key, val) { try { localStorage.setItem("ct:" + key, val); } catch { /* ignore */ } }
let tr = pref("tr", "kjv"), cmp = pref("cmp", "");
if (!TRANSLATIONS.some((t) => t.id === tr)) tr = "kjv";
if (cmp && !TRANSLATIONS.some((t) => t.id === cmp)) cmp = "";
if (cmp === tr) cmp = "";

/* Data loading: one JSON file per translation and gospel */
function load(t, book) {
  const key = t + "/" + book;
  if (!cache.has(key)) {
    cache.set(key, fetch(import.meta.env.BASE_URL + "data/" + key + ".json").then((r) => {
      if (!r.ok) throw new Error("Could not load " + key);
      return r.json();
    }).catch((e) => { cache.delete(key); throw e; }));
  }
  return cache.get(key);
}

/* Routing: #john-1 or #john-1-14 */
function route() {
  const p = location.hash.slice(1).split("-");
  const book = BOOK[p[0]] ? p[0] : "john";
  let ch = parseInt(p[1], 10);
  if (!(ch >= 1 && ch <= BOOK[book].chapters)) ch = 1;
  const v = parseInt(p[2], 10);
  return { book, ch, verse: v >= 1 ? v : null };
}
function go(book, ch, verse) {
  const h = "#" + book + "-" + ch + (verse ? "-" + verse : "");
  if (location.hash === h) render(); else location.hash = h;
}
const label = (book, ch, verse) => BOOK[book].name + " " + ch + (verse ? ":" + verse : "");

function adjacent(book, ch, dir) {
  const i = BOOKS.findIndex((b) => b.id === book);
  if (dir < 0) {
    if (ch > 1) return [book, ch - 1];
    return i > 0 ? [BOOKS[i - 1].id, BOOKS[i - 1].chapters] : null;
  }
  if (ch < BOOK[book].chapters) return [book, ch + 1];
  return i < BOOKS.length - 1 ? [BOOKS[i + 1].id, 1] : null;
}

/* Header: book tabs + chapter / translation controls */
function el(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  e.append(...kids);
  return e;
}
function drawHeader(r) {
  tabsEl.textContent = "";
  BOOKS.forEach((b) => {
    const t = el("button", { className: "tab", textContent: b.name });
    t.setAttribute("role", "tab"); t.setAttribute("aria-selected", String(b.id === r.book));
    t.onclick = () => { qEl.value = ""; go(b.id, b.id === r.book ? r.ch : 1); };
    tabsEl.appendChild(t);
  });
  ctlEl.textContent = "";
  const prev = adjacent(r.book, r.ch, -1), next = adjacent(r.book, r.ch, 1);
  const pb = el("button", { className: "iconbtn", textContent: "‹", disabled: !prev });
  pb.setAttribute("aria-label", "Previous chapter"); pb.onclick = () => { qEl.value = ""; go(prev[0], prev[1]); };
  const nb = el("button", { className: "iconbtn", textContent: "›", disabled: !next });
  nb.setAttribute("aria-label", "Next chapter"); nb.onclick = () => { qEl.value = ""; go(next[0], next[1]); };
  const chSel = el("select", {});
  chSel.setAttribute("aria-label", "Chapter");
  for (let i = 1; i <= BOOK[r.book].chapters; i++) chSel.appendChild(el("option", { value: i, textContent: "Chapter " + i, selected: i === r.ch }));
  chSel.onchange = () => { qEl.value = ""; go(r.book, Number(chSel.value)); };
  const trSel = el("select", {});
  trSel.setAttribute("aria-label", "Translation");
  TRANSLATIONS.forEach((t) => trSel.appendChild(el("option", { value: t.id, textContent: t.name, selected: t.id === tr })));
  trSel.onchange = () => { tr = trSel.value; if (cmp === tr) cmp = ""; setPref("tr", tr); setPref("cmp", cmp); afterPrefChange(); };
  const cmpSel = el("select", {});
  cmpSel.setAttribute("aria-label", "Compare with");
  cmpSel.appendChild(el("option", { value: "", textContent: "Compare: off", selected: !cmp }));
  TRANSLATIONS.filter((t) => t.id !== tr).forEach((t) => cmpSel.appendChild(el("option", { value: t.id, textContent: "+ " + t.name, selected: t.id === cmp })));
  cmpSel.onchange = () => { cmp = cmpSel.value; setPref("cmp", cmp); afterPrefChange(); };
  ctlEl.append(pb, chSel, nb, trSel, cmpSel);
  document.documentElement.style.setProperty("--hdr", hdr.offsetHeight + "px");
}
function afterPrefChange() {
  drawnKey = null;
  if (qEl.value.trim()) runSearch(); else render();
}

/* Text */
function drawText(r, data, alt) {
  const T = TRANSLATIONS.find((t) => t.id === tr);
  const verses = data[r.ch - 1];
  mainEl.textContent = "";
  const h = el("h2", { className: "ref", textContent: BOOK[r.book].name + " " + r.ch });
  const s = el("div", { className: "sub", textContent: T.full + (alt ? " with " + TRANSLATIONS.find((t) => t.id === cmp).name : "") });
  const t = el("div", { className: "text" + (alt ? " cmp" : "") });
  verses.forEach((txt, i) => {
    const n = i + 1;
    const sup = el("sup", { textContent: n });
    const body = txt || "(This verse has no text in this translation.)";
    const sp = el("span", { className: "v" + (txt ? "" : " none"), id: "v" + n });
    sp.append(sup, body + " ");
    if (alt) {
      const wrap = el("div", { className: "v vrow", id: "v" + n });
      const main = el("div", { className: "vmain" }); main.append(sup.cloneNode(true), body);
      const a = alt[r.ch - 1][i];
      const second = el("div", { className: "valt" + (a ? "" : " none") });
      second.append(el("span", { className: "tname", textContent: TRANSLATIONS.find((x) => x.id === cmp).name }), a || "(no text in this translation)");
      wrap.append(main, second);
      wrap.onclick = () => toggleVerse(r, n);
      t.appendChild(wrap);
    } else {
      sp.onclick = () => toggleVerse(r, n);
      t.appendChild(sp);
    }
  });
  const hint = el("div", { className: "hint", textContent: "Tap any verse to see its connections." });
  const prev = adjacent(r.book, r.ch, -1), next = adjacent(r.book, r.ch, 1);
  const nav = el("div", { className: "nav" });
  const pb = el("button", { textContent: prev ? "← " + label(prev[0], prev[1]) : "" });
  const nb = el("button", { textContent: next ? label(next[0], next[1]) + " →" : "" });
  pb.style.visibility = prev ? "visible" : "hidden"; nb.style.visibility = next ? "visible" : "hidden";
  pb.onclick = () => go(prev[0], prev[1]); nb.onclick = () => go(next[0], next[1]);
  nav.append(pb, nb);
  mainEl.append(h, s, t, hint, nav);
}
function toggleVerse(r, n) {
  const cur = route();
  if (cur.book === r.book && cur.ch === r.ch && cur.verse === n) go(r.book, r.ch); else go(r.book, r.ch, n);
}

/* Connections panel */
function drawPanel(r) {
  panel.textContent = "";
  document.querySelectorAll("#main .v").forEach((e) => e.classList.toggle("sel", Number(e.id.slice(1)) === r.verse));
  const wide = window.innerWidth >= 900;
  if (!r.verse) {
    mainEl.style.paddingBottom = "";
    if (wide) {
      panel.classList.add("open");
      panel.append(el("h2", { textContent: "Connections" }), el("div", { className: "empty", textContent: "Select a verse to see parallels, Old Testament links and language notes." }));
    } else panel.classList.remove("open");
    return;
  }
  panel.classList.add("open");
  mainEl.style.paddingBottom = wide ? "" : "52vh";
  const close = el("button", { className: "iconbtn close", textContent: "✕" });
  close.setAttribute("aria-label", "Close"); close.onclick = () => go(r.book, r.ch);
  panel.append(el("h2", { textContent: "Connections" }), el("div", { className: "sel-ref" }, el("span", { textContent: label(r.book, r.ch, r.verse) }), close));
  const items = CONN.filter((c) => c.book === r.book && c.ch === r.ch && r.verse >= c.from && r.verse <= c.to);
  if (!items.length) {
    panel.appendChild(el("div", { className: "empty", textContent: "No connections for this verse yet. Cross-references are being added passage by passage." }));
    return;
  }
  [G_PAR, G_OT, G_NT, G_LANG].forEach((g) => {
    const list = items.filter((c) => c.g === g);
    if (!list.length) return;
    const box = el("div", { className: "group" }, el("h3", { textContent: g }));
    list.forEach((c) => {
      const it = el("div", { className: "item" }, el("b", { textContent: c.ref }), el("span", { className: "note", textContent: c.note }));
      if (c.go) {
        const row = el("div", { className: "gorow" });
        c.go.forEach(([b, ch, v]) => {
          const btn = el("button", { textContent: label(b, ch, v) });
          btn.onclick = () => { qEl.value = ""; go(b, ch, v); };
          row.appendChild(btn);
        });
        it.appendChild(row);
      }
      box.appendChild(it);
    });
    panel.appendChild(box);
  });
}

/* Render */
async function render() {
  if (qEl.value.trim()) return;
  const id = ++renderId;
  const r = route();
  drawHeader(r);
  const key = [r.book, r.ch, tr, cmp].join("|");
  if (drawnKey !== key) {
    mainEl.textContent = "";
    mainEl.appendChild(el("div", { className: "sub", textContent: "Loading…" }));
    try {
      const [data, alt] = await Promise.all([load(tr, r.book), cmp ? load(cmp, r.book) : null]);
      if (id !== renderId) return;
      drawText(r, data, alt);
      drawnKey = key;
      window.scrollTo(0, 0);
    } catch {
      if (id !== renderId) return;
      mainEl.textContent = "";
      mainEl.appendChild(el("div", { className: "sub", textContent: "Sorry, this chapter could not be loaded. Check your connection and try again." }));
      return;
    }
  }
  drawPanel(r);
  if (r.verse) { const v = $("v" + r.verse); if (v) v.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
}

/* Search across all four gospels in the current translation */
let searchTimer = 0;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
async function runSearch() {
  const q = qEl.value.trim();
  if (q.length < 2) {
    if (!q) { drawnKey = null; render(); }
    return;
  }
  drawnKey = null;
  panel.classList.remove("open"); mainEl.style.paddingBottom = "";
  mainEl.textContent = "";
  mainEl.appendChild(el("div", { className: "sub", textContent: "Searching…" }));
  let all;
  try { all = await Promise.all(BOOKS.map((b) => load(tr, b.id))); }
  catch { mainEl.textContent = "Search could not load the text. Check your connection."; return; }
  if (qEl.value.trim() !== q) return;
  const re = new RegExp(esc(q), "ig");
  const hits = [];
  BOOKS.forEach((b, bi) => all[bi].forEach((chap, ci) => chap.forEach((txt, vi) => {
    re.lastIndex = 0;
    if (txt && re.test(txt)) hits.push([b.id, ci + 1, vi + 1, txt]);
  })));
  const LIMIT = 100;
  const box = el("div", { className: "results" });
  hits.slice(0, LIMIT).forEach(([b, c, v, txt]) => {
    const body = el("div", {});
    let last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(txt))) {
      body.append(txt.slice(last, m.index), el("mark", { textContent: m[0] }));
      last = m.index + m[0].length;
    }
    body.append(txt.slice(last));
    const row = el("div", { className: "r" }, el("b", { textContent: label(b, c, v) }), body);
    row.onclick = () => { qEl.value = ""; drawnKey = null; go(b, c, v); };
    box.appendChild(row);
  });
  const T = TRANSLATIONS.find((t) => t.id === tr).name;
  const head = el("div", { className: "sub", textContent: hits.length + (hits.length === 1 ? " verse" : " verses") + " in " + T + (hits.length > LIMIT ? " (showing the first " + LIMIT + ")" : "") });
  mainEl.textContent = "";
  mainEl.append(head, box);
}
qEl.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(runSearch, 200); });

/* Controls */
function setFs(n) { fs = Math.max(14, Math.min(28, n)); document.documentElement.style.setProperty("--fs", fs + "px"); }
$("bigger").onclick = () => setFs(fs + 2);
$("smaller").onclick = () => setFs(fs - 2);
$("theme").onclick = () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
};
window.addEventListener("hashchange", render);
window.addEventListener("resize", () => { if (!qEl.value.trim() && drawnKey) drawPanel(route()); });
render();
