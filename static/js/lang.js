(() => {
  const langs = JSON.parse(document.querySelector(".lang")?.dataset?.langs || "[]");
  const cur = document.documentElement.lang || "";
  const saved = localStorage.lang;
  const pref = (navigator.language || "").split("-")[0].toLowerCase();
  const tgt = saved || (langs.includes(pref) ? pref : cur);
  const setL = l => localStorage.lang = l;

  if (tgt !== cur && langs.includes(tgt)) {
    const p = location.pathname;
    const c = /^\/[^\/]+/.test(p) ? p.replace(/^\/[^\/]+/, "") : p;
    const u = tgt === "pl" ? c : `/${tgt}${c}`;
    setL(tgt);

    fetch(u, { method: "HEAD" })
      .then(r => r.ok ? location.replace(u) : (setL("pl"), location.replace(c)))
      .catch(() => { setL("pl"); location.replace(c) });
  }

  document.querySelectorAll(".lang a").forEach(a =>
    a.addEventListener("click", () => setL(a.dataset.lang))
  );
})();
