function enregistrerScore(chapitre, score, total) {
  let progression = JSON.parse(localStorage.getItem("progressionMaths")) || {};

  progression[chapitre] = {
    score: score,
    total: total,
    date: new Date().toLocaleDateString()
  };

  localStorage.setItem("progressionMaths", JSON.stringify(progression));
}

(function activerRenduMaths() {
  if (window.MathJax) return;

  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    }
  };

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
  script.async = true;
  script.id = 'mathjax-script';
  document.head.appendChild(script);
})();
