## User's Guide
- [Virtual environments](https://flask.palletsprojects.com/en/stable/installation/#virtual-environments)
- Run app in debug mode: `flask --app flaskr run --debug`
- Compiling binary: `pyinstaller --onefile --add-data "flaskr/templates:flaskr/templates" --add-data "flaskr/static:flaskr/static" --name "resume-tailor" --icon="icon.png" app.py`
