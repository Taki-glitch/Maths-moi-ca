const PROGRAMME_FOCUS = {
  "6ème": "Consolider le sens des nombres, les grandeurs, la géométrie plane et l'organisation de données.",
  "5ème": "Approfondir les fractions, la proportionnalité, la géométrie et l'analyse de données.",
  "4ème": "Structurer le calcul littéral, les puissances, les équations et les transformations.",
  "3ème": "Préparer le brevet avec fonctions, théorèmes (Thalès/Pythagore), trigonométrie et probabilités.",
  "2nde": "Installer les bases du lycée : fonctions, géométrie repérée, statistiques-probas et algorithmique.",
  "1ère": "Développer les outils de spécialité : dérivation, suites, probabilités et géométrie vectorielle.",
  "Terminale": "Maîtriser l'analyse, les probabilités continues, les suites et les outils de démonstration.",
};

const TOPIC_RULES = [
  {
    test: /(fraction)/,
    def: "Une fraction représente un quotient. On l'utilise pour exprimer une part, un rapport ou un nombre rationnel.",
    methods: [
      "Identifier numérateur et dénominateur, puis vérifier que le dénominateur est non nul.",
      "Simplifier avec un diviseur commun avant de calculer.",
      "Mettre au même dénominateur pour additionner ou soustraire.",
    ],
    traps: ["Confondre simplifier et diviser uniquement le numérateur.", "Oublier les priorités de calcul."],
    flash: [["Fraction irréductible", "Fraction dont le numérateur et le dénominateur sont premiers entre eux."], ["Ajouter deux fractions", "On passe par un dénominateur commun."], ["Multiplier des fractions", "On multiplie numérateurs entre eux et dénominateurs entre eux."], ["Inverser une fraction", "On échange numérateur et dénominateur (si non nul)."]],
  },
  {
    test: /(proba|probabilit)/,
    def: "Une probabilité mesure la chance qu'un événement se réalise. Elle est comprise entre 0 et 1.",
    methods: ["Lister les issues de l'expérience aléatoire.", "Déterminer les issues favorables à l'événement.", "Calculer avec une formule adaptée : équiprobabilité, arbre, loi."],
    traps: ["Additionner des probabilités incompatibles avec une mauvaise formule.", "Ne pas vérifier que la somme des probabilités vaut 1."],
    flash: [["Événement certain", "Probabilité 1."], ["Événement impossible", "Probabilité 0."], ["Équiprobabilité", "P(A)=nombre d'issues favorables / nombre d'issues possibles."], ["Complémentaire", "P(Ā)=1-P(A)."]],
  },
  {
    test: /(statistique)/,
    def: "La statistique décrit une série de données à l'aide d'indicateurs (effectifs, moyenne, médiane, étendue...).",
    methods: ["Organiser les données dans un tableau.", "Calculer les indicateurs demandés.", "Interpréter les résultats dans le contexte."],
    traps: ["Confondre moyenne et médiane.", "Oublier les unités."],
    flash: [["Moyenne", "Somme des valeurs pondérées par leurs effectifs, divisée par l'effectif total."], ["Médiane", "Valeur qui partage la série ordonnée en deux groupes."], ["Étendue", "Différence entre valeur maximale et minimale."], ["Fréquence", "Effectif d'une modalité / effectif total."]],
  },
  {
    test: /(equation|inequation|second-degre|systemes)/,
    def: "Résoudre une équation, c'est trouver toutes les valeurs qui rendent l'égalité vraie.",
    methods: ["Isoler l'inconnue en conservant l'équivalence des transformations.", "Vérifier les solutions trouvées.", "Présenter clairement l'ensemble solution."],
    traps: ["Changer un signe sans inverser correctement l'inégalité.", "Perdre des solutions lors d'une factorisation."],
    flash: [["Solution", "Valeur qui vérifie l'équation."], ["Équation produit nul", "Un produit est nul si l'un des facteurs est nul."], ["Discriminant", "Δ=b²-4ac pour ax²+bx+c."], ["Système", "Ensemble de plusieurs équations à résoudre simultanément."]],
  },
  {
    test: /(fonction|suites|limites|derivee|continuite|integrale|logarithme|exponentielle)/,
    def: "On étudie des fonctions pour modéliser des variations et résoudre des problèmes de calcul et d'optimisation.",
    methods: ["Identifier l'expression et l'ensemble de définition.", "Étudier variations/signe selon le niveau.", "Conclure avec une phrase d'interprétation."],
    traps: ["Oublier le domaine de définition.", "Confondre image d'un nombre et antécédent."],
    flash: [["Image", "Résultat f(x) associé à une valeur x."], ["Variation", "Une fonction peut croître, décroître ou rester constante."], ["Dérivée", "Taux de variation instantané (quand le chapitre le traite)."], ["Primitive", "Fonction dont la dérivée redonne la fonction étudiée."]],
  },
  {
    test: /(geometr|triangle|angles|thales|pythagore|trigonometr|vecteur|produit-scalaire|espace|symetrie|rotation|translation|repere)/,
    def: "La géométrie permet de raisonner sur les figures, les longueurs, les angles et les positions dans le plan ou l'espace.",
    methods: ["Faire une figure codée et lisible.", "Identifier la propriété/ le théorème à utiliser.", "Rédiger la démonstration avec les données puis la conclusion."],
    traps: ["Utiliser un théorème sans vérifier ses conditions.", "Confondre hypothèse et conclusion."],
    flash: [["Figure codée", "Une figure avec informations utiles (angles, longueurs, parallèles)."], ["Réciproque", "Permet de conclure dans l'autre sens si les conditions sont réunies."], ["Trigonométrie", "Relie angle et rapports de longueurs dans un triangle rectangle."], ["Vecteur", "Objet défini par direction, sens et norme."]],
  },
  {
    test: /(nombres|decimaux|relatifs|puissances|arithmetique|ensembles|intervalles|calcul-litteral|algorithmique)/,
    def: "Ce chapitre renforce les techniques de calcul, le sens des écritures mathématiques et la rigueur logique.",
    methods: ["Identifier la nature des nombres et les notations.", "Appliquer les règles de calcul dans le bon ordre.", "Contrôler la cohérence du résultat final."],
    traps: ["Confondre priorité des opérations.", "Négliger les parenthèses et les signes."],
    flash: [["Priorité", "Parenthèses puis puissances puis ×/÷ puis +/−."], ["Nombre relatif", "Nombre positif ou négatif."], ["Puissance", "Produit d'un même facteur répété."], ["Intervalle", "Ensemble de nombres compris entre deux bornes."]],
  },
];

