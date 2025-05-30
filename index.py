from flask import Flask, render_template
from dotenv import load_dotenv
from datetime import datetime
import locale
import os

"""task tracker is goal"""

locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def hello_world():
    date = datetime.now()
    return render_template('index.html', current_date = date.strftime("%d/%m"), current_weekday = date.strftime("%a")).capitalize()

if __name__ == '__main__':
    app.run(debug=True)