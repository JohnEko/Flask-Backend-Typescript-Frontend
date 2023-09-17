import os
from decouple import config


BASE_DIR =os.path.dirname(os.path.realpath(__file__))


class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS= config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

# development server
class DevConfig(Config):
    SQLALCHEMY_DATABASE_URL="sqlite:///"+os.path.join(BASE_DIR, 'dev.db')
    SQLALCHEMY_ECHO = True

#Production server
class Prod(Config):
    pass 

#Test server
class TestConfig(Config):
    SQLALCHEMY_DATABASE_URL="sqlite:///test.db"
    SQLALCHEMY_ECHO = False
    TESTING=True