function sanitizeTitle(rawTitle) {
  return rawTitle.replace(/^[^\p{L}\p{N}]+/u, "").trim();
}

function getLevel() {
  const levelText = document.querySelector("header p")?.textContent || "";
  return levelText.replace("Niveau :", "").trim();
}

function topicRuleFromPage() {
  const slug = window.location.pathname.toLowerCase();
  return TOPIC_RULES.find((rule) => rule.test.test(slug)) || TOPIC_RULES[TOPIC_RULES.length - 1];
}

function defaultCourseData() {
  const title = sanitizeTitle(document.querySelector("header h1")?.textContent || "Chapitre");
  const level = getLevel();
  const rule = topicRuleFromPage();

  return {
    definition: rule.def,
    programme: PROGRAMME_FOCUS[level] || "Renforcer les attendus du programme officiel sur ce thème.",
    pointsClefs: [
      `Connaître les notions centrales du chapitre « ${title} ».`,
      "Savoir choisir la bonne méthode selon la consigne.",
      "Justifier chaque étape avec le vocabulaire mathématique attendu.",
    ],
    methods: rule.methods,
    traps: rule.traps,
    exercices: [
      `Restituer la définition principale du chapitre « ${title} » et donner un exemple correct.`,
      "Résoudre un exercice d'application directe en détaillant les étapes.",
      "Traiter un exercice de synthèse avec vérification du résultat.",
    ],
    corrige: [
      "La définition doit être exacte, avec les conditions d'utilisation et une notation correcte.",
      "L'application directe suit la méthode du cours (calculs justifiés et résultat encadré).",
      "La synthèse mobilise plusieurs idées du chapitre puis conclut avec une phrase interprétée.",
    ],
    qcm: [
      {
        q: `Quelle phrase correspond le mieux au chapitre « ${title} » ?`,
        options: [
          { text: "On applique une méthode et on justifie les étapes.", correct: true },
          { text: "Aucune justification n'est nécessaire.", correct: false },
          { text: "Le résultat suffit, même faux en unité.", correct: false },
        ],
      },
      {
        q: "Un résultat mathématique correct doit :",
        options: [
          { text: "être cohérent avec les données et présenté clairement", correct: true },
          { text: "ignorer les hypothèses", correct: false },
          { text: "être donné sans calcul", correct: false },
        ],
      },
      {
        q: "Pour progresser sur ce chapitre, il faut en priorité :",
        options: [
          { text: "s'entraîner régulièrement sur des exercices variés", correct: true },
          { text: "apprendre uniquement les réponses des exemples", correct: false },
          { text: "éviter de vérifier ses calculs", correct: false },
        ],
      },
      {
        q: "Dans une copie, la bonne pratique est :",
        options: [
          { text: "rédiger, calculer, vérifier, conclure", correct: true },
          { text: "écrire uniquement le résultat final", correct: false },
          { text: "supprimer toutes les unités", correct: false },
        ],
      },
    ],
    flashcards: rule.flash,
  };
}

function loadCourseConfig() {
  const configTag = document.getElementById("course-config");
  if (!configTag) return null;

  try {
    const parsed = JSON.parse(configTag.textContent);
    return { ...defaultCourseData(), ...parsed };
  } catch (error) {
    console.warn("Configuration de cours invalide (#course-config).", error);
    return null;
  }
}

