# app.py
from flask import Flask
from flask_cors import CORS
from Router.PostRouter import post_blueprint
from Router.UserRouter import user_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(post_blueprint, url_prefix='/post')
app.register_blueprint(user_blueprint, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)