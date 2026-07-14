# Invitation pour Ella

Site statique, structure séparée — aucune installation nécessaire.

```
invitation-ella/
├── index.html   ← structure de la page
├── styles.css   ← toute la mise en forme (couleurs, polices, animations)
├── script.js    ← toute la logique (étapes, sélection, confettis, mail)
└── README.md
```

## Déployer en 30 secondes

**Option 1 — Netlify Drop (le plus simple)**
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `invitation-ella` (avec les 3 fichiers index.html, styles.css, script.js) sur la page
3. Un lien public est généré immédiatement — copie-le et envoie-le à Ella

**Option 2 — Vercel**
1. Crée un compte sur https://vercel.com
2. "Add New Project" → "Upload" → sélectionne ce dossier
3. Déploie, tu obtiens une URL

**Option 3 — GitHub Pages**
1. Crée un nouveau dépôt sur GitHub
2. Ajoute `index.html` à la racine du dépôt
3. Dans Settings → Pages, choisis la branche `main` comme source
4. Ton site sera accessible à `https://<ton-pseudo>.github.io/<nom-du-depot>/`

## Contenu déjà personnalisé
- Prénom affiché à l'ouverture : Ella
- Signature finale : "ton essentiel"
- Réponse envoyée sur WhatsApp au +228 92 21 32 39, ou par mail à felicioekoe3@gmail.com
- Date, heure, plats, lieux et tenue : propositions déjà remplies, modifiables
  directement dans `index.html` (cherche les commentaires `<!-- OPTIONS ... -->`)

## Modifier après déploiement
- Textes, structure, options : `index.html`
- Couleurs, polices, animations : `styles.css`
- Comportement (étapes, sélections, confettis, mail) : `script.js`
Modifie le fichier concerné avec n'importe quel éditeur de texte, puis redépose
le dossier complet sur la même plateforme pour mettre à jour le site.