function renderCourse(data) {
  const cours = document.querySelector("section.cours");
  const exos = document.querySelector("section.exercices");
  const qcmSection = document.querySelector("section.qcm");
  const flashSection = document.querySelector("section.flashcards");

  if (cours) {
    cours.innerHTML = `
      <h2>📘 Le cours</h2>
      <div class="definition"><strong>Définition :</strong> ${data.definition}</div>
      <div class="propriete"><strong>Objectif programme :</strong> ${data.programme}</div>
      <div class="exemple"><strong>Points clés à maîtriser :</strong><ul>${data.pointsClefs.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      <div class="propriete"><strong>Méthode type :</strong><ol>${data.methods.map((item) => `<li>${item}</li>`).join("")}</ol></div>
      <div class="exemple"><strong>Erreurs fréquentes :</strong><ul>${data.traps.map((item) => `<li>${item}</li>`).join("")}</ul></div>
    `;
  }

  if (exos) {
    exos.innerHTML = `
      <h2>✏️ Exercices d'entraînement</h2>
      <ol>${data.exercices.map((item) => `<li>${item}</li>`).join("")}</ol>
      <button class="btn" onclick="toggleCorrection()">Voir / cacher le corrigé</button>
      <div id="correction" class="correction hidden"><ol>${data.corrige.map((item) => `<li>${item}</li>`).join("")}</ol></div>
    `;
  }

  if (qcmSection) {
    qcmSection.innerHTML = `<h2>📝 QCM</h2>${data.qcm
      .map(
        (question, index) => `
          <div class="question">
            <p>${index + 1}. ${question.q}</p>
            ${question.options
              .map(
                (option, optionIndex) =>
                  `<label><input type="radio" name="q${index}" ${option.correct ? 'data-correct="true"' : ""}> ${option.text}</label>${optionIndex < question.options.length - 1 ? "<br>" : ""}`
              )
              .join("")}
          </div>
        `
      )
      .join("")}
      <button class="btn" onclick="verifierQCM()">Vérifier mes réponses</button>
      <p id="qcm-result"></p>`;
  }

  if (flashSection) {
    flashSection.innerHTML = `<h2>🗂 Flashcards</h2>${data.flashcards
      .map(
        ([question, answer]) => `
          <div class="flashcard">
            <p>${question}</p>
            <div class="reponse">${answer}</div>
          </div>
        `
      )
      .join("")}`;
  }
}

/* ===== QCM ===== */
function verifierQCM() {
  let score = 0;
  const questions = document.querySelectorAll(".question");

  questions.forEach((q) => {
    const checked = q.querySelector("input:checked");
    if (checked && checked.dataset.correct === "true") score++;
  });

  const total = questions.length;
  const result = document.getElementById("qcm-result");
  if (result) {
    const percent = total ? Math.round((score / total) * 100) : 0;
    const detailedFeedback = score === total
      ? "Parfait, chapitre validé à 100% !"
      : score >= Math.ceil(total * 0.7)
        ? "Très bien, encore un effort pour atteindre 100%."
        : "Continue : relis le cours et utilise les indices progressifs.";
    result.textContent = `Votre score : ${score} / ${total} (${percent}%). ${detailedFeedback}`;
  }

  if (typeof enregistrerScore === "function") {
    const chapterId = chapterKey();
    enregistrerScore(chapterId, score, total);
  }

  awardPoints(score * 10, "QCM terminé");
  if (score === total && total > 0) validateChapter(chapterKey(), result);
  saveExerciseHistory(score, total);
}

function toggleCorrection() {
  const correction = document.getElementById("correction");
  if (correction) correction.classList.toggle("hidden");
}

