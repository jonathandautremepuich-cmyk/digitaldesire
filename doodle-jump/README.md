# Doodle Jump (localhost)

Jeu type Doodle Jump en HTML/CSS/JS.

## Lancer en localhost

Dans un terminal, depuis ce dossier :

```bash
cd doodle-jump
python -m http.server 3000
```

Puis ouvre dans le navigateur : **http://localhost:3000**

Sans Python, tu peux aussi ouvrir directement `index.html` dans le navigateur (certaines fonctionnalités peuvent varier selon le navigateur).

## Contrôles

- **← / A** : aller à gauche  
- **→ / D** : aller à droite  

Tu rebondis sur les plateformes en tombant. Score = hauteur. Game over si tu tombes sous l’écran.
