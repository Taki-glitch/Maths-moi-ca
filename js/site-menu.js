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
})();
