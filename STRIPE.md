# Configuration Stripe pour Digital Desire

## 1. Compte Stripe

- Créez un compte sur [stripe.com](https://stripe.com) (mode test pour développer).
- Récupérez les clés : [Tableau de bord Stripe → Développeurs → Clés API](https://dashboard.stripe.com/apikeys).

## 2. Produits et prix

Dans [Stripe → Produits](https://dashboard.stripe.com/products) :

1. Créez **3 produits** avec un **prix unique** (one-time) :
   - **Essentiel** : 57 €
   - **Pro** : 127 €
   - **Premium** : 217 €

2. Pour chaque prix, copiez l’**ID du prix** (commence par `price_...`).

## 3. Variables d’environnement

Copiez `.env.example` vers `.env.local` et renseignez :

```bash
# Clés API Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# IDs des prix (ceux créés à l’étape 2)
STRIPE_PRICE_ESSENTIEL=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_PREMIUM=price_...

# URL du site (en prod, mettez l’URL réelle)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important :** ne commitez jamais `.env.local` (il est ignoré par défaut).

## 4. Comportement

- **Checkout** : le bouton « Payer X € avec Stripe » crée une session Stripe et redirige vers la page de paiement Stripe.
- **Après paiement** : Stripe redirige vers `/acces?session_id=...`. L’API vérifie la session, enregistre l’accès et affiche la page formation.
- **Sans Stripe** : le lien « Payer en simulation » reste disponible pour tester sans configurer Stripe.

## 5. Production

- Utilisez les clés **live** (`sk_live_...`, `pk_live_...`).
- Définissez `NEXT_PUBLIC_APP_URL` sur l’URL de production (ex. `https://votresite.com`).
- Optionnel : configurez un [webhook Stripe](https://dashboard.stripe.com/webhooks) sur `checkout.session.completed` pour enregistrer les paiements côté serveur (base de données, emails, etc.).
