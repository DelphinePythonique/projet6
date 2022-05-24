# Projet6: Develop a user interface for a Python web application

## Goals: 
Ultimately, our goal will be to display a movie rating

version: 0.0.1

## Summary
[Install](#install)
[Todo](TODO.md)
[Contribute](contribute.md)
[Changelog](CHANGELOG.md)

------------
### <a name="install"></a>Install

This setup is for a development environment.

Prerequisite:

- \>= python3,9

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

- Position yourself in the project directory, create a virtual environment

``` bash
 cd projet6
 python -m venv env
```
- Activate virtual environment

   If OS is Debian Linux: 
``` bash
 source env/bin/activate
```
   If OS is Windows:
``` bash
 .\env\Scripts\activate
```
- Install dependencies
``` bash
 pip install -r requirements.txt
```
- Install dev dependencies
``` bash
 pip install -r requirements_dev.txt
```