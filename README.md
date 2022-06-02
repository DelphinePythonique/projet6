# Projet6: Develop a user interface for a Python web application

## Goals: 
Ultimately, our goal will be to display movies according to several criteria

version: V1.0.2

## Summary

[Install](#install)

[Use](#use)

[Todo](TODO.md)

[Changelog](CHANGELOG.md)

### <a name="install"></a>Install

#### install project6
This setup is for a development environment.

Prerequisite:

- \>= python3,9 for local api

Through a terminal(Debian linux) or Powershell(Windows) : 

Position yourself in the local directory in which you want to position the sources of the application
``` bash
 cd [path_to_source_directory]
```
-  Clone the repository via the clone command in ssh mode
[ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh), via la commande suivante

``` bash
 git clone git@github.com:DelphinePythonique/projet6.git
```

#### install Sass
In order to use sass features to transform scss files in css, you must install sass
prerequisite: nodejs, npm
``` bash
 npm -g install sass
```
nota: -g install sass for all projects

#### position yourself in project6's directory and use sass
``` bash
 cd [project's 6 directory]
 npm run sass
```
In the package.json file, the script->sass key indicates the directories where sass finds the scss files and where
it should put the generated css files.
If you modify sass config, you must stop et run the last command

#### install autoprefixer postcss postcss-cli
```bash
npm install autoprefixer postcss postcss-cli -g
```
in package.json, add sentences below
```json

{

"scripts": {
     "sass": "sass ./sass/main.scss:./static/css/style.css -w --style compressed",
     "prefix": "postcss ./static/css/style.css --use autoprefixer -d ./static/css/prefixed/"
},

"browserslist": "last 4 versions"
}
```
- generate prefixed css file before you  push your code
```bash
npm run prefix
```
### <a name="use"></a>Use

![how to use this project](./static/images/project6.gif)
open index.html file in your browser
click on image to display movie's datas
click on arrows to display movie
