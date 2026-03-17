(function () {
  const MENU = [
    ["6e", "6ème", [["nombres-entiers.html", "Nombres entiers"], ["decimaux.html", "Nombres décimaux"], ["fractions.html", "Fractions"], ["geometrie.html", "Géométrie"], ["perimetres-aires.html", "Périmètres et aires"], ["proportionnalite.html", "Proportionnalité"], ["statistiques.html", "Statistiques"], ["probabilites.html", "Probabilités"]]],
    ["5e", "5ème", [["nombres-relatifs.html", "Nombres relatifs"], ["fractions-calculs.html", "Fractions et calculs"], ["proportionnalite.html", "Proportionnalité"], ["angles-triangles.html", "Angles et triangles"], ["symetrie-centrale.html", "Symétrie centrale"], ["aires-volumes.html", "Aires et volumes"], ["statistiques-probabilites.html", "Statistiques et probabilités"]]],
    ["4e", "4ème", [["calcul-litteral.html", "Calcul littéral"], ["puissances.html", "Puissances"], ["equations.html", "Équations"], ["pythagore.html", "Théorème de Pythagore"], ["translations-rotations.html", "Translations et rotations"], ["fractions-relatifs.html", "Fractions et nombres relatifs"], ["statistiques.html", "Statistiques"]]],
    ["3e", "3ème", [["fonctions-affines.html", "Fonctions affines"], ["systemes-equations.html", "Systèmes d’équations"], ["thales.html", "Théorème de Thalès"], ["trigonometrie.html", "Trigonométrie"], ["arithmetique.html", "Arithmétique"], ["probabilites.html", "Probabilités"], ["espace-volumes.html", "Espace et volumes"]]],
    ["2nde", "2nde", [["ensembles-intervalles.html", "Ensembles et intervalles"], ["fonctions.html", "Fonctions"], ["vecteurs.html", "Vecteurs"], ["equations-inequations.html", "Équations et inéquations"], ["statistiques-proba.html", "Statistiques et probabilités"], ["geometrie-repere.html", "Géométrie repérée"], ["algorithmique.html", "Algorithmique"], ["programme-technologique-professionnel.html", "Repères Seconde pro"]]],
    ["1ere", "1ère", [["derivee.html", "Dérivation"], ["suites.html", "Suites numériques"], ["second-degre.html", "Second degré"], ["trigonometrie.html", "Trigonométrie"], ["produit-scalaire.html", "Produit scalaire"], ["probabilites-conditionnelles.html", "Probabilités conditionnelles"], ["loi-binomiale.html", "Loi binomiale"], ["programme-technologique.html", "Repères 1ère techno"]]],
    ["terminale", "Terminale", [["limites.html", "Limites de fonctions"], ["continuite.html", "Continuité"], ["integrales.html", "Intégrales"], ["suites.html", "Suites et récurrence"], ["logarithme-exponentielle.html", "Logarithme et exponentielle"], ["probabilites-continues.html", "Probabilités continues"], ["loi-normale.html", "Loi normale"], ["programme-technologique.html", "Repères Terminale techno"]]],
  ];

  const currentPath = window.location.pathname.replace(/\/+$/, '');
  const isCours = currentPath.includes('/cours/');
  const holder = document.getElementById('site-menu');
  if (!holder) return;

  const rootPrefix = holder.dataset.root || '';

  const nav = document.createElement('nav');
  nav.className = 'niveaux-menu';
  nav.setAttribute('aria-label', 'Menu des niveaux');
  const ul = document.createElement('ul');

  MENU.forEach(([slug, label, chapters]) => {
    const li = document.createElement('li');
    li.className = 'has-submenu';

    const levelLink = document.createElement('a');
    levelLink.href = `${rootPrefix}niveaux/${slug}.html`;
    levelLink.textContent = label;
    if (currentPath.includes(`/niveaux/${slug}.html`) || currentPath.includes(`/cours/${slug}/`)) {
      levelLink.classList.add('active');
    }

    const sub = document.createElement('ul');
    sub.className = 'submenu';

    chapters.forEach(([fileName, title]) => {
      const cli = document.createElement('li');
      const ca = document.createElement('a');
      ca.href = `${rootPrefix}cours/${slug}/${fileName}`;
      ca.textContent = title;

      if (isCours && currentPath.endsWith(`/cours/${slug}/${fileName}`)) {
        ca.classList.add('current-page');
      }

      cli.appendChild(ca);
      sub.appendChild(cli);
    });

    li.appendChild(levelLink);
    li.appendChild(sub);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  holder.replaceWith(nav);

  if (isCours) {
    initChapitreChatbot();
  }

  function initChapitreChatbot() {
    const main = document.querySelector('main');
    if (!main) return;

    const chapitreSection = document.querySelector('.cours, .bloc.cours') || main.querySelector('section');
    if (!chapitreSection) return;

    const sourceText = chapitreSection.innerText.replace(/\s+/g, ' ').trim();
    if (!sourceText) return;

    const bot = document.createElement('aside');
    bot.className = 'chapitre-chatbot';
    bot.innerHTML = `
      <button class="chatbot-toggle" aria-expanded="false" aria-controls="chapitre-chatbot-panel">🤖 Aide chapitre</button>
      <div id="chapitre-chatbot-panel" class="chatbot-panel" hidden>
        <h3>Assistant du chapitre</h3>
        <p class="chatbot-hint">Pose une question sur cette leçon (définition, méthode, formule...).</p>
        <div class="chatbot-log" aria-live="polite"></div>
        <form class="chatbot-form">
          <label class="sr-only" for="chatbot-question">Question</label>
          <input id="chatbot-question" name="question" type="text" placeholder="Ex : Quelle est la définition ?" required>
          <button type="submit" class="btn">Envoyer</button>
        </form>
      </div>
    `;

    document.body.appendChild(bot);

    const toggle = bot.querySelector('.chatbot-toggle');
    const panel = bot.querySelector('.chatbot-panel');
    const log = bot.querySelector('.chatbot-log');
    const form = bot.querySelector('.chatbot-form');
    const input = bot.querySelector('#chatbot-question');

    const chapterTitle = (document.querySelector('header h1')?.textContent || 'ce chapitre').trim();
    const sentences = sourceText
      .split(/[.!?]\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 25);

    addBotMessage(`Salut 👋 Je peux t'aider sur ${chapterTitle}. Pose-moi une question !`);

    toggle.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.textContent = isOpen ? '🤖 Aide chapitre' : '✖ Fermer l’aide';
      if (!isOpen) input.focus();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;

      addUserMessage(question);
      const answer = buildAnswer(question, sentences);
      addBotMessage(answer);
      input.value = '';
    });

    function buildAnswer(question, corpusSentences) {
      const q = question.toLowerCase();

      if (/(bonjour|salut|hello|coucou)/.test(q)) {
        return 'Bonjour ! Je peux te résumer le cours, rappeler une définition ou une méthode.';
      }

      if (/(définition|definir|définir|qu[’\']est-ce que|c[’\']est quoi)/.test(q)) {
        const definitionBlock = chapitreSection.querySelector('.definition');
        if (definitionBlock) {
          return `Définition : ${definitionBlock.innerText.replace(/\s+/g, ' ').trim()}`;
        }
      }

      if (/(exemple|illustration)/.test(q)) {
        const exampleBlock = chapitreSection.querySelector('.exemple');
        if (exampleBlock) {
          return `Exemple du cours : ${exampleBlock.innerText.replace(/\s+/g, ' ').trim()}`;
        }
      }

      const stopWords = new Set(['le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'ou', 'a', 'à', 'au', 'aux', 'en', 'dans', 'sur', 'pour', 'par', 'avec', 'que', 'qui', 'quoi', 'comment', 'est', 'sont', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'ce', 'cette', 'ces', 'd', 'l']);

      const tokens = q
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ0-9\s-]/gi, ' ')
        .split(/\s+/)
        .filter((token) => token.length > 2 && !stopWords.has(token));

      if (!tokens.length) {
        return 'Peux-tu préciser ta question avec quelques mots clés du chapitre ?';
      }

      let bestSentence = '';
      let bestScore = 0;

      corpusSentences.forEach((sentence) => {
        const lowered = sentence.toLowerCase();
        let score = 0;
        tokens.forEach((token) => {
          if (lowered.includes(token)) {
            score += 1;
          }
        });

        if (score > bestScore) {
          bestScore = score;
          bestSentence = sentence;
        }
      });

      if (bestScore === 0) {
        return 'Je n’ai pas trouvé cette information exactement dans cette page. Essaie avec les mots du cours ou consulte les exercices/corrigés de ce chapitre.';
      }

      return `D’après ce chapitre : ${bestSentence}`;
    }

    function addUserMessage(text) {
      appendMessage(text, 'user');
    }

    function addBotMessage(text) {
      appendMessage(text, 'bot');
    }

    function appendMessage(text, role) {
      const message = document.createElement('p');
      message.className = `chatbot-message ${role}`;
      message.textContent = text;
      log.appendChild(message);
      log.scrollTop = log.scrollHeight;
    }
  }
})();
