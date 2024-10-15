# user_dto.py
class UserVerifyDTO:
    def __init__(self, username, password):
        self.username = username
        self.password = password

# user_model.py
class UserDO:
    def __init__(self, username, password):
        self.username = username
        self.password = password

# user_vo.py
class UserDetailVO:
    def __init__(self, username):
        self.username = username
    def to_dict(self):
        return {
            'username': self.username,
        }