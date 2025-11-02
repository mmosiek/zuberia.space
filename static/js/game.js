(function() {
  const c = document.getElementById('game-container');
  const f = document.getElementById('game-frame');
  if (!c || !f) return;

  const p = window.location.pathname.split('/');
  const g = p[p.indexOf('games') + 1];
  if (!g) return;

  f.src = `/games/${g}/game.html`;

  const lang = localStorage.getItem("lang") || 
               (["pl", "en"].includes((navigator.language || "pl").split("-")[0].toLowerCase()) 
                ? (navigator.language || "pl").split("-")[0].toLowerCase() 
                : "pl");
  const t = { pl: "Pełen ekran", en: "Fullscreen" };

  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.marginTop = '10px';
  btnContainer.style.justifyContent = 'space-between';
  btnContainer.style.width = '100%';
  c.after(btnContainer);

  const btnFullscreen = document.createElement('button');
  btnFullscreen.textContent = t[lang];
  Object.assign(btnFullscreen.style, {
    cursor: "pointer",
    flex: "1",
    width: '48%'
  });

  btnContainer.appendChild(btnFullscreen);

  btnFullscreen.addEventListener('click', () => {
    const ruffle = window.RufflePlayer;
    if (ruffle && ruffle.requestFullscreen) {
      ruffle.requestFullscreen();
    } else if (c.requestFullscreen) {
      c.requestFullscreen();
    } else if (c.webkitRequestFullscreen) {
      c.webkitRequestFullscreen();
    } else if (c.msRequestFullscreen) {
      c.msRequestFullscreen();
    }
  });

  const restartBtn = document.createElement('button');
  restartBtn.textContent = lang === "pl" ? "Zresetuj grę" : "Restart Game";
  Object.assign(restartBtn.style, {
    cursor: "pointer",
    flex: "1",
    marginLeft: '5px',
    width: '48%'
  });

  btnContainer.appendChild(restartBtn);

  restartBtn.addEventListener('click', () => {
    f.src = `/games/${g}/game.html`;
    console.log("Game restarted.");
  });

})();
