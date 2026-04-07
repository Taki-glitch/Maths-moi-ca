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

    const chapterTitle = (document.querySelector('header h1')?.textContent || 'ce chapitre').trim();
    const chapterKeywords = chapterTitle
      .toLowerCase()
      .replace(/[^a-zàâçéèêëîïôûùüÿñæœ0-9\s-]/gi, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 2);

    const bot = document.createElement('aside');
    bot.className = 'chapitre-chatbot';
    bot.innerHTML = `
      <button class="chatbot-toggle" aria-expanded="false" aria-controls="chapitre-chatbot-panel">🤖 Aide chapitre</button>
      <div id="chapitre-chatbot-panel" class="chatbot-panel" hidden>
        <h3>Assistant du chapitre</h3>
        <p class="chatbot-hint">Je peux expliquer la leçon, faire des calculs et chercher des infos en ligne liées au chapitre.</p>
        <div class="chatbot-log" aria-live="polite"></div>
        <form class="chatbot-form">
          <label class="sr-only" for="chatbot-question">Question</label>
          <input id="chatbot-question" name="question" type="text" placeholder="Ex : calcule (3/4)+1/8" required>
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

    const localSentences = sourceText
      .split(/[.!?]\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 25);

    addBotMessage(`Salut 👋 Je peux t'aider sur ${chapterTitle}.`);

    toggle.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.textContent = isOpen ? '🤖 Aide chapitre' : '✖ Fermer l’aide';
      if (!isOpen) input.focus();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;

      addUserMessage(question);
      input.value = '';
      addBotMessage('⏳ Je réfléchis...');

      const answer = await buildAnswer(question, localSentences, chapterTitle, chapterKeywords, chapitreSection);
      replaceLastBotMessage(answer);
    });

    async function buildAnswer(question, corpusSentences, chapterName, keywords, sectionNode) {
      const q = question.toLowerCase();

      if (/(bonjour|salut|hello|coucou)/.test(q)) {
        return 'Bonjour ! Pose-moi une définition, une méthode, un calcul, ou une question de cours.';
      }

      const calcResult = solveMathExpression(question);
      if (calcResult) {
        return `🧮 Résultat : ${calcResult}\n\nSi tu veux, je peux aussi détailler la méthode en lien avec ${chapterName}.`;
      }

      if (/(définition|définir|qu[’\']est-ce que|c[’\']est quoi)/.test(q)) {
        const definitionBlock = sectionNode.querySelector('.definition');
        if (definitionBlock) {
          return `📘 Définition (cours) : ${definitionBlock.innerText.replace(/\s+/g, ' ').trim()}`;
        }
      }

      if (/(exemple|illustration)/.test(q)) {
        const exampleBlock = sectionNode.querySelector('.exemple');
        if (exampleBlock) {
          return `✍️ Exemple (cours) : ${exampleBlock.innerText.replace(/\s+/g, ' ').trim()}`;
        }
      }

      const localAnswer = getBestLocalAnswer(q, corpusSentences);
      const onlineAnswer = await fetchOnlineAnswer(question, chapterName, keywords);

      if (onlineAnswer && localAnswer) {
        return `${localAnswer}\n\n🌐 Complément (web) : ${onlineAnswer}`;
      }

      if (onlineAnswer) {
        return `🌐 Réponse (web, liée au chapitre ${chapterName}) : ${onlineAnswer}`;
      }

      if (localAnswer) {
        return localAnswer;
      }

      return `Je n’ai pas trouvé de réponse fiable. Reformule avec des mots du chapitre “${chapterName}” ou demande un calcul explicite (ex: 2*(3+5)).`;
    }

    function getBestLocalAnswer(questionLower, corpusSentences) {
      const stopWords = new Set(['le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'ou', 'a', 'à', 'au', 'aux', 'en', 'dans', 'sur', 'pour', 'par', 'avec', 'que', 'qui', 'quoi', 'comment', 'est', 'sont', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'ce', 'cette', 'ces', 'd', 'l']);
      const tokens = questionLower
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ0-9\s-]/gi, ' ')
        .split(/\s+/)
        .filter((token) => token.length > 2 && !stopWords.has(token));

      if (!tokens.length) return '';

      let bestSentence = '';
      let bestScore = 0;

      corpusSentences.forEach((sentence) => {
        const lowered = sentence.toLowerCase();
        let score = 0;
        tokens.forEach((token) => {
          if (lowered.includes(token)) score += 1;
        });
        if (score > bestScore) {
          bestScore = score;
          bestSentence = sentence;
        }
      });

      if (bestScore === 0) return '';
      return `📖 D’après le cours : ${bestSentence}`;
    }

    async function fetchOnlineAnswer(question, chapterName, chapterTokens) {
      const scopedQuery = `${question} mathématiques ${chapterName}`;
      const [wiki, ddg] = await Promise.all([
        fetchWikipediaSummary(scopedQuery),
        fetchDuckDuckGoAnswer(scopedQuery)
      ]);

      const candidates = [wiki, ddg].filter(Boolean);
      if (!candidates.length) return '';

      const best = candidates.find((text) => isTextRelatedToChapter(text, chapterTokens)) || candidates[0];
      return best;
    }

    function isTextRelatedToChapter(text, chapterTokens) {
      const normalized = text.toLowerCase();
      return chapterTokens.some((token) => normalized.includes(token));
    }

    async function fetchWikipediaSummary(query) {
      const searchUrl = `https://fr.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=1`;
      const searchData = await fetchJsonWithTimeout(searchUrl, 4500);
      const first = searchData?.pages?.[0];
      if (!first?.key) return '';

      const summaryUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(first.key)}`;
      const summaryData = await fetchJsonWithTimeout(summaryUrl, 4500);
      const extract = summaryData?.extract || '';
      return extract ? compactText(extract, 340) : '';
    }

    async function fetchDuckDuckGoAnswer(query) {
      const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&kl=fr-fr`;
      const data = await fetchJsonWithTimeout(url, 4500);
      const answer = data?.AbstractText || data?.Answer || '';
      return answer ? compactText(answer, 340) : '';
    }

    async function fetchJsonWithTimeout(url, timeoutMs) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, { signal: controller.signal, mode: 'cors' });
      clearTimeout(timer);
      if (!response.ok) return null;
      return response.json();
    }

    function solveMathExpression(rawInput) {
      const cleaned = rawInput
        .toLowerCase()
        .replace(/,/g, '.')
        .replace(/\b(calcule|calcul|résous|resous|combien font|combien fait)\b/g, '')
        .trim();

      const hasOperator = /[+\-*/^()]/.test(cleaned);
      if (!hasOperator) return '';
      if (cleaned.length > 120) return '';

      const normalized = cleaned
        .replace(/\bpi\b/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/\bsqrt\s*\(/g, 'Math.sqrt(')
        .replace(/\bsin\s*\(/g, 'Math.sin(')
        .replace(/\bcos\s*\(/g, 'Math.cos(')
        .replace(/\btan\s*\(/g, 'Math.tan(')
        .replace(/\blog\s*\(/g, 'Math.log10(')
        .replace(/\bln\s*\(/g, 'Math.log(')
        .replace(/\^/g, '**');

      const allowedPattern = /^[0-9\s+\-*/().,*A-Za-z]+$/;
      if (!allowedPattern.test(normalized)) return '';
      const allowedMath = /^[-+*/().\s0-9]*((Math\.(PI|E|sqrt|sin|cos|tan|log10|log))[-+*/().\s0-9]*)*$/;
      if (!allowedMath.test(normalized)) return '';

      let value;
      try {
        value = Function(`"use strict"; return (${normalized});`)();
      } catch (error) {
        return '';
      }

      if (typeof value !== 'number' || !Number.isFinite(value)) return '';
      return Number(value.toPrecision(12)).toString();
    }

    function compactText(text, maxLength) {
      const normalized = text.replace(/\s+/g, ' ').trim();
      if (normalized.length <= maxLength) return normalized;
      return `${normalized.slice(0, maxLength).trim()}…`;
    }

    function addUserMessage(text) {
      appendMessage(text, 'user');
    }

    function addBotMessage(text) {
      appendMessage(text, 'bot');
    }

    function replaceLastBotMessage(text) {
      const last = log.querySelector('.chatbot-message.bot:last-child');
      if (!last) {
        addBotMessage(text);
        return;
      }
      last.textContent = text;
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
