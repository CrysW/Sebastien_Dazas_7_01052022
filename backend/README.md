# Installation du backend

## Préambule

Vous devez installer sur votre machine :

- NodeJS 14.18.3 ([https://nodejs.org/download/release/v14.18.3/](https://nodejs.org/download/release/v14.18.3/))
- nodemon ([https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon))

## Télécharger le fichier ZIP

**[![](https://camo.githubusercontent.com/97877849c64bb8a0d5f168b5fb7616798adcd714c8d60bd4f37ef521cb2c5a3a/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f6e79544d324b794a76446b53585f68644f654973424132576763526438747370597a31544f314f41483647696d6b6573543757476b35756d34646e356264797656456c4a32676a67526a6a32465a6e58747a6772374c51315f64305a5a476f355f3673304261666766534561325a73576d63647545636f56774d4135707034674656394434455a79)](https://camo.githubusercontent.com/97877849c64bb8a0d5f168b5fb7616798adcd714c8d60bd4f37ef521cb2c5a3a/68747470733a2f2f6c68362e676f6f676c6575736572636f6e74656e742e636f6d2f6e79544d324b794a76446b53585f68644f654973424132576763526438747370597a31544f314f41483647696d6b6573543757476b35756d34646e356264797656456c4a32676a67526a6a32465a6e58747a6772374c51315f64305a5a476f355f3673304261666766534561325a73576d63647545636f56774d4135707034674656394434455a79)**

## [](https://github.com/CrysW/Sebastien_Dazas_6_03022022/blob/master/backend/README.md#ouvrir-le-projet-dans-votre-ide-pr%C3%A9f%C3%A9r%C3%A9-)Ouvrir le projet dans votre IDE préféré 😀

## Installation du back end

1.  Dans le terminal, à partir du sous-répertoire "backend" du projet, exécuter la commande "npm install". Toutes les dépendances du projet vont s'installer.
2.  Toujours dans le terminal, à partir du sous-répertoire "backend" du projet, exécuter la commande "nodemon server" afin de démarrer le serveur. Le message suivant sera affiché dans la console du terminal :
    **![](https://lh5.googleusercontent.com/xa2yc4C6F1kImNvdFG8qnjoHVCoqTerUHzbTptlQCXFLqgUmj5eqFIsf00Re8oVXo3vbGLUWNeJzvMI1ndG4yUniRdcRhr0iV4SlUTaUfAKGGHigR0dbDbbYZXinGzrLDvMnfGMYPuZlZQkR7g)**

## Base de données

La base de données est une base de données relationnelles mySQL.

## Variables d'environnement

Le fichier .env fournit ces variables d'environnement :

- DB_HOST
- DB_NAME
- DB_USER
- DB_PASSWORD
- SECRET_TOKEN
