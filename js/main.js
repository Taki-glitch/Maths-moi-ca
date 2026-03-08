(function () {
  const niveaux = [
    {
      label: '6ème',
      href: 'niveaux/6e.html',
      chapitres: [
        { label: 'Nombres entiers', href: 'cours/6e/nombres-entiers.html' },
        { label: 'Fractions', href: 'cours/6e/fractions.html' },
        { label: 'Géométrie', href: 'cours/6e/geometrie.html' },
        { label: 'Périmètres et aires', href: 'cours/6e/perimetres-aires.html' },
        { label: 'Proportionnalité', href: 'cours/6e/proportionnalite.html' },
        { label: 'Statistiques', href: 'cours/6e/statistiques.html' },
        { label: 'Probabilités', href: 'cours/6e/probabilites.html' }
      ]
    },
    {
      label: '5ème',
      href: 'niveaux/5e.html',
      chapitres: [
        { label: 'Nombres relatifs', href: 'cours/5e/nombres-relatifs.html' },
        { label: 'Fractions et calculs', href: 'cours/5e/fractions-calculs.html' },
        { label: 'Angles et triangles', href: 'cours/5e/angles-triangles.html' },
        { label: 'Symétrie centrale', href: 'cours/5e/symetrie-centrale.html' },
        { label: 'Proportionnalité', href: 'cours/5e/proportionnalite.html' },
        { label: 'Aires et volumes', href: 'cours/5e/aires-volumes.html' },
        { label: 'Statistiques et probabilités', href: 'cours/5e/statistiques-probabilites.html' }
      ]
    },
    {
      label: '4ème',
      href: 'niveaux/4e.html',
      chapitres: [
        { label: 'Fractions et relatifs', href: 'cours/4e/fractions-relatifs.html' },
        { label: 'Calcul littéral', href: 'cours/4e/calcul-litteral.html' },
        { label: 'Équations', href: 'cours/4e/equations.html' },
        { label: 'Théorème de Pythagore', href: 'cours/4e/pythagore.html' },
        { label: 'Translations et rotations', href: 'cours/4e/translations-rotations.html' },
        { label: 'Puissances', href: 'cours/4e/puissances.html' },
        { label: 'Statistiques', href: 'cours/4e/statistiques.html' }
      ]
    },
    {
      label: '3ème',
      href: 'niveaux/3e.html',
      chapitres: [
        { label: 'Arithmétique', href: 'cours/3e/arithmetique.html' },
        { label: 'Théorème de Thalès', href: 'cours/3e/thales.html' },
        { label: 'Trigonométrie', href: 'cours/3e/trigonometrie.html' },
        { label: 'Systèmes d’équations', href: 'cours/3e/systemes-equations.html' },
        { label: 'Fonctions affines', href: 'cours/3e/fonctions-affines.html' },
        { label: 'Probabilités', href: 'cours/3e/probabilites.html' },
        { label: 'Espace et volumes', href: 'cours/3e/espace-volumes.html' }
      ]
    },
    {
      label: '2nde',
      href: 'niveaux/2nde.html',
      chapitres: [
        { label: 'Ensembles et intervalles', href: 'cours/2nde/ensembles-intervalles.html' },
        { label: 'Équations et inéquations', href: 'cours/2nde/equations-inequations.html' },
        { label: 'Fonctions', href: 'cours/2nde/fonctions.html' },
        { label: 'Géométrie repérée', href: 'cours/2nde/geometrie-repere.html' },
        { label: 'Vecteurs', href: 'cours/2nde/vecteurs.html' },
        { label: 'Statistiques et probabilités', href: 'cours/2nde/statistiques-proba.html' },
        { label: 'Algorithmique', href: 'cours/2nde/algorithmique.html' }
      ]
    },
    {
      label: '1ère',
      href: 'niveaux/1ere.html',
      chapitres: [
        { label: 'Second degré', href: 'cours/1ere/second-degre.html' },
        { label: 'Dérivée', href: 'cours/1ere/derivee.html' },
        { label: 'Produit scalaire', href: 'cours/1ere/produit-scalaire.html' },
        { label: 'Trigonométrie', href: 'cours/1ere/trigonometrie.html' },
        { label: 'Suites', href: 'cours/1ere/suites.html' },
        { label: 'Probabilités conditionnelles', href: 'cours/1ere/probabilites-conditionnelles.html' },
        { label: 'Loi binomiale', href: 'cours/1ere/loi-binomiale.html' }
      ]
    },
    {
      label: 'Terminale',
      href: 'niveaux/terminale.html',
      chapitres: [
        { label: 'Limites', href: 'cours/terminale/limites.html' },
        { label: 'Continuité', href: 'cours/terminale/continuite.html' },
        { label: 'Logarithme et exponentielle', href: 'cours/terminale/logarithme-exponentielle.html' },
        { label: 'Suites', href: 'cours/terminale/suites.html' },
        { label: 'Intégrales', href: 'cours/terminale/integrales.html' },
        { label: 'Loi normale', href: 'cours/terminale/loi-normale.html' },
        { label: 'Probabilités continues', href: 'cours/terminale/probabilites-continues.html' }
      ]
    }
  ];

  const currentScript = document.currentScript;
  if (!currentScript || !currentScript.src) {
    return;
  }

  const siteRoot = new URL('../', currentScript.src);

  const toAbsoluteUrl = (path) => new URL(path, siteRoot).toString();

  const nav = document.createElement('nav');
  nav.className = 'site-nav';

  const menu = document.createElement('ul');
  menu.className = 'menu';

  niveaux.forEach((niveau) => {
    const item = document.createElement('li');
    item.className = 'menu-item';

    const niveauLink = document.createElement('a');
    niveauLink.href = toAbsoluteUrl(niveau.href);
    niveauLink.textContent = niveau.label;
    item.appendChild(niveauLink);

    const sousMenu = document.createElement('ul');
    sousMenu.className = 'submenu';

    niveau.chapitres.forEach((chapitre) => {
      const chapitreItem = document.createElement('li');
      const chapitreLink = document.createElement('a');
      chapitreLink.href = toAbsoluteUrl(chapitre.href);
      chapitreLink.textContent = chapitre.label;
      chapitreItem.appendChild(chapitreLink);
      sousMenu.appendChild(chapitreItem);
    });

    item.appendChild(sousMenu);
    menu.appendChild(item);
  });

  nav.appendChild(menu);

  const existingNav = document.querySelector('nav:not(.breadcrumb)');
  if (existingNav) {
    existingNav.replaceWith(nav);
  } else {
    const header = document.querySelector('header');
    if (header) {
      header.insertAdjacentElement('afterend', nav);
    } else {
      document.body.insertAdjacentElement('afterbegin', nav);
    }
  }
})();
