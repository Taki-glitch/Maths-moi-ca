# Maths-moi-ça

Plateforme de révision de mathématiques (6ème → Terminale) avec :
- fiches de cours,
- exercices corrigés,
- QCM,
- flashcards,
- suivi de progression.

## Structure utile

- `niveaux/` : pages d'entrée par niveau.
- `cours/<niveau>/` : une page HTML par chapitre.
- `js/qcm-flashcards.js` : moteur unique qui génère le contenu pédagogique de chaque chapitre.
- `css/style.css` : styles globaux.

## Rédiger facilement un cours dans un fichier HTML

Chaque page de chapitre peut contenir un bloc JSON optionnel pour personnaliser le cours affiché.

```html
<script id="course-config" type="application/json">
{
  "definition": "Définition personnalisée du chapitre...",
  "programme": "Objectif officiel visé...",
  "pointsClefs": ["Point 1", "Point 2", "Point 3"],
  "methods": ["Étape 1", "Étape 2", "Étape 3"],
  "traps": ["Erreur fréquente 1", "Erreur fréquente 2"],
  "exercices": ["Exercice 1", "Exercice 2", "Exercice 3"],
  "corrige": ["Corrigé 1", "Corrigé 2", "Corrigé 3"],
  "qcm": [
    {
      "q": "Question ?",
      "options": [
        { "text": "Bonne réponse", "correct": true },
        { "text": "Réponse 2", "correct": false },
        { "text": "Réponse 3", "correct": false }
      ]
    }
  ],
  "flashcards": [
    ["Recto", "Verso"],
    ["Recto 2", "Verso 2"]
  ]
}
</script>
```

Si le bloc n'est pas présent, le script génère automatiquement un contenu complet adapté au niveau et au thème de la page.

## Lancer en local

```bash
python3 -m http.server 8000
```

Puis ouvrir : `http://localhost:8000`.
