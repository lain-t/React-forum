# user_service.py
from Mapper.UserMapper import UserMapper
class UserService:
    def __init__(self, config):
        self.user_mapper = UserMapper(config)

    def select_user(self, username):
        return self.user_mapper.select_one_user(username)

    def verify_user(self, username, password):
        user = self.user_mapper.select_one_user(username)
        if user and user['password'] == password:
            return user
        return None

    def save_user(self, user_do):
        if self.user_mapper.select_count("SELECT COUNT(*) FROM users WHERE username=%s", (user_do.username,)) > 0:
            self.user_mapper.update_by_id(user_do)
        else:
            self.user_mapper.insert(user_do)

    def delete_user(self, id):
        self.user_mapper.delete_by_id(id)
    
# user_convert.py
class UserConvert:
    @staticmethod
    def user_to_detail_vo(user_do):
        # Conversion logic here
        return {
            "username": user_do[0][1],  # 使用 get 方法安全地访问键
            # Add other fields as needed
        }