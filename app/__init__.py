from flask import Flask
from flask_cors import CORS as cors

app = Flask(__name__, static_folder='../static', template_folder='../template')
cors(app)

def create_app():

    from .route import main
    app.register_blueprint(main)

    return app