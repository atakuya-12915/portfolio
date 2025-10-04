/*　スクロールアニメーション（fade-in）　*/
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2,  // 画面に20%見えたら発火
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

/* ダークモード切替 */
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // アイコン切替
  toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// 詳細ボタンの文字
function toggleDetail(id, btn) {
  const el = document.getElementById(id);
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '閉じる' : '詳細を見る';
}

// 詳細折りたたみ
function toggleDetail(id) {
  const el = document.getElementById(id);
  if (el.classList.contains('show')) {
    el.classList.remove('show');
  } else {
    el.classList.add('show');
  }
}
