# Guide de mise en ligne — VisuVox (blog + galerie)

Ce dossier contient votre site complet, prêt à être publié avec un vrai
système de blog et de galerie que vous pourrez gérer vous-même, sans toucher
au code.

Suivez les étapes DANS L'ORDRE. Comptez environ 30-40 minutes la première fois.

---

## Étape 1 — Créer un compte GitHub (gratuit)

1. Allez sur https://github.com et créez un compte (si vous n'en avez pas déjà un).
2. Cliquez sur "New repository" (Nouveau dépôt).
3. Nommez-le par exemple `visuvox-site`.
4. Laissez-le "Public" ou "Private" (les deux fonctionnent avec Netlify).
5. Ne cochez aucune case (pas de README, pas de .gitignore) — laissez vide.
6. Cliquez "Create repository".

## Étape 2 — Envoyer les fichiers de ce dossier sur GitHub

Sur la page de votre nouveau dépôt vide, GitHub propose un lien
"uploading an existing file" (téléverser des fichiers existants).

1. Cliquez dessus.
2. Glissez-déposez TOUT le contenu de ce dossier `visuvox-site`
   (tous les fichiers ET le dossier `src` avec sa structure interne)
   dans la zone de dépôt de GitHub.
   - Astuce : ouvrez le dossier `visuvox-site` sur votre ordinateur,
     sélectionnez tout (Ctrl+A / Cmd+A), puis glissez le tout d'un coup
     dans la fenêtre GitHub.
3. Écrivez un message comme "Premier envoi du site" en bas de page.
4. Cliquez "Commit changes" (Valider les modifications).

## Étape 3 — Connecter le dépôt à Netlify

1. Allez sur https://app.netlify.com et connectez-vous (ou créez un compte,
   gratuit, en vous connectant directement avec votre compte GitHub —
   c'est le plus simple).
2. Cliquez "Add new site" → "Import an existing project".
3. Choisissez "GitHub" et autorisez l'accès si demandé.
4. Sélectionnez le dépôt `visuvox-site` que vous venez de créer.
5. Netlify va automatiquement détecter la commande de build et le dossier
   de publication grâce au fichier `netlify.toml` inclus — vous n'avez
   rien à configurer manuellement. Cliquez "Deploy site".
6. Attendez 1-2 minutes que le site se construise. Netlify vous donne une
   adresse temporaire du type `nom-au-hasard.netlify.app`.

## Étape 4 — Relier votre nom de domaine Hostinger

1. Dans Netlify : "Site settings" → "Domain management" → "Add a domain".
2. Entrez votre nom de domaine (ex. `visuvox.org`).
3. Netlify vous donne des enregistrements DNS à copier (souvent un
   enregistrement de type "A" ou des "Netlify DNS").
4. Allez dans votre compte Hostinger → gestion DNS de votre domaine →
   collez les enregistrements indiqués par Netlify.
5. Le changement peut prendre de quelques minutes à 24h pour être actif
   partout dans le monde.

## Étape 5 — Activer les comptes utilisateurs (Netlify Identity)

C'est ce qui vous permettra de vous connecter à `/admin/` pour publier
du contenu.

1. Dans Netlify : "Site settings" → "Identity" → "Enable Identity".
2. Descendez à "Registration preferences" → choisissez "Invite only"
   (recommandé, pour que seules les personnes autorisées de RFEO
   puissent publier).
3. Descendez à "Services" → "Git Gateway" → cliquez "Enable Git Gateway".
   (C'est ce qui permet à l'interface de publication d'écrire dans
   votre dépôt GitHub sans que chaque personne ait besoin d'un compte
   GitHub personnel.)
4. Remontez en haut → onglet "Identity" → bouton "Invite users" →
   entrez votre adresse email (et celle de toute autre personne de
   RFEO qui doit publier).
5. Vous recevrez un email d'invitation — cliquez le lien, créez votre
   mot de passe.

## Étape 6 — Publier votre premier contenu

