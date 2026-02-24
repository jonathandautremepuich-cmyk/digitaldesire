/**
 * Données des modules et catégories.
 * Pour remplir le contenu : éditez le champ `content` de chaque catégorie ci-dessous.
 * Le contenu s'affichera automatiquement sur les pages /acces/module/1, etc.
 */
export type Category = {
  id: string;
  title: string;
  content: string; // À remplir catégorie par catégorie
};

export type Module = {
  id: string;
  number: number;
  title: string;
  objective: string;
  intro?: string; // Texte optionnel avant les catégories
  categories: Category[];
};

export const MODULES: Module[] = [
  {
    id: "1",
    number: 1,
    title: "Introduction et fondations",
    objective: "Comprendre le fonctionnement global du business.",
    intro: "Ce module pose les bases nécessaires avant la mise en pratique.",
    categories: [
      {
        id: "1-1",
        title: "La définition de l'IA OFM",
        content: `L'IA OFM, c'est un modèle de business en ligne qui consiste à créer un personnage virtuel avec l'intelligence artificielle, puis à utiliser ce personnage pour publier et vendre du contenu sur des plateformes où les abonnés paient pour accéder à du contenu exclusif.

Pour comprendre simplement, il faut imaginer que tu crées une "personne digitale" qui n'existe pas dans la vraie vie. Grâce à l'IA, tu peux créer son visage, son corps, son style, et même définir sa personnalité : son prénom, son âge, son histoire, sa façon de parler, ses goûts, etc. Tout est conçu pour que ce personnage paraisse réel et crédible aux yeux des personnes qui voient son contenu.

Une fois ce modèle virtuel créé, tu vas l'utiliser comme un créateur de contenu classique. Tu ouvres des comptes sur des plateformes adaptées, tu publies régulièrement du contenu, et tu développes une audience. Les personnes qui s'abonnent paient pour voir plus de contenu exclusif ou pour interagir avec ce modèle.

L'intelligence artificielle sert donc à :

• créer l'apparence du modèle,
• produire le contenu,
• maintenir une image cohérente,
• et gérer plus facilement toute l'activité.

Avec le temps, le modèle virtuel peut gagner en popularité, attirer plus d'abonnés et générer des revenus de manière continue.

Ce qu'il faut bien comprendre, c'est que dans l'IA OFM, le modèle lui-même devient un actif digital. C'est un personnage que tu crées, que tu développes, et que tu fais évoluer comme une véritable marque personnelle.

En résumé, l'IA OFM, c'est le fait de créer un personnage virtuel avec l'intelligence artificielle, de construire une audience autour de ce personnage, et de gagner de l'argent en vendant du contenu via des plateformes en ligne, exactement comme un créateur de contenu réel, sauf que tout repose sur un modèle généré par l'IA.`,
      },
      {
        id: "1-2",
        title: "Le fonctionnement du business de A à Z",
        content: `Le business IA OFM suit un processus structuré en plusieurs étapes. Le principe consiste à créer un modèle virtuel avec l'intelligence artificielle, construire une audience autour de ce modèle, puis monétiser cette audience via une plateforme par abonnement.

Voici le fonctionnement complet, étape par étape :

1. Création du modèle virtuel

La première étape consiste à créer un modèle virtuel à l'aide d'un outil d'intelligence artificielle.

Ce modèle est un personnage fictif conçu pour paraître réel. Il possède :

• un visage
• un physique
• un style
• un prénom
• une personnalité

Ce modèle devient l'élément central du business. Il représente l'identité qui sera utilisée pour attirer une audience.

2. Production du contenu

Une fois le modèle créé, il est nécessaire de produire du contenu.

Ce contenu sert à :

• alimenter les comptes du modèle
• construire sa présence en ligne
• attirer l'attention

Le contenu constitue la base de toute l'activité, car c'est ce que les abonnés viennent voir.

3. Création du compte sur la plateforme de monétisation

Le modèle est ensuite inscrit sur une plateforme de contenu par abonnement, ou par une plateforme où tu devras fournir des liens de paiement.

Ces plateformes permettent :

• d'accueillir les abonnés
• d'héberger le contenu
• et de générer des revenus

4. Mise en place du système de paiement

Une fois le compte créé, un système de paiement est configuré.

Ce système permet :

• de recevoir les revenus générés
• de stocker les gains
• de retirer l'argent

Cette étape rend le business opérationnel.

5. Acquisition de trafic

Une fois l'infrastructure en place, l'étape suivante consiste à attirer des visiteurs.

Pour cela, des comptes sont créés sur différentes applications afin de :

• publier du contenu
• attirer l'attention
• générer de la visibilité

Les personnes intéressées visitent ensuite la page du modèle sur la plateforme de monétisation.

6. Conversion en abonnés

Une partie des visiteurs décide de s'abonner.

En s'abonnant, ces personnes paient pour :

• accéder au contenu
• suivre le modèle
• interagir avec lui

Le modèle commence alors à générer des revenus.

7. Interaction et monétisation

Une fois les abonnés présents, des interactions sont mises en place.

Ces interactions permettent :

• de fidéliser les abonnés
• de maintenir leur intérêt
• d'augmenter les revenus

Le modèle devient un actif qui génère de l'argent de manière continue.

8. Optimisation et développement

Avec le temps, l'activité est optimisée :

• plus de contenu est produit
• l'audience augmente
• les revenus augmentent

Le business devient plus stable.

9. Scaling

Une fois le système maîtrisé, le processus peut être reproduit.

Cela consiste à :

• créer d'autres modèles
• appliquer le même fonctionnement
• multiplier les sources de revenus

Conclusion

Le fonctionnement de l'IA OFM repose sur une logique simple :

• Création du modèle virtuel
• Production du contenu
• Création du compte sur la plateforme
• Mise en place des paiements
• Acquisition de trafic
• Conversion des visiteurs en abonnés
• Interaction avec les abonnés
• Optimisation
• Développement et scaling

Le business consiste donc à créer un modèle virtuel, attirer une audience et générer des revenus grâce à cette audience.`,
      },
      {
        id: "1-3",
        title: "Le rôle du modèle virtuel",
        content: `Le modèle virtuel est l'élément qui incarne le business. Il sert de visage, d'image et de représentation à l'activité. C'est à travers lui que l'audience découvre le contenu, s'y intéresse et interagit.

Son rôle n'est pas de faire fonctionner la structure technique, mais de donner une forme humaine et identifiable au business.

1. Représenter le business

Le modèle virtuel est l'identité visible. C'est le personnage public.

Toute l'activité est construite autour de lui :

• le contenu est publié en son nom
• les profils utilisent son image
• les abonnés viennent pour lui

Il permet de transformer une activité digitale en une identité claire et reconnaissable.

2. Créer une perception réelle

Le modèle virtuel permet de créer l'illusion d'une personne réelle.

Cette perception est essentielle, car elle permet :

• de rendre le contenu crédible
• de rendre le profil cohérent
• de rendre l'expérience naturelle pour l'audience

Le modèle rend l'ensemble crédible.

3. Être le support du contenu

Le modèle virtuel est le sujet du contenu.

Tout le contenu est construit autour de lui :

• les images le représentent
• les publications parlent de lui
• les profils sont basés sur son identité

Il donne une cohérence à l'ensemble.

4. Être le point central de l'interaction

Toutes les interactions passent par le modèle.

Les abonnés :

• parlent au modèle
• suivent le modèle
• s'intéressent au modèle

Le modèle est le point de connexion entre le business et l'audience.

5. Donner de la valeur au business

Le modèle virtuel donne une valeur à l'activité, car il constitue l'actif principal.

Sans modèle :

• il n'y a pas d'identité
• il n'y a pas de présence
• il n'y a pas de base pour construire l'activité

Le modèle est donc la fondation sur laquelle repose tout le reste.

Résumé simple

Le modèle virtuel est :

• l'image du business
• l'identité utilisée
• le personnage central
• le support du contenu
• le point de contact avec l'audience

Il ne fait pas fonctionner le business, il le représente.`,
      },
      {
        id: "1-4",
        title: "Le fonctionnement des plateformes par abonnements ou lien de paiement",
        content: `Les plateformes par abonnement sont les outils qui permettent de monétiser le modèle virtuel. Leur rôle est d'héberger le profil, de gérer les abonnés et de traiter les paiements.

Le principe est simple : des utilisateurs paient pour accéder au contenu du modèle.

Il existe deux types de fonctionnement principaux.

1. Les plateformes à abonnement mensuel (exemple : Fanvue, Onlyfans, Mym)

Ces plateformes fonctionnent avec un système d'abonnement.

Fonctionnement :

Le modèle possède un profil public sur la plateforme.

Les visiteurs peuvent :

• voir le profil
• voir un aperçu
• puis s'abonner en payant un montant mensuel

Une fois abonnés, ils obtiennent accès au contenu.

Ce que la plateforme gère :

La plateforme s'occupe de :

• héberger le contenu
• gérer les abonnements
• encaisser les paiements
• stocker les revenus
• permettre le retrait de l'argent

Le modèle reçoit ensuite les gains générés.

Autre fonctionnalité importante :

En plus de l'abonnement, ces plateformes permettent aussi :

• l'envoi de contenu payant
• la monétisation des messages
• les interactions avec les abonnés

Ces plateformes fonctionnent donc comme un système complet.

Fanvue fonctionne sur ce modèle et est aujourd'hui largement utilisé, notamment parce qu'il accepte les modèles virtuels.

2. Les plateformes basées sur des liens de paiement (exemple : DropFans)

Le fonctionnement est différent.

Il n'y a pas d'abonnement mensuel classique.

À la place, la plateforme permet de créer des liens de paiement.

Fonctionnement :

Le modèle crée du contenu, puis génère un lien.

Ce lien contient :

• le contenu
• le prix

L'abonné paie une seule fois pour accéder à ce contenu.

Le processus est le suivant :

• Création du contenu
• Génération d'un lien de paiement
• Envoi du lien à l'utilisateur
• Paiement
• Accès au contenu

La plateforme reçoit le paiement et le transfère ensuite au propriétaire du compte.

Différence entre les deux systèmes

Fanvue / OnlyFans :

• Basé sur un abonnement mensuel
• Les abonnés paient pour suivre le modèle
• Revenus récurrents

DropFans :

• Basé sur des paiements à l'unité
• Les utilisateurs paient via des liens
• Revenus par vente individuelle

Conclusion

Les plateformes par abonnement ont trois rôles principaux :

• Héberger le profil du modèle
• Permettre aux utilisateurs de payer
• Permettre de recevoir les revenus

Fanvue, Onlyfans et Mym fonctionnent avec un système d'abonnement mensuel, tandis que DropFans fonctionne avec un système de liens de paiement permettant de vendre du contenu directement.

Ces plateformes constituent la base de la monétisation du modèle virtuel.`,
      },
      {
        id: "1-6",
        title: "La vision et la logique du business",
        content: `La vision principale est de créer un modèle virtuel et de le développer comme une véritable entité digitale.

Ce modèle devient un actif, c'est-à-dire quelque chose qui possède une valeur et qui peut générer des revenus.

Comme tout actif digital, sa valeur dépend de plusieurs éléments :

• son image
• sa crédibilité
• son audience
• son niveau d'engagement
• sa capacité à générer des ventes

Le modèle n'est pas simplement un personnage, c'est la base d'un système monétisable.

2. Construire une audience pour générer des revenus

La logique fondamentale est simple :

Audience → Confiance → Monétisation

Le processus fonctionne ainsi :

• Une audience découvre le modèle
• Une partie de cette audience s'abonne
• Une partie des abonnés dépense de l'argent

Plus l'audience est grande et engagée, plus le potentiel de revenus est élevé.

L'audience est la source des revenus.

3. Créer un système reproductible

L'objectif n'est pas seulement de générer des revenus une seule fois, mais de mettre en place un système qui peut fonctionner de manière continue.

Une fois qu'un modèle fonctionne, le même processus peut être reproduit :

• avec le même fonctionnement
• avec une nouvelle identité
• avec une nouvelle audience

Cela permet de multiplier les sources de revenus.

Le business devient alors scalable.

4. Construire sur le long terme

La vision de ce business n'est pas basée sur des résultats immédiats, mais sur le développement progressif d'un actif.

Avec le temps :

• l'audience grandit
• la crédibilité augmente
• les revenus deviennent plus stables

Le modèle prend de la valeur.

5. La logique principale : attirer et monétiser l'attention

Ce business repose sur un principe fondamental :

L'attention peut être transformée en revenus.

Le modèle sert à capter l'attention.

Cette attention est ensuite redirigée vers une plateforme où elle est monétisée.

Plus l'attention est importante, plus le potentiel de revenus augmente.`,
      },
      {
        id: "1-7",
        title: "Les erreurs les plus fréquentes à éviter",
        content: `Comprendre les erreurs les plus courantes permet d'éviter les pertes de temps, les pertes d'argent et les blocages. La majorité des échecs provient d'erreurs fondamentales dans la création du modèle, la gestion et la monétisation.

Voici les principales erreurs à éviter :

1. Créer un modèle incohérent

C'est l'erreur la plus fréquente chez les débutants.

Cela consiste à :

• changer souvent de visage
• avoir des différences physiques visibles
• ne pas garder la même apparence

Ce manque de cohérence rend le modèle non crédible.

Conséquence : perte de confiance et baisse des revenus.

Un modèle doit rester stable et reconnaissable.

2. Négliger la qualité du contenu

Un contenu de mauvaise qualité réduit fortement les résultats.

Erreurs courantes :

• images irréalistes
• mauvaise qualité visuelle
• contenu non crédible

Le contenu représente l'image du modèle. Une mauvaise qualité réduit l'attractivité.

La qualité est plus importante que la quantité.

3. Ne pas construire une vraie identité

Créer seulement une image ne suffit pas.

Une erreur fréquente est de ne pas définir :

• la personnalité
• le style
• le positionnement

Sans identité, le modèle paraît vide et impersonnel.

Une identité claire rend le modèle plus crédible et plus attractif.

4. Ne pas être régulier

Le manque de régularité bloque la progression.

Erreurs fréquentes :

• arrêter de publier
• publier de manière aléatoire
• abandonner trop tôt

La régularité est essentielle pour la croissance.

5. Mal gérer les conversations

Les conversations jouent un rôle direct dans les revenus.

Erreurs fréquentes :

• répondre de manière trop simple
• répondre de manière froide
• ne pas maintenir l'engagement

Une mauvaise communication réduit la monétisation.

6. Avoir des attentes irréalistes

Certaines personnes pensent que les résultats sont immédiats.

En réalité, ce business demande :

• de l'apprentissage
• de la patience
• de la régularité

Les résultats se construisent progressivement.

7. Manquer d'organisation

Une mauvaise organisation crée :

• une perte de temps
• une perte d'efficacité
• une progression lente

Une structure claire est nécessaire.

8. Abandonner trop tôt

C'est une des causes principales d'échec.

Les résultats viennent avec :

• la pratique
• l'amélioration
• l'expérience

La constance est essentielle.`,
      },
    ],
  },
  {
    id: "2",
    number: 2,
    title: "Création du modèle virtuel",
    objective: "Créer un modèle virtuel réaliste et exploitable.",
    intro: "Des prompts prêts à utiliser sont fournis, ainsi que des exemples concrets et une méthode structurée. À la fin de ce module, le modèle virtuel est créé et prêt à être utilisé.",
    categories: [
      {
        id: "2-1",
        title: "Comment générer l'avatar de son IA",
        content: `Cette étape consiste à générer l'avatar officiel du modèle à l'aide de l'application Alexia.ai. Cet avatar représente le visage du modèle et servira de base pour toute l'activité.

L'objectif est d'obtenir un visage unique, réaliste et non reconnaissable, qui pourra ensuite être réutilisé pour créer le contenu.

1. Accéder à Alexia.ai

La première étape consiste à se rendre sur l'application Alexia.ai et à accéder à la section de génération d'image.

2. Ajouter deux photos de référence

Pour générer le modèle, deux photos de femmes doivent être ajoutées.

Ces photos servent de base pour créer un nouveau visage.

Pour garantir un bon résultat, les photos doivent être :

• de bonne qualité
• nettes
• avec le visage visible
• sans filtre important

L'intelligence artificielle va mélanger les caractéristiques des deux visages afin de créer une nouvelle personne.

Le résultat final est un visage nouveau et unique.

3. Sélectionner les bons paramètres

Avant de lancer la génération, les paramètres suivants doivent être respectés :

• Section : Image
• Qualité : Fast Quality

Le mode Fast Quality permet de générer rapidement un avatar tout en conservant une qualité adaptée pour cette étape.

4. Utiliser le prompt de génération

Le prompt doit être copié dans la section Image.

Prompt à utiliser :

Do a perfect mix of this 2 woman face to create a new unreconizable portrait photo of a woman, full face and upper body visible down to the waist, centered, standing straight with her head upright, looking directly into the camera, neutral expression, body facing forward, white background, focus on the face and full upper body (head to waist), shot like a professional model portrait, sharp details, natural skin texture visible. She's wearing bikini, professional lighting, high quality, realistic, photorealistic.

Ce prompt permet de :

• mélanger les deux visages
• créer une nouvelle identité
• obtenir un résultat réaliste
• obtenir un avatar exploitable

5. Générer l'avatar

Une fois :

• les deux photos ajoutées
• le mode Fast Quality sélectionné
• le prompt ajouté

la génération peut être lancée.

L'application va créer un nouvel avatar.

Plusieurs résultats peuvent apparaître.

6. Sélectionner l'avatar final

Il est important de sélectionner l'image qui présente :

• le meilleur réalisme
• la meilleure qualité
• le visage le plus cohérent

Cet avatar devient le visage officiel du modèle.

7. Sauvegarder l'avatar

Une fois sélectionné, l'avatar doit être sauvegardé.

Cet avatar sera utilisé :

• comme image de référence
• pour les futures générations
• pour la création du contenu

Il constitue la base du modèle.`,
      },
      {
        id: "2-2",
        title: "Comment utiliser cet avatar pour générer les contenus",
        content: `Une fois l'avatar du modèle créé, l'étape suivante consiste à l'utiliser pour générer du contenu. Le principe est simple : utiliser des photos existantes comme base, puis y reproduire le modèle en conservant exactement la même scène, tout en remplaçant l'identité par celle de l'avatar.

Cette méthode permet de créer du contenu réaliste, varié et cohérent.

1. Choisir une image de référence

La première étape consiste à se rendre sur Pinterest afin de choisir une image servant de base.

L'image sélectionnée doit correspondre au type de contenu souhaité.

Il est recommandé de choisir une image :

• réaliste
• de qualité smartphone
• naturelle
• avec une pose claire
• en format vertical de préférence

Cette image servira de modèle pour générer la nouvelle version avec l'avatar.

Une fois l'image sélectionnée, elle doit être téléchargée.

2. Générer le prompt avec ChatGPT

L'image choisie doit ensuite être insérée dans ChatGPT.

Une fois l'image ajoutée, le texte suivant doit être utilisé :

When I send you an image, your task is to generate a highly detailed prompt that will be used in Gemini to recreate that image. The prompt you generate must instruct Gemini to recreate the scene to be almost identical to the original image in every visual aspect, including the pose, body position, camera angle, framing, composition, perspective, facial expression, environment, background, lighting, shadows, clothing, hair, and overall mood. The generated prompt must clearly instruct Gemini to use the provided avatar as the reference for the physical traits and identity of the person, while keeping everything else identical to the original image. The generated prompt must emphasize extreme photorealism and realism and instruct Gemini to produce an image that looks like a real smartphone photo, not AI-generated. It must include instructions for natural and imperfect skin texture, visible pores, natural imperfections, slight grain, and natural digital noise. It must also clearly specify no beauty filters, no skin smoothing, no retouching, and no studio lighting, and describe lighting as natural and realistic. The generated prompt must specify the correct aspect ratio matching the original image. The generated prompt must be written in English. Do not generate the image, only generate the Gemini prompt. This must be generated in 9:16

ChatGPT va alors générer un prompt adapté à l'image et à l'avatar.

Ce prompt servira pour la génération finale.

3. Générer l'image finale dans Gemini Nano Banana Pro

Une fois le prompt obtenu, il faut se rendre sur Gemini Nano Banana Pro.

Dans l'interface, il faut :

• cliquer sur Créer une image
• ajouter l'avatar du modèle en fichier
• activer le mode Pro
• coller le prompt généré

L'avatar est indispensable, car il permet de conserver le même visage.

Le mode Pro permet d'obtenir un résultat plus réaliste et plus cohérent.

Une fois ces éléments en place, la génération peut être lancée.

4. Si Gemini refuse de générer l'image

Dans certains cas, Gemini Nano Banana Pro peut refuser de générer l'image.

Cela peut arriver à cause de certains mots ou de la structure du prompt.

Dans ce cas, la solution consiste simplement à modifier le prompt.

Il est possible de :

• reformuler certaines parties
• simplifier certaines phrases
• ou générer un nouveau prompt avec ChatGPT

Il suffit ensuite de relancer la génération.`,
      },
      {
        id: "2-3",
        title: "Comment définir l'identité du modèle (prénom, personnalité, style, positionnement)",
        content: `Une fois l'avatar créé, il est nécessaire de définir l'identité du modèle. L'identité correspond à tout ce qui donne de la cohérence et de la crédibilité au personnage. Elle permet de transformer un simple visage en un modèle complet, avec une présence claire et exploitable.

L'identité rend le modèle crédible et permet de construire une image stable.

1. Choisir le prénom du modèle

La première étape consiste à choisir un prénom.

Le prénom doit être :

• simple
• crédible
• facile à retenir

Il doit correspondre au style du modèle.

Le prénom sera utilisé sur les plateformes, dans la bio, et dans les interactions.

Il devient un élément central de l'identité.

2. Définir l'âge du modèle

Un âge doit être défini afin de maintenir une cohérence.

L'âge doit correspondre :

• à l'apparence du modèle
• à son style
• à son positionnement

Cet âge restera toujours le même.

Il permet de donner un cadre au personnage.

3. Définir la personnalité

La personnalité correspond à la manière dont le modèle s'exprime et se comporte.

Elle permet de donner une dimension humaine au modèle.

La personnalité peut être par exemple :

• naturelle
• timide
• confiante
• énergique
• douce

Cette personnalité influencera :

• les messages
• la manière de parler
• le type de contenu

Elle doit rester cohérente.

4. Définir le style

Le style correspond à l'image générale du modèle.

Cela inclut :

• le type de vêtements
• l'ambiance du contenu
• le type de photos

Le style doit correspondre à l'apparence du modèle.

Il permet de créer une image reconnaissable.

5. Définir le contexte général

Le modèle doit avoir un contexte de base.

Cela peut inclure :

• un lieu de vie
• un mode de vie
• des centres d'intérêt

Ces éléments permettent de rendre le modèle plus crédible.

Ils servent également lors des conversations.

6. Maintenir la cohérence

Une fois définie, l'identité du modèle ne doit pas changer.

Les éléments suivants doivent rester constants :

• le prénom
• l'âge
• la personnalité
• le style

Cette cohérence est essentielle.

Elle permet de construire un modèle stable et crédible.`,
      },
      {
        id: "2-4",
        title: "Comment garantir la cohérence du modèle dans le temps",
        content: `1. Toujours utiliser le même avatar de référence

L'avatar créé au début doit toujours être utilisé comme base.

Cet avatar doit être :

• sauvegardé
• conservé
• et réutilisé

Lors de chaque nouvelle génération dans Gemini Nano Banana Pro, l'avatar doit toujours être ajouté en fichier.

Cela permet de conserver :

• le même visage
• les mêmes traits
• la même identité

Sans cet avatar, le modèle risque de changer.

C'est la règle la plus importante.

2. Toujours utiliser le mode Pro dans Gemini Nano Banana Pro

Lors de chaque génération, le mode Pro doit toujours être activé.

Le mode Pro permet :

• une meilleure précision
• un meilleur respect du visage
• un rendu plus réaliste

Cela réduit les différences entre les images.

3. Conserver les mêmes caractéristiques physiques

Le modèle doit toujours garder les mêmes caractéristiques.

Ces éléments ne doivent jamais changer :

• visage
• couleur des cheveux
• type de cheveux
• couleur des yeux
• morphologie générale

Le modèle doit rester reconnaissable immédiatement.

4. Utiliser des prompts cohérents

Les prompts utilisés doivent rester dans la même logique.

Ils doivent respecter :

• le même modèle
• le même style
• le même niveau de réalisme

Les prompts ne doivent pas décrire une personne différente.

Ils doivent toujours être basés sur l'avatar.

5. Conserver la même identité

L'identité définie précédemment doit rester identique.

Cela inclut :

• le prénom
• l'âge
• la personnalité
• le style

Ces éléments ne doivent pas changer.

Ils permettent de construire un modèle stable.

6. Vérifier chaque image générée

Après chaque génération, il est important de vérifier que :

• le visage correspond
• le modèle est cohérent
• il n'y a pas de changement majeur

Si une image est incohérente, elle ne doit pas être utilisée.

Seules les images cohérentes doivent être conservées.`,
      },
    ],
  },
  {
    id: "3",
    number: 3,
    title: "Création du contenu",
    objective: "Produire le contenu nécessaire à l'activité.",
    intro: "Des prompts, des exemples et une méthode précise sont fournis.",
    categories: [
      {
        id: "3-1",
        title: "Comment utiliser l'outil permettant de générer les différentes versions du modèle",
        content: `Une fois le modèle créé, différents outils sont utilisés selon le type de contenu souhaité. Chaque outil possède un rôle précis afin de garantir la qualité et la cohérence du modèle.

Gemini Nano Banana Pro est utilisé pour générer les images de base du modèle, tandis que Alexya.ai est utilisé pour créer des versions alternatives, notamment avec différentes tenues comme la lingerie.

1. Rôle de Gemini Nano Banana Pro

Gemini Nano Banana Pro sert à générer les images principales du modèle.

Ces images sont utilisées pour :

• créer la base du contenu
• générer des photos réalistes
• maintenir la cohérence du visage

Ces images servent ensuite de base pour les modifications futures.

Il est recommandé de générer plusieurs images du modèle avec différentes poses, tout en conservant le même avatar et le mode Pro activé.

Ces images deviennent les images sources.

2. Utiliser Alexya.ai pour générer des versions alternatives

Une fois une image générée avec Gemini, Alexya.ai permet de créer des versions modifiées du modèle.

Le processus consiste à importer :

• une image du modèle générée avec Gemini
• l'avatar du modèle
• l'image de la tenue souhaitée (par exemple une lingerie)

Ces éléments permettent de modifier l'apparence tout en conservant l'identité.

3. Utiliser le mode Fast Quality

Sur Alexya.ai, il est nécessaire d'utiliser le mode Fast Quality.

Ce mode permet :

• une génération plus flexible
• une modification efficace de la tenue
• un résultat exploitable

Ce mode est adapté pour ce type de génération.

4. Prompt à utiliser

Un prompt simple et précis doit être utilisé.

Prompt recommandé :

"Remplace la tenue actuelle par la lingerie fournie, en conservant strictement le même modèle, le même visage, la même pose, le même angle de caméra, le même cadrage, le même environnement et le même niveau de réalisme, avec un rendu photoréaliste naturel."

Ce prompt permet de :

• conserver l'identité
• modifier uniquement la tenue
• maintenir le réalisme

5. Importance du choix de l'image de base

Il est recommandé d'utiliser des images où le modèle est légèrement éloigné du miroir ou de la caméra.

Cela permet :

• de conserver la qualité du visage
• de réduire les imperfections
• d'obtenir un résultat plus naturel

Les photos miroir sont particulièrement adaptées.`,
      },
      {
        id: "3-2",
        title: "Comment produire du contenu cohérent et réaliste",
        content: `Produire du contenu cohérent et réaliste est essentiel pour maintenir la crédibilité du modèle. L'objectif est de donner l'impression qu'il s'agit toujours de la même personne, dans le même quotidien, et non d'images générées séparément.

La cohérence visuelle est ce qui permet de rendre le modèle crédible sur le long terme.

1. Garder toujours le même visage et les mêmes caractéristiques

La règle principale est de toujours conserver :

• le même visage
• la même morphologie
• le même style général

Chaque image doit être immédiatement reconnaissable.

Le modèle ne doit jamais sembler être une personne différente.

2. Éviter les tatouages

Les tatouages sont fortement déconseillés.

En effet, les tatouages sont des éléments fixes dans la réalité. S'ils apparaissent sur une image et disparaissent sur une autre, cela casse immédiatement la crédibilité.

Il est donc recommandé :

• de ne jamais générer de tatouages
• de ne pas utiliser d'images contenant des tatouages

Un modèle sans tatouage est plus facile à rendre cohérent.

3. Éviter les bijoux récurrents ou incohérents

Les bijoux peuvent également poser un problème de cohérence.

Par exemple :

• un collier présent sur une image mais absent sur une autre
• des boucles d'oreilles différentes selon les photos

Cela crée des incohérences.

Il est recommandé :

• soit de ne pas utiliser de bijoux
• soit d'utiliser des bijoux très discrets
• soit de rester cohérent

La simplicité est recommandée.

4. Faire attention aux téléphones et accessoires visibles

Les téléphones visibles dans les photos miroir doivent rester cohérents.

Par exemple, il faut éviter :

• un iPhone noir sur une image
• un iPhone blanc sur une autre
• ou un téléphone différent

Dans la réalité, une personne utilise généralement le même téléphone.

Il est donc recommandé de garder :

• la même couleur
• le même modèle

Ou d'éviter de montrer le téléphone clairement.

5. Limiter le nombre d'environnements

Utiliser trop d'endroits différents peut rendre le modèle incohérent.

Par exemple :

• une chambre différente à chaque photo
• des miroirs différents
• des maisons différentes

Cela peut donner l'impression que les images ne représentent pas la même personne.

Il est recommandé de :

• utiliser 1 à 3 environnements principaux
• réutiliser les mêmes pièces
• garder une cohérence

Cela renforce le réalisme.

6. Garder un style cohérent

Le style global doit rester similaire.

Cela inclut :

• le type de photos
• le type d'éclairage
• le type de poses

Le modèle doit conserver une continuité visuelle.

7. Vérifier chaque image

Avant d'utiliser une image, il est important de vérifier :

• la cohérence du visage
• la cohérence de l'environnement
• la cohérence générale

Toute image incohérente doit être évitée.`,
      },
      {
        id: "3-3",
        title: "Quels types de contenu créer",
        content: `Pour développer le modèle et maintenir l'intérêt, il est important de créer du contenu varié. La variété permet de rendre le profil plus réaliste, plus naturel et plus attractif.

Un modèle crédible ne publie pas toujours le même type de photo. Il doit donner l'impression d'avoir un contenu diversifié, comme une vraie personne.

1. Varier les tenues

Il est essentiel de varier les tenues afin d'éviter la répétition.

Cela peut inclure :

• différentes lingeries
• des sous-vêtements de styles différents
• des tenues décontractées
• des tenues du quotidien
• des tenues plus travaillées

Le fait de changer les tenues permet de renouveler le contenu tout en gardant le même modèle.

2. Varier le niveau de suggestion

Le contenu peut également varier dans son niveau d'audace.

Il est possible d'alterner entre :

• des photos naturelles
• des photos miroir
• des photos plus posées
• des photos plus suggestives
• des photos plus rapprochées
• des photos plus éloignées

Cette variation permet d'éviter la monotonie.

3. Varier les poses

Changer les poses permet de rendre le contenu plus vivant.

Par exemple :

• debout
• face au miroir
• assis
• allongé
• angle de face
• angle de côté

Cela donne l'impression d'un contenu réel.

4. Varier les environnements tout en restant cohérent

Il est possible d'utiliser plusieurs environnements, tout en restant cohérent.

Par exemple :

• chambre
• salle de bain
• miroir
• intérieur

Ces environnements doivent rester logiques et réalistes.

5. Alterner entre contenu simple et contenu plus travaillé

Il est recommandé de mélanger :

• des photos simples
• des photos plus préparées

Cela rend le profil plus naturel.

Un contenu trop uniforme peut paraître artificiel.`,
      },
      {
        id: "3-4",
        title: "Comment constituer une base de contenu exploitable",
        content: `Avant de publier, il est important de créer une base de contenu suffisante. Cette base permet d'avoir du contenu prêt à l'avance et d'éviter de devoir générer dans l'urgence.

1. Générer plusieurs photos à l'avance

Il est recommandé de créer 20 à 50 images minimum du modèle avec :

• différentes tenues
• différentes poses
• différents angles

Tout en restant cohérent.

2. Organiser le contenu

Les images doivent être sauvegardées et classées dans des dossiers, par exemple :

• miroir
• lingerie
• naturel
• suggestif

Cela permet de s'y retrouver facilement.

3. Garder les meilleures images

Seules les images :

• réalistes
• cohérentes
• de bonne qualité

doivent être conservées.

Les images incohérentes doivent être supprimées.

4. Toujours garder du contenu en réserve

Il est important de ne pas tout utiliser immédiatement.

Avoir du contenu d'avance permet de :

• publier régulièrement
• rester organisé
• gagner du temps`,
      },
    ],
  },
  {
    id: "4",
    number: 4,
    title: "Mise en place et système de paiement",
    objective: "Rendre le modèle opérationnel et capable de générer des revenus.",
    intro: "Le modèle devient prêt à être monétisé.",
    categories: [
      {
        id: "4-1",
        title: "Quelles applications utiliser pour la monétisation",
        content: `La monétisation du modèle se fait via des plateformes spécialisées qui permettent de recevoir de l'argent en échange du contenu. Il existe deux méthodes principales : les plateformes à abonnement et les plateformes à lien de paiement.

Les deux applications principales à utiliser sont Fanvue et DropFans.

1. Fanvue — Plateforme par abonnement

Fanvue fonctionne avec un système d'abonnement mensuel.

Le principe est simple :

• le modèle possède un profil
• les utilisateurs s'abonnent en payant chaque mois
• ils obtiennent accès au contenu

Fanvue permet également :

• d'envoyer du contenu payant en message
• de discuter avec les abonnés
• de générer des revenus récurrents

C'est la méthode la plus stable pour construire un revenu dans le temps.

2. DropFans — Plateforme par lien de paiement

DropFans fonctionne différemment.

Il n'y a pas d'abonnement mensuel.

Le principe est le suivant :

• un contenu est créé
• un lien de paiement est généré
• ce lien est envoyé à l'utilisateur
• l'utilisateur paie pour accéder au contenu

Chaque paiement est individuel.

Cette méthode est souvent utilisée pour vendre du contenu spécifique.

3. Différence entre les deux

Fanvue :

• abonnement mensuel
• revenus récurrents
• construction d'une audience

DropFans :

• paiement à l'unité
• vente directe
• utilisation flexible

Conclusion

La monétisation repose sur ces deux systèmes :

• Fanvue pour les abonnements
• DropFans pour les paiements via lien

Ces deux plateformes permettent de recevoir les revenus générés par le modèle et constituent la base du système de monétisation.`,
      },
      {
        id: "4-2",
        title: "Comment configurer le profil",
        content: `La configuration du profil est une étape essentielle. Elle permet de rendre le modèle visible, crédible et prêt à générer des revenus.

Que ce soit sur Fanvue ou sur DropFans, le principe de création du compte reste le même.

1. Créer le compte

Lors de la création, le compte doit être créé :

• en utilisant sa propre identité pour l'inscription
• et en déclarant le profil comme modèle virtuel (IA)

Les informations personnelles utilisées pour la création servent uniquement à la plateforme pour la gestion et les paiements.

Ces informations ne sont pas visibles publiquement.

Les utilisateurs ne voient que le profil du modèle.

2. Configurer le profil du modèle

Une fois le compte créé, le profil public doit être configuré avec l'identité du modèle.

Les éléments à ajouter sont :

• le prénom du modèle
• la photo de profil (avatar du modèle)
• une bannière
• une description

Ces éléments représentent l'image publique.

3. Ajouter les images du modèle

Il est nécessaire d'ajouter :

• une photo de profil claire
• des photos sur le profil

Ces images permettent de rendre le profil attractif.

4. Rester cohérent avec l'identité définie

Toutes les informations doivent correspondre à l'identité du modèle.

Cela inclut :

• le prénom
• le style
• l'image

Le profil doit rester cohérent.`,
      },
      {
        id: "4-3",
        title: "Comment optimiser la présentation",
        content: `Une bonne présentation permet d'augmenter l'attractivité du profil et de maximiser les résultats. Un profil actif et organisé inspire plus de confiance et attire plus facilement des abonnés.

L'optimisation repose principalement sur la régularité et la préparation du contenu.

1. Poster régulièrement sur Fanvue

Sur Fanvue, il est important de publier régulièrement.

Il est recommandé de :

• poster fréquemment
• garder le profil actif
• ajouter du nouveau contenu de manière constante

Le contenu doit rester dans un style suggestif et attractif, sans être excessif. Un contenu soft et naturel permet de construire un profil crédible et durable.

Cette régularité permet :

• d'améliorer la visibilité
• de maintenir l'intérêt des abonnés
• de rendre le profil vivant

Un profil actif est toujours plus performant.

2. Préparer le contenu à l'avance pour DropFans

Sur DropFans, l'organisation est essentielle.

Il est recommandé de :

• préparer beaucoup de contenu à l'avance
• avoir du contenu prêt à être envoyé
• organiser les fichiers

Cela permet de :

• répondre rapidement
• envoyer du contenu sans délai
• rester efficace

Plus le contenu est prêt, plus l'utilisation de la plateforme est fluide.`,
      },
      {
        id: "4-7",
        title: "Comment effectuer les retraits",
        content: `Au-delà du simple retrait, il existe plusieurs points importants à connaître pour éviter les blocages et sécuriser les paiements.

1. Toujours retirer régulièrement

Il est fortement recommandé de ne pas laisser des montants trop élevés sur les plateformes.

Il est préférable de :

• retirer régulièrement
• éviter d'accumuler de grosses sommes

Cela permet de :

• réduire les risques de blocage
• sécuriser les revenus

Les plateformes restent des intermédiaires, pas des banques.

2. Les premiers retraits peuvent prendre plus de temps

Lors des premiers paiements, un délai plus long peut être appliqué.

Cela est normal, car la plateforme effectue :

• des vérifications
• une validation du compte

Une fois les premiers retraits effectués, les suivants sont généralement plus rapides.

3. Fanvue et DropFans n'ont pas la même logique

Sur Fanvue, les revenus sont souvent plus stables, mais il peut y avoir un délai fixe entre le paiement de l'abonné et la disponibilité.

Sur DropFans, les paiements peuvent devenir disponibles plus rapidement, car ils sont liés à des ventes directes.

Il est donc normal que les délais soient différents.

4. Toujours vérifier que le compte est entièrement validé

Un compte non totalement validé peut :

• limiter les retraits
• ou les bloquer

Il est donc important de vérifier que :

• le profil est validé
• la méthode de paiement est validée

5. Penser en logique de gestion

Il est recommandé de :

• retirer
• sécuriser les gains
• puis réinvestir le temps dans la création de contenu

Cela permet de garder un contrôle sur les revenus.`,
      },
    ],
  },
  {
    id: "5",
    number: 5,
    title: "Acquisition de trafic",
    objective: "Attirer des visiteurs et des abonnés.",
    intro: "Cette étape permet de générer une audience.",
    categories: [
      {
        id: "5-1",
        title: "Quelles applications utiliser pour générer du trafic",
        content: `Cette partie est la plus importante. Sans trafic, le modèle ne peut pas générer de revenus. Le trafic correspond aux personnes qui découvrent le modèle et qui vont ensuite être redirigées vers les plateformes de monétisation.

Le processus repose sur un système précis en plusieurs étapes.

L'objectif est de faire passer les personnes d'une application à une autre, jusqu'à la monétisation.

1. TikTok — La base du trafic

La première application à utiliser est TikTok.

TikTok est la principale source de visibilité.

Le principe est de publier des vidéos du modèle afin de :

• attirer l'attention
• générer des vues
• susciter la curiosité

Ces vidéos permettent de faire découvrir le modèle à un grand nombre de personnes.

TikTok sert de point d'entrée.

2. Rediriger vers Instagram

Une fois les personnes intéressées, l'objectif est de les rediriger vers Instagram.

Instagram permet de :

• renforcer la crédibilité
• montrer plus de contenu
• créer un lien

Le lien Instagram est généralement présent dans la bio TikTok.

Les personnes passent donc de TikTok à Instagram.

3. Rediriger vers Telegram

Depuis Instagram, les personnes sont ensuite redirigées vers Telegram.

Telegram est utilisé pour :

• regrouper les personnes intéressées
• centraliser l'audience
• préparer la monétisation

Telegram devient l'espace principal.

4. Commencer la monétisation depuis Telegram

Une fois les personnes sur Telegram, le travail de monétisation commence.

Telegram permet :

• d'échanger avec les personnes
• d'envoyer du contenu
• de rediriger vers Fanvue ou DropFans

C'est à cette étape que les visiteurs deviennent des clients.

Résumé du processus

Le trafic suit ce chemin :

TikTok → Instagram → Telegram → Monétisation

Conclusion

Les applications utilisées sont :

• TikTok pour attirer
• Instagram pour renforcer l'intérêt
• Telegram pour préparer et effectuer la monétisation

Ce système constitue la base de l'acquisition de trafic.`,
      },
      {
        id: "5-2",
        title: "Comment créer et configurer les comptes",
        content: `La création et la configuration des comptes sont des étapes déterminantes pour maximiser le trafic. Le succès repose sur deux éléments principaux : le volume et la qualité.

Les deux doivent toujours être combinés.

1. Le volume est essentiel

Le volume augmente fortement les chances d'obtenir de la visibilité.

Il est recommandé de :

• créer plusieurs comptes TikTok
• créer plusieurs comptes Instagram
• créer plusieurs sources de trafic

Chaque compte représente une opportunité supplémentaire de viralité.

Plus il y a de comptes, plus il y a de chances qu'un compte fonctionne mieux que les autres.

Un seul compte ne suffit généralement pas.

2. Prévoir les éventuels bannissements

Les plateformes comme TikTok peuvent parfois suspendre ou bannir des comptes.

C'est pourquoi il est important de :

• ne pas dépendre d'un seul compte
• avoir plusieurs comptes actifs
• toujours avoir des comptes de secours

Cela permet de continuer l'activité sans interruption.

3. Maintenir une bonne qualité

Même avec un volume élevé, la qualité reste importante.

Les comptes doivent être :

• propres
• crédibles
• cohérents

Les profils doivent contenir :

• une photo de profil du modèle
• une bio adaptée
• du contenu cohérent

Un compte crédible attire plus facilement des abonnés.

4. Construire un système

L'objectif est de créer un ensemble de comptes qui travaillent ensemble.

Certains comptes vont :

• générer beaucoup de vues
• générer des abonnés
• rediriger vers Instagram

Ce système permet d'augmenter le trafic global.`,
      },
      {
        id: "5-3",
        title: "Comment publier efficacement",
        content: `La régularité est un facteur essentiel pour générer du trafic. Les plateformes favorisent les comptes actifs. Il est donc important d'être présent en permanence et de publier chaque jour.

L'objectif est de maintenir une activité constante.

1. Publier plusieurs TikTok par jour

Sur TikTok, il est recommandé de publier entre 2 et 3 vidéos par jour, par compte.

Cette fréquence permet :

• d'augmenter les chances de viralité
• de toucher plus de personnes
• d'accélérer la croissance

Chaque vidéo représente une nouvelle opportunité d'obtenir des vues.

Il est également recommandé de publier au moins une story TikTok par jour afin de garder le compte actif.

2. Publier des stories Instagram chaque jour

Sur Instagram, il est important de publier au minimum une story par jour.

Les stories permettent de :

• maintenir l'activité
• renforcer la crédibilité
• garder l'attention

Un compte actif inspire plus de confiance.

3. Alimenter régulièrement le canal Telegram

Sur Telegram, le canal doit également être alimenté.

Il est recommandé de :

• publier régulièrement
• ajouter du contenu
• garder le canal actif

Un canal actif permet de maintenir l'intérêt et de préparer la monétisation.

4. Maintenir une présence constante

La clé est la constance.

Publier chaque jour permet :

• d'augmenter la visibilité
• d'améliorer les résultats
• de développer le trafic

Les comptes actifs sont toujours favorisés par les plateformes.`,
      },
      {
        id: "5-4",
        title: "Comment attirer des visiteurs vers la plateforme de monétisation",
        content: `Attirer des visiteurs vers la plateforme de monétisation repose sur la capacité à susciter l'intérêt et la curiosité. Le but est de donner envie aux personnes d'en voir plus, sans tout montrer directement sur les plateformes publiques.

Il faut trouver un équilibre entre attirer l'attention et respecter les règles des plateformes.

1. Utiliser du contenu suggestif

Le contenu publié doit être attractif et engageant.

Il est recommandé d'utiliser par exemple :

• des tenues avec décolleté
• des maillots de bain
• des tenues ajustées
• des photos miroir naturelles
• des angles valorisants

Ce type de contenu permet d'attirer l'œil tout en restant autorisé sur les plateformes.

L'objectif est de créer de la curiosité.

2. Donner envie sans tout montrer

Il est important de ne pas publier le contenu principal directement.

Les plateformes comme TikTok et Instagram servent à :

• attirer
• intriguer
• donner un aperçu

Le contenu plus exclusif est réservé aux autres plateformes.

Cela encourage les visiteurs à aller plus loin.

3. Utiliser la bio et les redirections

Chaque profil doit contenir une redirection vers :

• Instagram
• Telegram
• Puis vers la plateforme de monétisation comme Fanvue ou DropFans.

Cela crée un parcours logique.

4. Créer de la frustration et de la curiosité

Le but est de :

• montrer une partie
• garder une partie privée

Ce mécanisme incite les visiteurs à cliquer et à s'abonner.`,
      },
    ],
  },
  {
    id: "6",
    number: 6,
    title: "Chatting et monétisation",
    objective: "Convertir les abonnés en revenus.",
    intro: "Des scripts, des exemples et des structures de conversation sont fournis.",
    categories: [
      {
        id: "6-1",
        title: "Comment gérer les conversations avec les abonnés",
        content: `La gestion des conversations est une étape essentielle dans la monétisation. C'est à travers les échanges que la relation se construit et que la confiance se développe. Une bonne gestion des conversations permet d'augmenter l'engagement et les revenus.

La clé principale est la patience et la création d'une relation crédible.

1. Être patient

Il est important de comprendre que la monétisation ne se fait pas immédiatement.

Les erreurs à éviter :

• aller trop vite
• parler directement d'argent
• être trop direct

Il est préférable de prendre le temps d'échanger.

La patience permet d'installer une base solide.

2. Créer une vraie relation

L'objectif est de donner l'impression d'une interaction réelle.

Cela passe par :

• répondre naturellement
• montrer de l'intérêt
• poser des questions
• maintenir la conversation

L'abonné doit sentir une connexion.

Plus la relation semble réelle, plus l'engagement augmente.

3. Être cohérent avec l'identité du modèle

La manière de parler doit toujours correspondre à la personnalité définie.

Le ton, le style et l'attitude doivent rester cohérents.

Cela renforce la crédibilité.

4. Maintenir l'engagement

Une conversation active permet de maintenir l'intérêt.

Il est important de :

• répondre régulièrement
• rester présent
• maintenir le contact

Un abonné engagé est plus susceptible de rester actif.`,
      },
      {
        id: "6-2",
        title: "Comment créer de l'engagement",
        content: `Créer de l'engagement consiste à faire en sorte que l'abonné reste actif, réponde et s'implique dans la conversation. Plus un abonné est engagé, plus il développe de l'intérêt, et plus il est susceptible de continuer et de passer à l'achat.

L'engagement repose sur l'attention et la continuité.

1. Répondre rapidement et régulièrement

La rapidité de réponse est importante.

Un abonné qui reçoit une réponse rapidement est plus susceptible de continuer la conversation.

Il est recommandé de :

• répondre régulièrement
• éviter les longues absences
• maintenir le rythme

Cela montre que le modèle est présent.

2. Poser des questions

L'engagement se crée lorsque l'abonné participe.

Pour cela, il est important de poser des questions simples, par exemple :

• sur sa journée
• sur ce qu'il fait
• sur ce qu'il aime

Cela encourage les réponses.

Une conversation active crée plus d'engagement.

3. Personnaliser les échanges

Les messages doivent sembler personnels.

Il est recommandé :

• d'utiliser son prénom
• de faire référence à ce qu'il a dit
• de rester naturel

Cela donne une impression plus réelle.

4. Maintenir une présence dans le temps

L'engagement se construit progressivement.

Il est important de :

• parler régulièrement
• maintenir le contact
• ne pas disparaître

Cela renforce la relation.`,
      },
      {
        id: "6-3",
        title: "Comment structurer les échanges",
        content: `Structurer les échanges permet de guider la conversation de manière naturelle, sans brusquer l'abonné. Une conversation efficace suit une progression logique. L'objectif est de passer d'un simple contact à un abonné engagé, puis à un abonné prêt à acheter.

Chaque étape doit se faire progressivement.

1. Phase 1 — Briser la glace

La première étape consiste à démarrer une conversation simple.

Le but est de :

• accueillir l'abonné
• créer un premier contact
• installer un climat naturel

Les premiers messages doivent rester simples et naturels.

L'objectif n'est pas de vendre immédiatement, mais de commencer la relation.

2. Phase 2 — Apprendre à connaître l'abonné

Une fois la conversation lancée, il faut s'intéresser à lui.

Cela permet de :

• créer une connexion
• comprendre son profil
• renforcer son intérêt

Cette phase consiste à poser des questions et à échanger.

L'abonné doit se sentir considéré.

3. Phase 3 — Créer de la proximité

Une fois la conversation installée, l'objectif est de renforcer le lien.

Cela consiste à :

• maintenir les échanges
• rester présent
• créer une habitude

Plus l'abonné est habitué à parler, plus il reste engagé.

4. Phase 4 — Introduire progressivement la monétisation

Une fois la relation établie, la monétisation peut être introduite naturellement.

Cela doit se faire :

• sans pression
• sans brusquer
• au bon moment

La transition doit rester logique dans la conversation.`,
      },
      {
        id: "6-4",
        title: "Comment monétiser les conversations",
        content: `La monétisation des conversations consiste à amener progressivement l'abonné à vouloir accéder à du contenu exclusif. Cela ne doit jamais être brutal. La clé est de créer une tension, une curiosité et un sentiment de proximité.

La vente est une conséquence naturelle d'une conversation bien menée.

1. Créer le contexte avant de proposer

Avant toute chose, l'abonné doit :

• se sentir privilégié
• se sentir écouté
• se sentir proche du modèle

Il ne doit pas avoir l'impression d'être un simple client.

Il doit avoir l'impression d'avoir une relation spéciale.

2. Introduire l'exclusivité

La monétisation fonctionne mieux lorsque le contenu est présenté comme :

• privé
• spécial
• réservé

Le principe est de faire comprendre que tout n'est pas public.

Par exemple, mentionner qu'un contenu plus personnel existe ailleurs, comme sur Fanvue ou via un lien DropFans.

3. Utiliser la curiosité et la frustration

Il est plus efficace de suggérer que de proposer directement.

Le but est de donner envie.

Une phrase naturelle et légère est souvent plus efficace qu'une proposition directe.

4. Exemple concret de conversation

Exemple d'échange, du point de vue du modèle :

Abonné :
tu es vraiment magnifique

Modèle :
merci c'est adorable… ça me fait plaisir que tu dises ça
tu viens de découvrir mon profil ?

Abonné :
oui depuis tiktok

Modèle :
ça me fait toujours bizarre quand quelqu'un me reconnaît d'ailleurs…
j'hésitais à poster certaines photos récemment, elles sont un peu plus personnelles

Abonné :
ah oui ?

Modèle :
oui… je les ai pas mises sur insta
je préfère les garder pour les personnes qui veulent vraiment me découvrir

Abonné :
où ça ?

Modèle :
principalement sur mon fanvue… c'est plus privé là-bas
je peux être plus moi-même

Pourquoi cet exemple fonctionne

Ce qui est important dans cet exemple :

• aucune vente directe
• aucune pression
• création de curiosité
• sentiment d'exclusivité

L'abonné fait lui-même le pas mental.

5. Se concentrer sur les abonnés réceptifs

Les abonnés les plus intéressants sont ceux qui :

• répondent beaucoup
• montrent de l'intérêt
• posent des questions

Ce sont eux les plus susceptibles de convertir.`,
      },
    ],
  },
  {
    id: "7",
    number: 7,
    title: "Organisation et optimisation",
    objective: "Structurer et optimiser l'activité.",
    categories: [
      {
        id: "7-1",
        title: "Comment organiser la production de contenu",
        content: `Une bonne organisation de la production permet de gagner du temps, de rester régulier et d'éviter les périodes sans contenu. Le but est de créer un système simple qui permet d'avoir du contenu disponible en permanence.

L'organisation est ce qui permet de maintenir la constance.

1. Produire du contenu en avance

Il est recommandé de ne jamais produire le contenu au jour le jour.

Il est préférable de :

• générer plusieurs images en une seule session
• créer du contenu pour plusieurs jours ou semaines
• constituer une réserve

Cela permet de toujours avoir du contenu prêt.

2. Classer le contenu dans des dossiers

Le contenu doit être organisé pour être facilement accessible.

Par exemple, créer des dossiers comme :

• miroir
• lingerie
• extérieur
• suggestif
• soft

Cela permet de retrouver rapidement les images.

3. Séparer le contenu selon son utilisation

Certains contenus sont utilisés pour :

• TikTok
• Instagram
• Telegram
• Fanvue
• DropFans

Il est important de garder une organisation claire.

Tout le contenu ne sert pas au même endroit.

4. Maintenir un rythme de production

Il est recommandé de produire régulièrement.

Par exemple :

• créer du contenu plusieurs fois par semaine
• ou préparer beaucoup de contenu en une fois

Cela permet d'éviter les périodes sans contenu.

5. Conserver uniquement le contenu de qualité

Il est important de :

• garder les meilleures images
• supprimer les images incohérentes

La qualité est prioritaire.`,
      },
      {
        id: "7-2",
        title: "Comment gérer les comptes",
        content: `La gestion des comptes est essentielle pour maintenir le trafic, éviter les pertes et assurer la continuité de l'activité. Une bonne gestion permet de garder le contrôle et d'éviter de repartir de zéro.

Le principe est de gérer les comptes comme des actifs.

1. Noter tous les accès

Chaque compte créé doit être enregistré.

Il est important de conserver :

• l'email
• le mot de passe
• le pseudo
• la plateforme correspondante

Ces informations doivent être stockées dans un endroit sûr.

Cela évite de perdre l'accès.

2. Gérer plusieurs comptes en parallèle

Il est normal d'avoir :

• plusieurs comptes TikTok
• plusieurs comptes Instagram
• un ou plusieurs Telegram

Chaque compte participe au trafic.

Il est important de tous les maintenir actifs.

3. Maintenir l'activité sur chaque compte

Un compte inactif perd en visibilité.

Il est important de :

• publier régulièrement
• répondre aux messages
• garder le compte actif

Même une activité minimale est utile.

4. Anticiper les pertes de comptes

Certains comptes peuvent être :

• suspendus
• bloqués
• ou supprimés

C'est pourquoi il est important de :

• avoir des comptes secondaires
• ne jamais dépendre d'un seul compte

Cela permet de continuer l'activité.

5. Garder une cohérence

Chaque compte doit rester cohérent avec le modèle.

Il faut utiliser :

• la même identité
• le même personnage
• le même style

Cela renforce la crédibilité.`,
      },
      {
        id: "7-3",
        title: "Comment optimiser le fonctionnement global",
        content: `Optimiser le fonctionnement global consiste à rendre l'activité plus efficace, plus stable et plus rentable. L'objectif est de transformer toutes les actions en un système structuré, afin de gagner du temps et d'augmenter les résultats.

L'optimisation repose sur la simplicité, la constance et l'amélioration continue.

1. Créer une routine claire

Il est important d'avoir une routine quotidienne.

Par exemple :

• publier sur TikTok
• publier en story Instagram
• répondre aux messages
• alimenter Telegram

Une routine permet de ne rien oublier et de rester constant.

2. Se concentrer sur ce qui fonctionne le mieux

Certains contenus vont fonctionner mieux que d'autres.

Il est important d'identifier :

• les vidéos qui font le plus de vues
• les photos qui attirent le plus
• les comptes qui performent le mieux

Puis de reproduire ce type de contenu.

Cela permet d'améliorer les résultats.

3. Éliminer ce qui ne fonctionne pas

Si certains contenus ou comptes ne donnent aucun résultat, il est possible de :

• arrêter de les utiliser
• modifier la stratégie

L'objectif est d'optimiser le temps.

4. Garder un flux constant

L'activité doit rester continue.

Il est important de :

• toujours publier
• toujours répondre
• toujours produire

La constance est ce qui permet la croissance.

5. Penser en système

Chaque partie a un rôle :

• le contenu attire
• les comptes diffusent
• Telegram centralise
• les plateformes monétisent

Tout fonctionne ensemble.`,
      },
    ],
  },
  {
    id: "8",
    number: 8,
    title: "Scaling et développement",
    objective: "Développer et faire évoluer l'activité.",
    categories: [
      {
        id: "8-1",
        title: "Comment reproduire le système",
        content: `Une fois qu'un modèle fonctionne et génère du trafic et des revenus, il devient possible de reproduire le système. Le principe du scaling consiste à appliquer exactement la même méthode à d'autres modèles afin de multiplier les résultats.

L'objectif est de transformer un modèle rentable en plusieurs modèles rentables.

1. Créer un nouveau modèle

La première étape consiste à créer un nouveau modèle, en suivant le même processus :

• création de l'avatar
• définition de l'identité
• génération du contenu

Le nouveau modèle doit être différent, avec :

• un nouveau visage
• un nouveau prénom
• une nouvelle identité

Mais le système reste le même.

2. Reproduire la structure de trafic

Une fois le modèle créé, il faut recréer :

• des comptes TikTok
• un compte Instagram
• un Telegram

Puis appliquer la même méthode :

TikTok → Instagram → Telegram → Monétisation

3. Réutiliser les méthodes qui fonctionnent

Il est recommandé d'utiliser :

• les mêmes types de vidéos
• les mêmes styles de contenu
• les mêmes stratégies

Ce qui fonctionne peut être reproduit.

Cela réduit les erreurs.

4. Gérer plusieurs modèles en parallèle

Chaque modèle devient une source de trafic et de revenus.

Il est possible de :

• publier pour plusieurs modèles
• gérer plusieurs Telegram
• gérer plusieurs comptes

Chaque modèle augmente le potentiel global.

5. Construire un système scalable

Le but final est d'avoir :

• plusieurs modèles
• plusieurs sources de trafic
• plusieurs sources de revenus

Le système devient alors plus puissant.`,
      },
      {
        id: "8-2",
        title: "Comment créer plusieurs modèles",
        content: `Créer plusieurs modèles permet de multiplier les sources de trafic et de revenus. Chaque modèle fonctionne comme un système indépendant. Plus il y a de modèles, plus le potentiel global augmente.

Le principe est de répéter le même processus, tout en créant des identités différentes.

1. Créer un avatar différent pour chaque modèle

Chaque nouveau modèle doit avoir :

• un visage différent
• une apparence différente

Il ne faut jamais réutiliser le même avatar.

Chaque modèle doit être unique.

Cela permet d'éviter toute confusion et de créer plusieurs identités distinctes.

2. Définir une nouvelle identité

Chaque modèle doit avoir :

• un prénom différent
• une personnalité différente
• un style différent

Même si la méthode reste la même, l'identité doit changer.

Cela permet de créer plusieurs personnages crédibles.

3. Créer du contenu spécifique pour chaque modèle

Chaque modèle doit avoir son propre contenu.

Il ne faut pas mélanger les images entre les modèles.

Chaque modèle doit rester cohérent avec sa propre identité.

4. Créer des comptes séparés

Chaque modèle doit avoir :

• ses propres comptes TikTok
• son propre Instagram
• son propre Telegram
• son propre Fanvue ou DropFans

Chaque système doit rester indépendant.

5. Ajouter progressivement de nouveaux modèles

Il est recommandé de :

• commencer avec un modèle
• maîtriser le fonctionnement
• puis créer un deuxième modèle
• puis un troisième

Cela permet de garder le contrôle.`,
      },
      {
        id: "8-3",
        title: "Comment augmenter les revenus",
        content: `Augmenter les revenus ne dépend pas d'un seul facteur, mais de l'optimisation de l'ensemble du système. Le principe est simple : plus de trafic, plus de conversion, et plus de modèles permettent d'augmenter les résultats.

L'objectif est d'améliorer chaque étape.

1. Augmenter le volume de trafic

Le trafic est la base des revenus.

Pour augmenter le trafic, il est possible de :

• publier plus de TikTok
• utiliser plus de comptes
• publier plus régulièrement

Plus il y a de visiteurs, plus il y a de potentiel de revenus.

2. Améliorer la conversion

Tous les visiteurs ne deviennent pas des abonnés ou des acheteurs.

Il est important de :

• améliorer les conversations
• améliorer la présentation
• améliorer le profil

Une meilleure conversion augmente directement les revenus.

3. Produire plus de contenu

Plus de contenu permet de :

• alimenter les plateformes
• maintenir l'intérêt
• attirer plus de personnes

Un modèle actif génère plus.

4. Créer plusieurs modèles

Chaque modèle représente une nouvelle source de revenus.

Un modèle peut générer un certain montant, plusieurs modèles multiplient ce montant.

C'est l'un des leviers les plus puissants.

5. Se concentrer sur ce qui fonctionne le mieux

Certains contenus, comptes ou stratégies fonctionnent mieux que d'autres.

Il est important de :

• identifier ce qui fonctionne
• reproduire ces résultats

Cela permet d'optimiser les performances.`,
      },
    ],
  },
];

