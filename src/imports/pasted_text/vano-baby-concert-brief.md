FIGMA AI — DESIGN BRIEF FINAL (TECH CHALLENGE READY)

Projet : Site officiel immersif — Concert "10 ans du Gang" — Vano Baby
Type : Expérience web émotionnelle + billetterie interactive
Livrable : Desktop (1440px) + Mobile (375px)
Objectif : Conversion maximale + immersion totale

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 INFORMATIONS OFFICIELLES (À RESPECTER STRICTEMENT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Artiste : Vano Baby
Événement : 10 ans du Gang — Concert Live
Date : 04 Avril 2026
Lieu : Majestic de Wologuèdè (ex Canal Olympia Wologuèdè)
Heure : À partir de 16h
Tickets : 5 000 FCFA / 15 000 FCFA / 50 000 FCFA / 100 000 FCFA

⚠️ Ces informations doivent apparaître telles quelles sur le site.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 CONCEPT — IMMERSION + CONVERSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce site doit :

- Créer une émotion (concert)
- Donner confiance (design premium)
- Créer urgence (rareté + hype)

Objectif final :
👉 L’utilisateur doit vouloir acheter immédiatement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 STRUCTURE OBLIGATOIRE (6 SECTIONS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. HERO (impact maximal + CTA)
2. L’ARTISTE & L’HISTOIRE
3. BILLETTERIE (interactive obligatoire)
4. LA HYPE (preuve sociale + ambiance)
5. ACCÈS & INFOS PRATIQUES
6. FAQ

⚡ Ordre optimisé recommandé :
Hero → Hype → Billetterie → Artiste → Infos → FAQ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎟️ FONCTIONNALITÉ INTERACTIVE (OBLIGATOIRE — 20PTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Créer un système de billetterie 100% frontend :

COMPORTEMENT :

- Boutons + / − pour quantité
- Calcul automatique du total
- Mise à jour instantanée (React state)
- Aucune recharge de page

LOGIQUE :

Prix :

- Standard : 5 000 FCFA
- Premium : 15 000 FCFA
- VIP : 50 000 FCFA
- Carré Or : 100 000 FCFA

FONCTIONNALITÉS :

1. Sélecteur quantité dynamique

2. Total en temps réel

3. CTA dynamique :
   Exemple :
   "Réserver 2 billets Premium — 30 000 FCFA →"

4. Jauge de places restantes (FAKE DATA mais crédible)
   Exemple :
   
   - Standard : 60% restant
   - Premium : 30% restant
   - VIP : 15% restant
   - Carré Or : 5% restant

5. Feedback utilisateur :

- Toast : "Billet ajouté"
- Animation chiffre

⚠️ Aucun Google Form / lien externe accepté

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 NOUVELLE ARCHITECTURE — DASHBOARD ADMIN PRIVÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANT : NON VISIBLE AU PUBLIC

Créer un dashboard séparé accessible uniquement via :

→ Route cachée :
/admin-dashboard-vano

OU

→ Condition :
Affiché uniquement si :
localStorage.isAdmin = true

━━━━━━━━━━━━━━━
📊 DASHBOARD ADMIN — FEATURES
━━━━━━━━━━━━━━━

OBJECTIF :
Permettre à l’admin de suivre les ventes en “temps réel simulé”

CONTENU :

1. 🎟️ Tickets vendus
   → ex : 4656
   → animation count up

2. 💰 Revenus bruts
   → ex : 64 640 000 FCFA

3. 🎫 Tickets restants
   → ex : 2135

4. 📉 Réductions
   → ex : 0 FCFA

5. 💸 Revenus nets
   → ex : 58 176 000 FCFA (card large)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ FAKE REAL-TIME (SANS BASE DE DONNÉES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tu DOIS simuler du temps réel.

TECHNIQUE :

Utiliser :

- setInterval()
- Math.random()
- React state

COMPORTEMENT :

Toutes les 3 à 6 secondes :

- +1 à +5 tickets vendus
- Revenus augmentent automatiquement
- Tickets restants diminuent

Exemple logique :
ticketsSold += random(1,5)
revenue += ticketsSold * prix_moyen

ANIMATIONS :

- Chiffres qui montent
- Glow dynamique
- Progress bar qui évolue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 FAKE SOCIAL PROOF (TRÈS IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Popups live :

- "Quelqu’un vient d’acheter 2 VIP"
- "3 billets Premium restants"
- "Nouveau achat à Cotonou"

Fréquence :
Toutes les 5–10 secondes

Position :
Bas gauche

Animation :
Slide + fade

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN — EXIGENCE MAXIMALE (20PTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Style attendu :

- Dark premium
- Glow rouge (#B50C00)
- Glassmorphism
- UI moderne type Stripe

INTERDICTIONS :
❌ Template cloné
❌ UI basique
❌ Couleurs incohérentes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PERFORMANCE (20PTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Images optimisées (Next/Image)
- Lazy loading
- Animations légères (GSAP ou CSS)
- Score Lighthouse élevé

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 COPYWRITING (20PTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le texte doit :

- Donner envie
- Créer urgence
- Être émotionnel

Exemple :
❌ "Achetez vos billets"
✅ "Ne rate pas ce moment historique"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏁 LIVRABLE FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Site déployé (Vercel recommandé)
- Responsive complet
- Fonctionnel sans bug

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 PHILOSOPHIE FINALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce site doit donner une sensation de :

👉 “Tout le monde y va… sauf moi ?”

Créer :

- De la hype
- De la pression sociale
- De l’émotion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NIVEAU ATTENDU :

🔥 Production ready
🔥 Impression jury
🔥 Expérience mémorable