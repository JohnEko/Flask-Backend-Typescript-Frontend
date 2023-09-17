import os
from flask import Flask
from flask_restx import Api
from config import DevConfig
from models import Student, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from student import student_ns
from auth import auth_ns


BASE_DIR =os.path.dirname(os.path.realpath(__file__))

def create_app(config):
    app=Flask(__name__)
    CORS(app)
    app.config.from_object(DevConfig)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+os.path.join(BASE_DIR, 'dev.db')


    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)

    api=Api(app, doc='/docs')
    
    api.add_namespace(auth_ns)
    api.add_namespace(student_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
        "db":db,
        "Student":Student,
        "User":User
        }


    return app