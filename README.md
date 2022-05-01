# PROJET N°07 - CREEZ UN RESEAU SOCIAL D'ENTREPRISE

## Scénario

Vous êtes développeur depuis plus d'un an chez **CONNECT-E**, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂

Le client en question est **Groupomania**, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

![](https://lh3.googleusercontent.com/Ws5d1rTgPr-03R--8qJRD_s-GHNf95JjCIaD3x5UrtwlVCfYYrBMEYy9EbqmcK7vdPckNkV0wuFyiGmCXRRxQC2W-RKEJ172mkWQTMnXekhJqIVwNoK3ZsRTcoiWPsD-nTAcmtFW)

Le projet consiste à construire un **réseau social interne** pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Stéphanie vous envoie un message via l’outil de messagerie instantanée de l’entreprise.

![](https://lh4.googleusercontent.com/QL_TMZ5Vy1YLTR7W3qWXIOVGPmHiqVXWIL1tPRdK6V7bwRu6YQVBZMqiIlyN1qgFsW0PhYyA91LyoWzpltqvhfO7smt0KY1QvV7YouCc4jFmwLX1REyM-Z-hNl3NH0pobdwoYj6f)

Quelques minutes plus tard, vous recevez un mail de Stéphanie.

### Mail de Stéphanie

_De : Stéphanie R_

_À : Moi_

**Lancement projet Groupomania**

---

Bonjour,

Comme convenu, voici les [spécifications fonctionnelles](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf). Tu trouveras également les [logos](<https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Logos+(3).zip>) de l’organisation pour l’habillage du site.

Par ailleurs, Groupomania et moi avons convenu que l’un des employés du groupe testera un MVP du produit, avec une seule des deux fonctionnalités proposées.

Cela nous permettra de nous assurer que nous répondons à leurs attentes.

Après plusieurs réunions avec Groupomania, il semble que les paramètres du projet changent régulièrement, je pense qu’une organisation “agile” serait plus adaptée pour s’adapter aux besoins du client au fur et à mesure des commentaires et affiner l’application au fil de l’eau.

Je suis à ta disposition pour toute question.

Stéphanie

_De : Moi_

_À : Stéphanie R_

**Re : Lancement projet Groupomania**

---

Merci Stéphanie pour toutes ces informations !

Si je comprends bien, je dois fournir une première version d’une des fonctionnalités proposées par Groupomania et j’ai carte blanche concernant la forme que cela va prendre ?

Merci pour ces précisions.

_De : Stéphanie R_

_À : Moi_

**Re : re : Lancement projet Groupomania**

---

Oui, c’est ça !

La seule contrainte est que le client utilise une base de données relationnelles qui se manipule avec le langage SQL pour le stockage de données. Il faudra donc en tenir compte lorsque tu construiras ton application. Tu devras t’assurer que l’utilisateur puisse requêter les données requises depuis SQL et puisse soumettre ces changements à la base de données SQL. Les données de connexion doivent également être sécurisées.

Merci.

Stéphanie

_De : Moi_

_À : Stéphanie R_

**Re : re : re : Lancement projet Groupomania**

---

Ah oui, je vois ! Peux-tu me préciser quelles tâches entrent dans le périmètre de ma mission ?

Merci

_De : Stéphanie R_

_À : Moi_

**Re : re : re : re : Lancement projet Groupomania**

---

Bien sûr. Tu vas devoir :

- choisir la fonctionnalité que tu vas développer,
- estimer le temps que tu passeras sur le développement de chaque fonctionnalité,
- développer la première version de l'application.

Deux dernières choses, tu devras faire en sorte que la web app puisse se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.

Pour ce projet, il faut que tu utilises un framework Front-End. Tu peux utiliser celui que tu préfères (React, Vue, Angular, Ember, Meteor, Aurelia...). Par contre, le projet doit être codé en Javascript, donc n'utilise pas le framework Symfony par exemple. Enfin, tes pages devront respecter les standards WCAG.

Bon courage et à dispo si besoin ![:)](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAAEyifZoAAAAY1BMVEX/tFr/+an/6pj/2YT/3Yn/vWX/1X//9qX/uF//0Xz/7p3/znf/+6z/umH/xG3/7Jr/5JH/9KPmolD/4Y2UlJT/y3T/wWn/tl3/x3D//7D//a7Xl0uodjr/slj///8AAAD////kIWupAAAAIXRSTlP//////////////////////////////////////////wCfwdAhAAAA5UlEQVQYGQXBh2HEMBADQSh/zpaYjtj+q/SMMHIPEQhUkryKrUwW6x67wCCXcUdj7ruVrkcgQkbg8fJdDeJZsn9rCuR5vD3TPcLC98OOxQjABhBgGxC0yzg1EEfJt/lckYf86/47WZ8t96E/VPV5bdu0nKLKZ6d7OCzq3XZUBC1ibyDANiAA7BYRzQZAgI/3cBve4zxdqwHh9i459156X6+Poxm5PYeSs93ta0pHNMuf12Uoudwu09++HxHVcjvP0/c1n9NyKCLULNz2x8PLSRGOWJoR4KqIiIhTqgYEgN1qrc0G4B8FHyJnCxBjUAAAAABJRU5ErkJggg== ":)")

Stéphanie

Avec tous ces éléments en tête, vous vous attaquez à la réalisation de ce beau projet.

## Livrables

- Un document TXT contenant le lien vers le répertoire GitHub contenant le **code** de l’application.

Pour faciliter votre passage devant le jury, déposez sur la plateforme, dans un dossier zip nommé “**_Titre_du_projet_nom_prénom_**”, avec tous les livrables du projet comme suit : **Nom**_**Prénom**_**n° du livrable**\_**nom du livrable**\_\_**date de démarrage du projet**. Cela donnera :

- \_Nom_Prénom_1_code*\_\_mmaaaa.*

Par exemple, le premier livrable peut être nommé comme suit \_: Dupont_Jean_1_code*\_\_012022.*

## Soutenance

La soutenance, d’une durée maximum de 30 minutes, se déroulera en deux parties :

- **Présentation des livrables (20 minutes)**
  - En simulant une réunion professionnelle, l’évaluateur jouera le rôle de Stéphanie, la directrice de l’agence (il pourra vous interrompre pour vous poser des questions). Vous réaliserez une présentation de votre site en mettant en avant les fonctionnalités améliorées. L’évaluateur doit être capable de cloner l’application et de la lancer.
- **Discussion (5 minutes)**
  - Échange de questions/réponses : l’évaluateur pourra revenir sur certains points pour vous questionner sur vos choix.
- **Débriefing (5 minutes)**
  - À la fin de la session, l'évaluateur cessera de jouer le rôle de la directrice de l'agence afin que vous puissiez débriefer ensemble.

Votre présentation devrait durer 20 minutes (+/- 7 minutes). Puisque le respect de la durée des présentations est important en milieu professionnel, les présentations en dessous de 13 minutes ou au-dessus de 27 minutes peuvent être refusées.

## Compétences évaluées

- Authentifier un utilisateur et maintenir sa session

- Gérer un stockage de données à l'aide de SQL

- Implémenter un stockage de données sécurisé en utilisant SQL

- Personnaliser le contenu envoyé à un client web