function chapterKey() {
  return window.location.pathname.replace(/\//g, "-").replace(".html", "");
}

function getGlobalScore() {
  return JSON.parse(localStorage.getItem("mathsMoiCaScore") || '{"points":0,"validated":[]}');
}

function setGlobalScore(data) {
  localStorage.setItem("mathsMoiCaScore", JSON.stringify(data));
}

function renderScoreBoard() {
  const main = document.querySelector("main");
  if (!main) return;
  const data = getGlobalScore();
  let board = document.querySelector(".score-board");
  if (!board) {
    board = document.createElement("section");
    board.className = "bloc score-board";
    main.insertBefore(board, main.firstChild);
  }
  board.innerHTML = `<h2>🏆 Score</h2><p><strong>${data.points}</strong> points cumulés • <strong>${data.validated.length}</strong> chapitres validés à 100%</p>`;
}

function awardPoints(points, reason) {
  const data = getGlobalScore();
  data.points += points;
  setGlobalScore(data);
  renderScoreBoard();
  const result = document.getElementById("qcm-result");
  if (result && reason) result.textContent += ` (+${points} pts : ${reason})`;
}

function validateChapter(id, resultNode) {
  const data = getGlobalScore();
  if (data.validated.includes(id)) return;
  data.validated.push(id);
  data.points += 20;
  setGlobalScore(data);
  renderScoreBoard();
  if (resultNode) resultNode.textContent += " + bonus validation : 20 pts";
}

function getLearningProfile() {
  return JSON.parse(localStorage.getItem("mathsMoiCaProfile") || '{"niveau":"","lastChapter":"","history":[]}');
}

function setLearningProfile(profile) {
  localStorage.setItem("mathsMoiCaProfile", JSON.stringify(profile));
}



function getSmartErrorExplanation(question) {
  const rule = topicRuleFromPage();
  const correctLabel = [...question.querySelectorAll('label')].find((label) => label.querySelector('[data-correct="true"]'));
  const correctText = correctLabel ? correctLabel.textContent.trim().replace(/\s+/g, " ") : "la réponse correcte";
  const trap = rule.traps[0] || "relis les conditions d'utilisation de la propriété.";
  return `Correction intelligente : la bonne piste est « ${correctText} ». Erreur fréquente à vérifier : ${trap}`;
}

function getAdaptiveAdvice() {
  const profile = getLearningProfile();
  const last = profile.history.at(-1);
  if (!last) return "Commence par le niveau facile, puis fais le QCM pour obtenir une première recommandation.";
  const percent = last.total ? Math.round((last.score / last.total) * 100) : 0;
  if (percent === 100) return "Chapitre maîtrisé : passe au chapitre suivant ou lance un sujet de synthèse.";
  if (percent >= 70) return "Tu es proche de la validation : refais les questions ratées avec les indices, puis vise 100%.";
  if (percent >= 40) return "Consolide : relis la méthode type, fais deux exercices faciles, puis un exercice moyen.";
  return "Priorité remédiation : revois la définition, demande une explication au chatbot et recommence sans limite de temps.";
}

function updateAdaptivePath() {
  const target = document.getElementById("adaptive-text");
  if (target) target.textContent = getAdaptiveAdvice();
}

function injectRoadmapUX() {
  const main = document.querySelector("main");
  if (!main) return;

  const coursSection = document.querySelector("section.cours, section.bloc.cours");
  if (coursSection && !document.querySelector(".chapter-objectives")) {
    const title = sanitizeTitle(document.querySelector("header h1")?.textContent || "ce chapitre");
    const objective = document.createElement("section");
    objective.className = "bloc chapter-objectives";
    objective.innerHTML = `
      <h2>🎯 Objectifs du chapitre</h2>
      <ul>
        <li>Découvrir les notions essentielles de « ${title} ».</li>
        <li>Comprendre les méthodes et éviter les erreurs fréquentes.</li>
        <li>S'entraîner avec des exercices courts et un QCM interactif.</li>
        <li>Valider les acquis avec correction immédiate.</li>
      </ul>`;
    main.insertBefore(objective, coursSection);
  }

  const steps = [
    ["section.cours, section.bloc.cours", "🔎 Étape 1 — Découvrir & comprendre"],
    ["section.exercices, section.bloc.exercices", "✍️ Étape 2 — S’entraîner"],
    ["section.qcm, section.bloc.qcm", "✅ Étape 3 — Valider"],
  ];

  steps.forEach(([selector, text]) => {
    const section = document.querySelector(selector);
    if (!section || section.querySelector(".step-chip")) return;
    const chip = document.createElement("p");
    chip.className = "step-chip";
    chip.textContent = text;
    section.insertBefore(chip, section.firstChild);
  });

  const current = document.querySelector('.niveaux-menu .submenu a.current-page');
  if (current && !document.querySelector('.chapter-nav')) {
    const links = [...current.closest('.submenu').querySelectorAll('a')];
    const i = links.indexOf(current);
    const prev = links[i - 1];
    const next = links[i + 1];

    const nav = document.createElement('nav');
    nav.className = 'chapter-nav';
    nav.setAttribute('aria-label', 'Navigation entre chapitres');
    nav.innerHTML = `${prev ? `<a class="btn" href="${prev.getAttribute('href')}">← Chapitre précédent</a>` : '<span></span>'}${next ? `<a class="btn" href="${next.getAttribute('href')}">Chapitre suivant →</a>` : '<span></span>'}`;
    main.appendChild(nav);
  }
}

function enableInstantQcmFeedback() {
  document.querySelectorAll('.qcm .question, .bloc.qcm .question').forEach((question) => {
    if (question.querySelector('.qcm-feedback')) return;
    const feedback = document.createElement('p');
    feedback.className = 'qcm-feedback';
    feedback.setAttribute('aria-live', 'polite');
    question.appendChild(feedback);

    question.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        const ok = input.dataset.correct === 'true';
        question.classList.remove('is-good', 'is-bad');
        question.classList.add(ok ? 'is-good' : 'is-bad');
        feedback.textContent = ok ? '✅ Bonne réponse !' : `❌ Mauvaise réponse. ${getSmartErrorExplanation(question)}`;
      });
    });
  });
}

