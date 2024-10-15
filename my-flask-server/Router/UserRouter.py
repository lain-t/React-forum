# app.py
from flask import Flask, request, jsonify, make_response, Blueprint
from Service.UserService import UserService
from Service.UserService import UserConvert
from Model.User import UserVerifyDTO
from Model.User import UserDetailVO
from Model.User import UserDO

import traceback

user_blueprint = Blueprint('users', __name__)

# Database configuration
db_config = {
    'host': 'localhost',
    'database': 'spring',
    'user': 'spring',
    'password': '4399'
}
user_service = UserService(db_config)
user_convert = UserConvert()
@user_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    user_dto = UserVerifyDTO(data['username'], data['password'])
    user_do = UserDO(user_dto.username, user_dto.password)
    try:
        user_service.save_user(user_do)
        user_do = user_service.select_user(user_dto.username)
        print("user-do",user_do)
        user_detail_vo = UserConvert.user_to_detail_vo(user_do)
        print("js",jsonify(UserDetailVO(user_detail_vo).to_dict()))
        return make_response(jsonify(UserDetailVO(user_detail_vo["username"]).to_dict()), 200)
    except Exception as e:
        # 打印异常的类型和描述
        print(f"An error occurred: {type(e).__name__} - {e}")
        # 打印异常的堆栈跟踪
        traceback.print_exc()
        return make_response(jsonify({"error": "Error occurred during registration"}), 400)

@user_blueprint.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user_do = user_service.verify_user(data['username'], data['password'])
    if user_do:
        user_detail_vo = UserConvert.user_to_detail_vo(user_do)
        return make_response(jsonify(user_detail_vo), 200)
    else:
        return make_response(jsonify({"error": "Username or password is incorrect"}), 400)

@user_blueprint.route('/update', methods=['POST'])
def update_user():
    data = request.get_json()
    user_do = UserDO(data['username'], data['password'])
    try:
        user_service.save_user(user_do)
        return make_response(jsonify(user_do.__dict__), 201)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during update"}), 400)