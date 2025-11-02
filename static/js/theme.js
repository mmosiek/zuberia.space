document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("theme-select");

  let savedTheme = (localStorage.getItem("theme") || "standard").toLowerCase();

  function applyTheme(name) {
    document.documentElement.className = name;

    const link = document.getElementById("theme-link") || (() => {
      const l = document.createElement("link");
      l.id = "theme-link";
      l.rel = "stylesheet";
      document.head.appendChild(l);
      return l;
    })();

    link.href = `/css/${name}.css`;
    link.onerror = () => {
      if (name !== "standard") {
        savedTheme = "standard";
        localStorage.setItem("theme", "standard");
        applyTheme("standard");
      }
    };
  }

  applyTheme(savedTheme);

  if (select) {
    if ([...select.options].some(opt => opt.value === savedTheme)) {
      select.value = savedTheme;
    } else {
      select.value = "standard";
    }

    select.addEventListener("change", (e) => {
      const theme = e.target.value;
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  }
});