function renderDifficultyExercises() {
  const exos = document.querySelector("section.exercices, section.bloc.exercices");
  if (!exos || exos.querySelector(".difficulty-grid")) return;
  exos.insertAdjacentHTML("beforeend", `
    <h3>🎚 Exercices par niveau</h3>
    <div class="difficulty-grid">
      <article class="difficulty-card"><h4>🟢 Facile</h4><p>Rappel direct de la notion clé.</p></article>
      <article class="difficulty-card"><h4>🟠 Moyen</h4><p>Application guidée avec méthode.</p></article>
      <article class="difficulty-card"><h4>🔴 Difficile</h4><p>Synthèse complète et justification.</p></article>
    </div>
  `);
}

function renderProgressiveHints() {
  document.querySelectorAll(".qcm .question, .bloc.qcm .question").forEach((question) => {
    if (question.querySelector(".hint-controls")) return;
    const hints = [
      "Indice 1 : relis la définition du cours.",
      "Indice 2 : élimine les réponses manifestement fausses.",
      "Indice 3 : vérifie les mots-clés mathématiques de la consigne.",
    ];
    let hintLevel = 0;
    const wrap = document.createElement("div");
    wrap.className = "hint-controls";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = "Voir un indice";
    const text = document.createElement("p");
    text.className = "hint-text";
    button.addEventListener("click", () => {
      text.textContent = hints[hintLevel] || "Tous les indices ont été révélés.";
      hintLevel += 1;
    });
    wrap.append(button, text);
    question.appendChild(wrap);
  });
}

function renderFinalQuiz() {
  const qcm = document.querySelector("section.qcm, section.bloc.qcm");
  if (!qcm || qcm.querySelector(".final-quiz")) return;
  qcm.insertAdjacentHTML("beforeend", `
    <div class="final-quiz">
      <h3>🏁 Quiz de fin de chapitre</h3>
      <p>Auto-évaluation : as-tu validé ce chapitre ?</p>
      <button class="btn" type="button" id="self-eval-btn">Je m'auto-évalue</button>
      <p id="self-eval-result"></p>
    </div>
  `);
  qcm.querySelector("#self-eval-btn")?.addEventListener("click", () => {
    const validated = getGlobalScore().validated.includes(chapterKey());
    const target = qcm.querySelector("#self-eval-result");
    if (!target) return;
    target.textContent = validated
      ? "✅ Chapitre validé : 100% atteint au QCM."
      : "💡 Pas encore validé : vise 100% au QCM pour débloquer le chapitre.";
  });
}

function renderVisualLab() {
  const cours = document.querySelector("section.cours, section.bloc.cours");
  if (!cours || document.querySelector(".visual-lab")) return;

  const visual = document.createElement("section");
  visual.className = "bloc visual-lab";
  visual.innerHTML = `
    <h2>📊 Visualisation interactive</h2>
    <p>Manipule les paramètres pour visualiser la fonction au lieu de mémoriser.</p>
    <div class="function-controls">
      <label for="coef-a">a :
        <input id="coef-a" type="range" min="-5" max="5" step="1" value="1">
      </label>
      <label for="coef-b">b :
        <input id="coef-b" type="range" min="-10" max="10" step="1" value="0">
      </label>
      <p id="function-equation"><strong>f(x) = 1x + 0</strong></p>
    </div>
    <canvas id="function-canvas" width="560" height="320" aria-label="Graphique de fonction affine"></canvas>
    <div class="variation-box">
      <h3>📈 Tableau de variation dynamique</h3>
      <p id="variation-text">Fonction croissante sur ℝ (a > 0).</p>
    </div>
    <details class="geogebra-box">
      <summary>Ouvrir l'activité GeoGebra</summary>
      <iframe
        title="GeoGebra - visualisation de fonction"
        src="https://www.geogebra.org/classic?lang=fr"
        loading="lazy"
        referrerpolicy="no-referrer"
        allowfullscreen
      ></iframe>
    </details>
  `;

  cours.insertAdjacentElement("afterend", visual);
  initFunctionVisualizer();
}

function initFunctionVisualizer() {
  const canvas = document.getElementById("function-canvas");
  const inputA = document.getElementById("coef-a");
  const inputB = document.getElementById("coef-b");
  if (!canvas || !inputA || !inputB) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const equation = document.getElementById("function-equation");
  const variation = document.getElementById("variation-text");

  const draw = () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    const width = canvas.width;
    const height = canvas.height;
    const unit = 24;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#dce6f7";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += unit) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += unit) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const ox = width / 2;
    const oy = height / 2;
    ctx.strokeStyle = "#526a87";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(width, oy);
    ctx.moveTo(ox, 0);
    ctx.lineTo(ox, height);
    ctx.stroke();

    ctx.strokeStyle = "#1e6bd6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= width; px += 2) {
      const x = (px - ox) / unit;
      const y = a * x + b;
      const py = oy - y * unit;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    if (equation) equation.innerHTML = `<strong>f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}</strong>`;
    if (variation) {
      variation.textContent = a > 0
        ? "Fonction croissante sur ℝ (a > 0)."
        : a < 0
          ? "Fonction décroissante sur ℝ (a < 0)."
          : "Fonction constante sur ℝ (a = 0).";
    }
  };

  inputA.addEventListener("input", draw);
  inputB.addEventListener("input", draw);
  draw();
}

