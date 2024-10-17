from flask import Flask, request, jsonify, make_response, Blueprint
from Service.UserService import UserService
from Model.User import UserDetailVO
from Model.User import UserDO

import traceback

user_blueprint = Blueprint('users', __name__)
db_config = {
    'host': 'localhost',
    'database': 'spring',
    'user': 'spring',
    'password': '4399'
}
user_service = UserService(db_config)
@user_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    user_do = UserDO(data['username'], data['password'])
    try:
        user_service.save_user(user_do)
        user_do = user_service.select_user(user_do.username)
        print("user-do",user_do)
        return make_response(jsonify(UserDetailVO(user_do["username"]).to_dict()), 200)
    except Exception as e:
        print(f"An error occurred: {type(e).__name__} - {e}")
        traceback.print_exc()
        return make_response(jsonify({"error": "Error occurred during registration"}), 400)

@user_blueprint.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user_do = user_service.verify_user(data['username'], data['password'])
    if user_do:
        # print(UserDetailVO(user_do["username"]).to_dict())
        return make_response(jsonify(UserDetailVO(user_do["username"]).to_dict()), 200)
    else:
        return make_response(jsonify({"error": "Username or password is incorrect"}), 400)

@user_blueprint.route('/update', methods=['POST'])
def update_user():
    data = request.get_json()
    user_do = UserDO(data['username'], data['password'])
    try:
        user_service.save_user(user_do)
        return make_response(jsonify(user_do.__dict__), 200)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during update"}), 400)