1. Allez sur `https://votre-site.netlify.app/admin/` (ou avec votre
   propre nom de domaine une fois branché).
2. Connectez-vous avec l'email/mot de passe créés à l'étape 5.
3. Vous verrez deux sections : "Actualités" et "Galerie".
4. Cliquez "Nouvel article" ou "Nouvelle photo", remplissez les champs,
   cliquez "Publish" (Publier) en haut à droite.
5. Le site se reconstruit automatiquement (1-2 minutes) et votre
   contenu apparaît en ligne sur `/blog/` ou `/galerie/`.

---

## Ce qui a changé par rapport à l'ancien fichier unique

- Le site n'est plus un seul fichier HTML — c'est maintenant un petit
  projet avec plusieurs fichiers, ce qui permet au blog et à la galerie
  de fonctionner correctement (pages séparées, référencement Google,
  images légères).
- L'ancien mode édition (mot de passe + crayon ✏️) reste disponible
  et fonctionne toujours sur la page d'accueil pour le logo, la photo
  de fond, le conseil d'administration, etc. — rien n'a été perdu.
  Après une modification avec ce mode, téléchargez le fichier final
  et remplacez le contenu de `src/index.njk` sur GitHub par celui du
  fichier téléchargé (en gardant les 4 premières lignes qui commencent
  et finissent par `---`, qui doivent rester en haut du fichier).
- Le blog et la galerie, eux, se gèrent uniquement via `/admin/` —
  plus besoin de mot de passe caché dans le code ni de télécharger un
  fichier : c'est un vrai compte sécurisé par personne.

## Un exemple est déjà en place

Un article de blog et une photo d'exemple sont déjà inclus pour que
vous puissiez voir immédiatement le résultat une fois en ligne. Vous
pouvez les modifier ou les supprimer depuis `/admin/`.

---

## Étape 7 — Voir vos statistiques de visite (Google Analytics)

1. Allez sur https://analytics.google.com et connectez-vous avec un
   compte Google (créez-en un dédié à RFEO si besoin).
2. Créez une propriété pour votre site (suivez l'assistant, entrez le
   nom "VisuVox" et l'URL de votre site).
3. Google vous donne un identifiant du type `G-XXXXXXXXXX`.
4. Sur GitHub, ouvrez le fichier `src/_includes/base.njk`, et remplacez
   les DEUX occurrences de `G-XXXXXXXXXX` par votre vrai identifiant.
5. Validez la modification ("Commit changes") — le site se reconstruit
   automatiquement.
6. Après 24-48h, vos statistiques de visite apparaîtront dans le
   tableau de bord Google Analytics (rapports "Temps réel" pour voir
   les visiteurs immédiatement, "Acquisition" pour voir d'où ils
   viennent).

## Étape 8 — Être mieux référencé (Google Search Console)

1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété avec l'adresse de votre site.
3. Vérifiez la propriété (Google propose plusieurs méthodes — la plus
   simple est souvent "balise HTML" ou via votre gestion DNS Hostinger).
4. Une fois vérifié, allez dans "Sitemaps" (menu de gauche) et soumettez :
   `https://votredomaine.org/sitemap.xml`
5. Dans les fichiers du projet, remplacez aussi `votredomaine.org` par
   votre vrai nom de domaine dans `src/robots.txt` et `src/sitemap.njk`.
6. Après quelques jours, l'onglet "Performances" vous montrera les
   recherches Google qui amènent des visiteurs chez vous.

## Étape 9 — Visibilité locale (Google Business Profile)

Gratuit et très utile pour une organisation basée à Ouanaminthe :

1. Allez sur https://business.google.com et créez une fiche pour RFEO.
2. Ajoutez adresse, horaires, photos, et le lien de votre site.
3. Ça vous fait apparaître sur Google Maps et dans les recherches
   locales ("associations femmes Ouanaminthe", etc.).

## Besoin d'aide ?

Si une étape bloque (message d'erreur, page blanche, etc.), copiez le
message exact et revenez me voir — je vous aiderai à le résoudre.