function buildGuidedPath(chapter) {
  return [
    `1) Lire l'objectif du chapitre ${chapter}.`,
    "2) Faire 1 exercice facile puis 1 moyen.",
    "3) Utiliser les indices seulement si besoin.",
    "4) Valider le QCM à 100% pour clôturer le chapitre.",
  ];
}

function updateResumeInfo() {
  const profile = getLearningProfile();
  const resumeText = document.getElementById("resume-text");
  if (!resumeText) return;
  resumeText.textContent = profile.lastChapter
    ? `Dernier chapitre travaillé : ${profile.lastChapter}.`
    : "Aucun historique de reprise pour le moment.";
}

function updateRecommendation() {
  const profile = getLearningProfile();
  const rec = document.getElementById("recommendation-text");
  if (!rec) return;
  const validated = getGlobalScore().validated.length;
  if (validated < 2) rec.textContent = "Recommandation : commence par 1 exercice facile puis valide le QCM.";
  else if (validated < 5) rec.textContent = "Recommandation : alterne moyen et difficile pour progresser.";
  else rec.textContent = "Excellent rythme : vise un nouveau chapitre validé aujourd'hui.";
  if (profile.niveau) rec.textContent += ` Niveau actuel : ${profile.niveau}.`;
}

function renderExerciseHistory() {
  const list = document.getElementById("history-list");
  if (!list) return;
  const profile = getLearningProfile();
  const items = profile.history.slice(-8).reverse();
  list.innerHTML = items.length
    ? items.map((it) => `<li>${it.date} — ${it.chapter} — score ${it.score}/${it.total}</li>`).join("")
    : "<li>Pas encore d'exercice enregistré.</li>";
}

function saveExerciseHistory(score, total) {
  const profile = getLearningProfile();
  profile.lastChapter = chapterKey();
  profile.history.push({
    chapter: sanitizeTitle(document.querySelector("header h1")?.textContent || "Chapitre"),
    score,
    total,
    date: new Date().toISOString().slice(0, 10),
  });
  if (profile.history.length > 40) profile.history = profile.history.slice(-40);
  setLearningProfile(profile);
  updateResumeInfo();
  renderExerciseHistory();
  updateAdaptivePath();
}

