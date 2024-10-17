from flask import  request, jsonify, make_response, Blueprint
from Model.Post import PostDO
from Service.PostService import PostService

post_blueprint = Blueprint('posts', __name__)
db_config = {
    'host': 'localhost',
    'database': 'spring',
    'user': 'spring',
    'password': '4399'
}
post_service = PostService(db_config)
@post_blueprint.route('/create', methods=['POST'])
def create_post():
    data = request.get_json()
    post = PostDO(data['id'], data['title'], data['content'], data['author'])
    try:
        post_service.save_post(post)
        return make_response(jsonify({"message": "Post created successfully"}), 201)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during creation"}), 400)

@post_blueprint.route('/findpost', methods=['POST'])
def find_post():
    data = request.get_json()
    id = data['id']
    try:
        post = post_service.find_post_by_id(id)
        if post:
            return make_response(jsonify(post.__dict__), 200)
        else:
            return make_response(jsonify({"error": "Post not found"}), 400)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during find"}), 400)

@post_blueprint.route('/update', methods=['POST'])
def update_post():
    data = request.get_json()
    post = PostDO(data['id'], data['title'], data['content'], data['author'])
    try:
        updated_post = post_service.update_post(post)
        if updated_post:
            return make_response(jsonify({"message": "Post updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Post not found"}), 400)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during update"}), 400)

@post_blueprint.route('/delete', methods=['POST'])
def delete_post():
    data = request.get_json()
    id = data['id']
    try:
        post_service.delete_post(id)
        return make_response(jsonify({"message": "Post deleted successfully"}), 200)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during delete"}), 400)

@post_blueprint.route('/pages/show', methods=['GET'])
def show_posts():
    try:
        posts = post_service.find_all_posts()
        if posts:
            return make_response(jsonify([post.to_dict() for post in posts]), 200)
        else:
            return make_response(jsonify({"error": "Posts not found"}), 400)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during retrieval"}), 400)

@post_blueprint.route('/pages/author', methods=['POST'])
def show_posts_by_author():
    data = request.get_json()
    author = data['username']
    try:
        posts = post_service.find_posts_by_author(author)
        if posts:
            return make_response(jsonify([post.__dict__ for post in posts]), 200)
        else:
            return make_response(jsonify({"error": "Posts not found"}), 400)
    except Exception as e:
        return make_response(jsonify({"error": "Error occurred during retrieval"}), 400)