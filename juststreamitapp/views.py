from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('homepage/index.html')


@app.route('/categories')
def categories():

    return render_template('categories/index.html')


if __name__ == "__main__":
    app.run()