function renderPersonalizationPanel() {
  const main = document.querySelector("main");
  if (!main || document.querySelector(".personalization-panel")) return;
  const profile = getLearningProfile();
  const chapter = sanitizeTitle(document.querySelector("header h1")?.textContent || "Chapitre");
  const panel = document.createElement("section");
  panel.className = "bloc personalization-panel";
  panel.innerHTML = `
    <h2>🧭 Personnalisation</h2>
    <label for="level-select">Choix du niveau :</label>
    <select id="level-select">
      <option value="">-- Sélectionner --</option>
      <option value="6ème">6ème</option><option value="5ème">5ème</option><option value="4ème">4ème</option>
      <option value="3ème">3ème</option><option value="2nde">2nde</option><option value="1ère">1ère</option><option value="Terminale">Terminale</option>
    </select>
    <div class="guided-path"><h3>Parcours guidé</h3><ol>${buildGuidedPath(chapter).map((step) => `<li>${step}</li>`).join("")}</ol></div>
    <div class="resume-box"><p id="resume-text"></p><button type="button" class="btn" id="resume-btn">Reprise automatique</button></div>
    <div class="recommendation-box"><h3>Recommandation simple</h3><p id="recommendation-text"></p></div>
    <div class="adaptive-box"><h3>Parcours adaptatif</h3><p id="adaptive-text"></p></div>
    <div class="history-box"><h3>Historique des exercices</h3><ul id="history-list"></ul></div>
  `;
  main.insertBefore(panel, main.firstChild);

  const select = panel.querySelector("#level-select");
  if (select) {
    select.value = profile.niveau || getLevel();
    select.addEventListener("change", () => {
      const next = getLearningProfile();
      next.niveau = select.value;
      setLearningProfile(next);
      updateRecommendation();
    });
  }

  panel.querySelector("#resume-btn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".step-chip")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  updateResumeInfo();
  updateRecommendation();
  updateAdaptivePath();
  renderExerciseHistory();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRandomExercise() {
  const a = randomInt(-9, 9);
  const b = randomInt(-9, 9);
  const op = ["+", "-", "×"][randomInt(0, 2)];
  const result = op === "+" ? a + b : op === "-" ? a - b : a * b;
  const explanation = op === "+"
    ? `On additionne ${a} et ${b}.`
    : op === "-"
      ? `On soustrait ${b} à ${a}. Attention au signe du second nombre.`
      : `On multiplie ${a} par ${b}. Le signe dépend des deux facteurs.`;
  return { statement: `Calculer : ${a} ${op} ${b}`, answer: result, explanation };
}


function safeCalculateExpression(expression) {
  const input = expression.replace(/,/g, ".").replace(/\s+/g, "");
  if (!/^[\d+\-*/().]+$/.test(input)) throw new Error("Expression non autorisée");

  let index = 0;
  const peek = () => input[index];
  const consume = () => input[index++];

  const parseNumber = () => {
    let value = "";
    while (/\d|\./.test(peek() || "")) value += consume();
    if (!value || value === ".") throw new Error("Nombre invalide");
    return Number(value);
  };

  const parseFactor = () => {
    if (peek() === "+") {
      consume();
      return parseFactor();
    }
    if (peek() === "-") {
      consume();
      return -parseFactor();
    }
    if (peek() === "(") {
      consume();
      const value = parseExpression();
      if (peek() !== ")") throw new Error("Parenthèse manquante");
      consume();
      return value;
    }
    return parseNumber();
  };

  const parseTerm = () => {
    let value = parseFactor();
    while (peek() === "*" || peek() === "/") {
      const op = consume();
      const right = parseFactor();
      value = op === "*" ? value * right : value / right;
    }
    return value;
  };

  const parseExpression = () => {
    let value = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = consume();
      const right = parseTerm();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  };

  const result = parseExpression();
  if (index !== input.length || !Number.isFinite(result)) throw new Error("Expression invalide");
  return Number.isInteger(result) ? result : Number(result.toFixed(6));
}

function renderPowerTools() {
  const main = document.querySelector("main");
  if (!main || document.querySelector(".power-tools")) return;
  const section = document.createElement("section");
  section.className = "bloc power-tools";
  section.innerHTML = `
    <h2>🛠 Outils puissants</h2>
    <div class="tool-grid">
      <article class="tool-card">
        <h3>🎲 Générateur d'exercices aléatoires</h3>
        <p id="random-exo">Clique pour générer un exercice.</p>
        <input id="random-answer" type="number" placeholder="Ta réponse">
        <button class="btn" type="button" id="new-exo-btn">Nouvel exercice</button>
        <button class="btn" type="button" id="check-exo-btn">Vérifier</button>
        <p id="random-feedback"></p>
      </article>
      <article class="tool-card">
        <h3>∞ Mode entraînement illimité</h3>
        <p>Enchaîne les exercices : chaque bonne réponse lance le suivant.</p>
        <button class="btn" type="button" id="unlimited-toggle">Démarrer</button>
        <p id="unlimited-status">Inactif</p>
      </article>
      <article class="tool-card">
        <h3>🧮 Calculatrice / traceur</h3>
        <input id="calc-input" type="text" placeholder="Ex: 2*(3+4)">
        <button class="btn" type="button" id="calc-btn">Calculer</button>
        <p id="calc-result"></p>
      </article>
      <article class="tool-card">
        <h3>📐 Outil de géométrie simple</h3>
        <canvas id="geo-canvas" width="280" height="220" aria-label="Schéma géométrique interactif"></canvas>
        <button class="btn" type="button" id="geo-btn">Nouveau triangle</button>
      </article>
      <article class="tool-card">
        <h3>📝 Générateur de sujets</h3>
        <button class="btn" type="button" id="topic-btn">Générer un sujet</button>
        <ul id="topic-list"></ul>
      </article>
    </div>
  `;
  main.appendChild(section);
  initPowerTools();
}

function initPowerTools() {
  let currentExercise = buildRandomExercise();
  let unlimited = false;
  const exo = document.getElementById("random-exo");
  const answer = document.getElementById("random-answer");
  const feedback = document.getElementById("random-feedback");
  const status = document.getElementById("unlimited-status");

  const refreshExercise = () => {
    currentExercise = buildRandomExercise();
    if (exo) exo.textContent = currentExercise.statement;
    if (answer) answer.value = "";
    if (feedback) feedback.textContent = "";
  };

  document.getElementById("new-exo-btn")?.addEventListener("click", refreshExercise);
  document.getElementById("check-exo-btn")?.addEventListener("click", () => {
    const value = Number(answer?.value);
    const ok = value === currentExercise.answer;
    if (feedback) feedback.textContent = ok ? "✅ Correct !" : `❌ Faux. Réponse: ${currentExercise.answer}. ${currentExercise.explanation}`;
    if (ok && unlimited) refreshExercise();
  });
  refreshExercise();

  document.getElementById("unlimited-toggle")?.addEventListener("click", (e) => {
    unlimited = !unlimited;
    e.target.textContent = unlimited ? "Arrêter" : "Démarrer";
    if (status) status.textContent = unlimited ? "Actif : prochain exo auto après réussite." : "Inactif";
  });

  document.getElementById("calc-btn")?.addEventListener("click", () => {
    const input = document.getElementById("calc-input");
    const out = document.getElementById("calc-result");
    if (!input || !out) return;
    try {
      const value = safeCalculateExpression(input.value);
      out.textContent = `Résultat : ${value}`;
    } catch {
      out.textContent = "Expression invalide.";
    }
  });

  const geo = document.getElementById("geo-canvas");
  const gctx = geo?.getContext("2d");
  const drawTriangle = () => {
    if (!geo || !gctx) return;
    const p1 = [randomInt(20, 80), randomInt(20, 180)];
    const p2 = [randomInt(120, 250), randomInt(20, 100)];
    const p3 = [randomInt(100, 260), randomInt(120, 200)];
    gctx.clearRect(0, 0, geo.width, geo.height);
    gctx.fillStyle = "#fff";
    gctx.fillRect(0, 0, geo.width, geo.height);
    gctx.strokeStyle = "#1e6bd6";
    gctx.lineWidth = 2;
    gctx.beginPath();
    gctx.moveTo(...p1); gctx.lineTo(...p2); gctx.lineTo(...p3); gctx.closePath(); gctx.stroke();
  };
  document.getElementById("geo-btn")?.addEventListener("click", drawTriangle);
  drawTriangle();

  document.getElementById("topic-btn")?.addEventListener("click", () => {
    const topics = ["Sujet 1: QCM + exercices faciles", "Sujet 2: Problème de synthèse", "Sujet 3: Révision chronométrée 20 min"];
    const list = document.getElementById("topic-list");
    if (!list) return;
    list.innerHTML = topics.map((t) => `<li>${t}</li>`).join("");
  });
}


function renderAIAssistant() {
  if (document.querySelector(".chapitre-chatbot")) return;
  const bot = document.createElement("aside");
  bot.className = "chapitre-chatbot";
  bot.innerHTML = `
    <button class="chatbot-toggle" type="button" aria-expanded="false">🤖 Assistant IA</button>
    <div class="chatbot-panel hidden" role="dialog" aria-label="Assistant pédagogique local">
      <h3>Assistant pédagogique</h3>
      <p class="chatbot-hint">Pose une question : indice, erreur, correction, parcours...</p>
      <div class="chatbot-log" aria-live="polite"></div>
      <form class="chatbot-form">
        <label class="sr-only" for="chatbot-input">Question</label>
        <input id="chatbot-input" type="text" placeholder="Ex : explique mon erreur">
        <button class="btn" type="submit">Envoyer</button>
      </form>
    </div>
  `;
  document.body.appendChild(bot);

  const toggle = bot.querySelector(".chatbot-toggle");
  const panel = bot.querySelector(".chatbot-panel");
  const form = bot.querySelector(".chatbot-form");
  const input = bot.querySelector("#chatbot-input");
  const log = bot.querySelector(".chatbot-log");

  const addMessage = (text, type = "bot") => {
    const msg = document.createElement("p");
    msg.className = `chatbot-message ${type}`;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  };

  toggle.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    const expanded = !panel.classList.contains("hidden");
    toggle.setAttribute("aria-expanded", String(expanded));
    if (expanded && !log.children.length) addMessage(generatePedagogicalReply("bonjour"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, "user");
    addMessage(generatePedagogicalReply(question));
    input.value = "";
  });
}

function generatePedagogicalReply(message) {
  const normalized = message.toLowerCase();
  const rule = topicRuleFromPage();
  const title = sanitizeTitle(document.querySelector("header h1")?.textContent || "ce chapitre");
  if (normalized.includes("erreur") || normalized.includes("faux")) {
    return `Explication automatique : commence par vérifier cette erreur fréquente — ${rule.traps[0]}. Ensuite, refais la question en justifiant chaque étape.`;
  }
  if (normalized.includes("indice") || normalized.includes("aide")) {
    return `Indice différencié : ${rule.methods[0]} Si tu bloques encore, utilise l'indice progressif sous la question.`;
  }
  if (normalized.includes("corrige") || normalized.includes("correction")) {
    return `Correction intelligente : je ne donne pas seulement la réponse. Méthode : ${rule.methods.join(" → ")}`;
  }
  if (normalized.includes("parcours") || normalized.includes("suite") || normalized.includes("quoi faire")) {
    return `Parcours adaptatif pour « ${title} » : ${getAdaptiveAdvice()}`;
  }
  return `Bonjour ! Je peux t'aider sur « ${title} ». Demande un indice, une explication d'erreur, une correction guidée ou ton parcours adaptatif.`;
}

/* ===== Initialisation ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("/cours/")) return;

  const data = loadCourseConfig();
  if (data) {
    renderCourse(data);
  }

  injectRoadmapUX();
  renderScoreBoard();
  enableInstantQcmFeedback();
  renderDifficultyExercises();
  renderProgressiveHints();
  renderFinalQuiz();
  renderVisualLab();
  renderPersonalizationPanel();
  renderPowerTools();
  renderAIAssistant();

  document.querySelectorAll(".flashcard").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("show");
    });
  });
});
