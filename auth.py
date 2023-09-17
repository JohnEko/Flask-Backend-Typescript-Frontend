from flask_restx import Resource, Namespace, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, create_refresh_token, jwt_required
from flask import Flask, request, jsonify, make_response

# authentication logic so we can decorate it at name space route decorator
auth_ns = Namespace("auth", description="The namespace for authentication")


signup_model = auth_ns.model(
    "User",
    {
        "username": fields.String(),
        "email": fields.Integer(),
        "password": fields.String()

    }

)
login_model = auth_ns.model(
    "User",
    {
        "username": fields.String(),
        "password": fields.String()

    }
)


# login in the user
@auth_ns.route('/signup')
class SignUp(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()

        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"Message": f"This {username} already exist"})

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()

        return jsonify({"Message": "This User has already been created"})


@auth_ns.route('/login')
class Login(Resource):
    def post(self):
        # access the data from client
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        # query the user and check if user exist
        db_user = User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user, password):
            access_token = create_access_token(identity=db_user.username)
            refreash_token = create_refresh_token(identity=db_user.username)

            return jsonify(
                {"access_token": access_token, "refreash_token": refreash_token}
            )


@auth_ns.route('/student')
class RefereshResources(Resource):
    @jwt_required(refresh=True)
    def post(self):

        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)
