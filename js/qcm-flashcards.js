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
  if (!configTag) return defaultCourseData();

  try {
    const parsed = JSON.parse(configTag.textContent);
    return { ...defaultCourseData(), ...parsed };
  } catch (error) {
    console.warn("Configuration de cours invalide (#course-config).", error);
    return defaultCourseData();
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
  if (result) result.textContent = `Votre score : ${score} / ${total}`;

  if (typeof enregistrerScore === "function") {
    const chapterId = window.location.pathname.replace(/\//g, "-").replace(".html", "");
    enregistrerScore(chapterId, score, total);
  }
}

function toggleCorrection() {
  const correction = document.getElementById("correction");
  if (correction) correction.classList.toggle("hidden");
}

/* ===== Initialisation ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("/cours/")) return;

  const data = loadCourseConfig();
  renderCourse(data);

  document.querySelectorAll(".flashcard").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("show");
    });
  });
});
