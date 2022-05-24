# install Sass
In order to use sass features to transform scss files in css, you must install sass
prerequisite: nodejs, npm
``` bash
 npm -g install sass
```
nota: -g install sass for all projects

# use sass
``` bash
 npm run sass
```
In the package.json file, the script->sass key indicates the directories where sass finds the scss files and where
it should put the generated css files.
If you modify sass config, you must stop et run the last command

# install local api movie

- Fork repository https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR

- Install locally
``` bash
 git clone git@github.com:DelphinePythonique/OCMovies-API-EN-FR.git
```
- Position yourself in the project directory, create a virtual environment

``` bash
 cd projet4
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
- Run application server
``` bash
python manage.py runserver
```