export const BONUS = {
  id: "bonus",
  title: "Bonus inclus dans la formation",
  intro: "La formation inclut également :",
  categories: [
    {
        id: "b-1",
        title: "Des prompts prêts à utiliser",
        content: `Voici quelques exemples de prompt pour créer des photos classiques de ta modèle :

Exemple 1 (format simple) :

{
  "prompt": "A hyper-realistic, candid mirror selfie shot in a vertical composition, capturing a young woman [use avatar] standing in a bedroom environment. The subject [use avatar] has long, dark, voluminous wavy hair [use avatar] parting in the middle and cascading over her shoulders. She poses with a confident, slightly pouty expression, wearing sharp winged black eyeliner, mascara, and glossy lips. She is dressed in an oversized, vintage-style black leather racing jacket that features bold, wide horizontal stripes on the sleeves in shades of chestnut brown and cream white; the leather texture must appear heavy, worn, and authentic with visible grain and creases. She is holding a gray iPhone 15 in her right hand to take the photo. Her fingers are adorned with multiple silver rings, and she has long, almond-shaped manicured nails in a pale neutral shade. She wears thin silver hoop earrings. The background is a casually tidy room with white walls. To the left, there is a piece of furniture (a bed or sofa) upholstered in burnt orange or brown velvet with a scalloped design, accented by a retro-style cylindrical bolster pillow featuring a checkered pattern in orange, green, and cream. Behind this furniture, the headstocks of two guitars are leaning against the wall, alongside a uniquely shaped, asymmetrical wooden mirror hanging on the wall. To the right, a window is covered by closed white horizontal blinds. In the bottom right foreground, there is a partial view of a white table surface with a marble coaster and a small metallic dish. The lighting is natural indoor ambient light, creating soft shadows and realistic highlights on the leather jacket and the subject's face. The image quality must be raw and unpolished, mimicking a high-end iPhone camera with 8K resolution. It is crucial to preserve all natural skin textures, pores, and imperfections; do not smooth the skin or apply any beauty filters. The image must be sharp and free of blur. Ensure no tattoos are visible on the subject.",
  "aspect_ratio": "9:16"
}

Exemple 2 (format détaillé meta / scene / lighting / sujet) :

{
  "meta": {
    "aspect_ratio": "9:16",
    "quality": "ultra_photorealistic",
    "resolution": "8k",
    "camera": "iPhone 15 Gray",
    "lens": "26mm",
    "style": "candid selfie, playful aesthetic, low angle perspective"
  },
  "scene": {
    "location": "A casual, domestic indoor setting, likely a bedroom or living room, viewed from an extreme low angle looking upwards towards the ceiling, creating an intimate and spontaneous vibe characteristic of personal selfies.",
    "environment": "A minimal interior space defined largely by the plain white ceiling above, featuring a dark metal ceiling fan with visible blades on the left side and a recessed circular light fixture providing ambient illumination.",
    "time": "Evening or night time, suggested by the use of artificial indoor lighting rather than natural daylight, creating a warm and cozy enclosed atmosphere suitable for a relaxed home setting.",
    "atmosphere": "Playful, cheeky, and relaxed, capturing a moment of spontaneous fun and casual intimacy, with a focus on the subject's interaction with the camera from a unique and distinct perspective."
  },
  "lighting": {
    "type": "Indoor artificial lighting, likely coming from the overhead recessed light visible in the frame or a nearby lamp, casting a warm, yellowish hue typical of residential tungsten or warm LED bulbs.",
    "sources lumineuses": "A primary overhead source that illuminates the top of the head and face, while the angle of the camera allows for shadows to form beneath the jawline and under the hood of the sweatshirt.",
    "direction": "Top-down lighting relative to the room, but due to the low camera angle, it acts as a backlight and top light, highlighting the hair texture and the contours of the hoodie.",
    "effet": "Soft diffusion with distinct shadows cast on the neck and collarbone area, creating depth and emphasizing the three-dimensionality of the face and the heavy fabric of the clothing."
  },
  "sujet": {
    "sujet": "always use avatar",
    "taille": "fine",
    "hanches": "rondes, galbées",
    "jambes": "longues, lisses, élégantes",
    "peau": {
      "teint": "use avatar",
      "texture": "use avatar",
      "détails": "use avatar"
    },
    "visage": {
      "structure": "use avatar",
      "expression": "A playful and slightly provocative facial expression where the tongue is stuck out slightly, resting on the lower lip in a teasing manner, while the head is tilted back to look down at the camera lens.",
      "bouche": "use avatar",
      "maquillage": "use avatar",
      "coiffure": "use avatar"
    },
    "position générale": "The subject is leaning over the camera or positioning the camera very low, creating a looming effect where the head and shoulders dominate the frame against the ceiling background.",
    "bas du corps": {
      "jambes": "longues, lisses, élégantes",
      "posture": "Not visible in this specific frame due to the close-up crop on the upper body and head, but implied to be in a relaxed standing or sitting position supporting the upper body's lean.",
      "hanches": "rondes, galbées",
      "position": "The lower body is out of frame, focusing entirely on the upper torso interaction with the extreme low angle lens.",
      "effet": "The perspective minimizes the body below the chest, drawing all attention to the face and the immediate drape of the hoodie around the neck."
    },
    "torse": {
      "arche": "The upper back is slightly arched backwards or the neck is extended to facilitate the downward gaze, emphasizing the length of the neck and the jawline.",
      "poitrine": "use avatar",
      "posture": "The shoulders are relaxed but raised slightly due to the angle of the arms or the fit of the oversized hoodie, creating a cozy and enveloped silhouette."
    },
    "bras": {
      "un_bras": "Not clearly visible, likely extended downwards to hold the phone or resting at the sides, covered by the voluminous fabric of the oversized hoodie sleeves.",
      "autre_bras": "Similarly obscured by the large sweatshirt, implying a relaxed posture where the arms are not the focal point of the action.",
      "tête": {
        "inclinaison": "Tilted backwards with the chin raised high, allowing the camera to capture the face from below, highlighting the jawline and the underside of the nose.",
        "regard": "Directly downwards into the camera lens, creating an engaging and immersive eye contact that feels personal and direct to the viewer."
      }
    },
    "tenue": {
      "vêtements": "Casual loungewear focusing on comfort and oversized aesthetics, suitable for a relaxed home environment.",
      "haut": {
        "type": "A thick, oversized hoodie or sweatshirt made of a soft, fleece-like material that looks warm and comfortable.",
        "coupe": "Loose and baggy fit, with a large hood that is currently down but bunches up around the neck, adding volume to the silhouette.",
        "couleur": "A pale, creamy yellow or beige tone that reflects the warm indoor lighting and contrasts softly with the white ceiling."
      },
      "bas": {
        "type": "Not visible in the frame.",
        "couleur": "Not visible.",
        "coupe": "Not visible."
      }
    }
  },
  "camera_perspective": {
    "pov": "Extreme low angle, worm's eye view, looking almost vertically upwards at the subject from a position below their chin level.",
    "angle": "Upward tilt, capturing the subject against the ceiling, distorting perspective slightly to make the head appear smaller relative to the neck and shoulders.",
    "framing": "Close-up portrait framing that cuts off at the shoulders, filling the center of the image with the subject's face and hood.",
    "feel": "Intimate, candid, and spontaneous, replicating the aesthetic of a playful selfie taken on a mobile device in a personal space."
  }
}

Exemple 3 (format subject / position / environment / camera / negative_prompt) :

{
  "subject": {
    "description": "use the avatar",
    "body_type": {
      "build": "Athletic and curvy figure with generous, natural curves.",
      "chest": "Full bust with a plunging neckline that enhances the natural volume and weight of the breasts, without flattening or minimal compression.",
      "skin_details": "Realistic skin texture with visible pores, visible tan lines on the upper chest and shoulders, and a subtle sheen on the forehead and shoulders."
    },
    "apparent": {
      "garment": "Intense carmine red one-piece swimsuit (monokini style).",
      "details": "Backless top, deep V-neck extending to the midriff, drawstring waist, high leg cut, and visible fabric texture."
    },
    "accessories": [
      "Gold chain necklace with toggle clasp.",
      "White manicured nails.",
      "Black hair tie on left wrist.",
      "Pearl bracelet on right wrist."
    ]
  },
  "position": {
    "position": "Sitting on the floor, leaning slightly back.",
    "arms": {
      "left_arm": "Raised, elbow bent, hand placed horizontally above the eyes to shield them from the sun in a playful greeting gesture.",
      "right_arm": "Extended downwards, hand resting on the paved ground to support the body's weight."
    },
    "head": "Looking straight ahead, slightly tilted, looking directly at the camera.",
    "legs": "Seated position, hips on the floor, thighs facing the camera."
  },
  "environment": {
    "location": "Residential outdoor terrace/veranda.",
    "flooring": "Rectangular gray brick slabs with exposed joints.",
    "background_elements": [
      "Dark gray woven wicker outdoor furniture (sofa and armchair).",
      "Navy blue outdoor cushions.",
      "Dark exterior siding of the house.",
      "White-framed windows.",
      "Green cup with straw placed on a table in the background."
    ]
  },
  "camera": {
    "shot_type": "Medium shot, capturing the subject from the top of the head to the upper thighs.",
    "perspective": "Slightly high angle shot of the seated subject.",
    "focal_length": "35mm equivalent, providing a natural but slightly wide field of view, typical of high-end mobile photography.",
    "depth_of_field": "Medium depth of field, sharp subject, slightly blurred but distinct background."
  },
  "lighting": {
    "source": "Natural, bright, and directional light.",
    "characteristics": "Sunlight coming from above/the front left.",
    "shadows": "Sharp shadow of the left hand on the forehead and eyes, soft shadows under the jaw and chest, cast shadows on the pavement."
  },
  "mood_and_expression": {
    "emotion": "Relaxed, joyful, and engaging.",
    "facial_expression": "Soft, natural smile, eyes slightly squinting in the light but maintaining eye contact.",
    "atmosphere": "Casual summer day, spontaneous influencer style."
  },
  "style_and_realism": {
    "style": "Photorealistic, spontaneous aesthetic.",
    "texture_quality": "High-fidelity skin texture, visible fabric weave, realistic paving stone texture.",
    "rendering": "Unfiltered look, preserving natural skin imperfections and tan lines, avoiding a plastic effect."
  },
  "colors_and_tone": {
    "palette": "Natural tones (bronze/beige), vibrant carmine red, cool grays of the terrace, touches of navy blue.",
    "contrast": "Medium to high contrast due to direct sunlight.",
    "saturation": "Natural to slightly vivid."
  },
  "quality_and_technical_details": {
    "resolution": "4K, highly detailed.",
    "sharpness": "Optimal sharpness on the face and torso.",
    "noise": "Light digital noise, typical of natural light photography."
  },
  "aspect_ratio_and_output": {
    "ratio": "3:4",
    "orientation": "Vertical portrait."
  },
  "controlnet": {
    "pose_control": {
      "skeleton": "Sitting, hand over eyes, leaning on one hand.",
      "strength": 0.95
    },
    "depth_control": {
      "map": "Preserve the depth of the seated character relative to the garden furniture.",
      "strength": 0.8
    }
  },
  "negative_prompt": [
    "Anatomical normalization",
    "Reduced chest volume",
    "Flattened pectoral",
    "Unrealistic size ratios",
    "Plastic skin",
    "Imperfections retouched",
    "Mirror selfie",
    "Holding phone",
    "Phone in hand",
    "Reflection",
    "Distorted fingers",
    "Extra limbs",
    "Cartoon style",
    "Illustration",
    "3D rendering",
    "Dimmed colors",
    "Blur"
  ]
}`,
      },
    {
        id: "b-2",
        title: "Des scripts de conversation",
        content: `Script complet — Du premier contact à la conversion

Modèle :

hey toi… t'es nouveau ici ? 👀

Abonné :
oui

Modèle :

bienvenue alors… 😌
tu m'as découverte où ?

Abonné :
tiktok

Modèle :

je m'en doutais…
j'ai toujours peur de qui peut me reconnaître ici 🙈

Modèle :

et dis-moi la vérité…
tu me trouves comment ? sois honnête

Abonné :
t'es magnifique

Modèle :

mmh… t'es mignon de dire ça 😌
tu me rends curieuse maintenant

Modèle :

t'es du genre sage… ou un peu dangereux ? 😇

Abonné :
ça dépend

Modèle :

ça dépend de moi ? 😏

Modèle :

parce que moi…
je suis sage en apparence seulement…

Modèle :

tout à l'heure j'ai pris des photos…
mais je sais pas si je dois les montrer

Abonné :
pourquoi ?

Modèle :

elles sont un peu… spéciales 🙈
pas comme celles que je poste partout

Modèle :

j'aime pas que tout le monde y ait accès

Modèle :

je préfère les garder pour ceux qui me donnent vraiment envie…

Abonné :
ah oui ?

Modèle :

oui…
et toi t'as l'air d'en faire partie 😌

Modèle :

mais je peux pas les envoyer ici…

Modèle :

je les garde sur mon fanvue… c'est plus privé
et je peux être vraiment moi-même là-bas

Modèle :

je te donne le lien si tu veux… mais prépare-toi 😇

Variante plus directe (après confiance installée)

Modèle :

tu sais quoi…
je crois que t'es en train de devenir mon préféré ici

Modèle :

ça me donne envie d'être un peu plus… gentille avec toi

Modèle :

viens me rejoindre là où je poste tout…
je t'attends 😌

Script de relance (TRÈS efficace)

Si l'abonné ne répond plus :

Modèle :

tu m'as abandonnée ? 🥺

ou

Modèle :

je crois que je t'intimide un peu…

ou

Modèle :

je voulais te montrer quelque chose mais tant pis…

Script après achat (fidélisation)

Modèle :

t'es venu…

Modèle :

j'aime les hommes curieux 😌

Modèle :

dis-moi ce que t'en penses honnêtement

Script très puissant psychologiquement

Modèle :

je regrette presque de t'avoir montré…

Modèle :

maintenant tu me connais un peu trop 😇

Pourquoi ce script fonctionne

Parce qu'il crée :

• connexion
• tension
• curiosité
• exclusivité
• progression

Jamais de vente directe brutale.

Toujours émotion → curiosité → action.`,
      },
  ],
};

export const RESULTAT_FINAL = {
  id: "resultat",
  title: "Résultat final",
  intro: "À la fin de la formation, l'élève est capable de :",
  categories: [
    { id: "r-1", title: "Créer un modèle virtuel", content: "" },
    { id: "r-2", title: "Produire du contenu", content: "" },
    { id: "r-3", title: "Mettre en place la monétisation", content: "" },
    { id: "r-4", title: "Configurer le système de paiement", content: "" },
    { id: "r-5", title: "Attirer du trafic", content: "" },
    { id: "r-6", title: "Gérer les conversations", content: "" },
    { id: "r-7", title: "Générer des revenus", content: "" },
    { id: "r-8", title: "Développer l'activité", content: "" },
  ],
};

export function getModuleById(id: string): Module | null {
  return MODULES.find((m) => m.id === id) ?? null;
}

export function getBonus() {
  return BONUS;
}

export function getResultatFinal() {
  return RESULTAT_FINAL;
}
