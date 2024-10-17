class UserDO:
    def __init__(self, username, password):
        self.username = username
        self.password = password

class UserDetailVO:
    def __init__(self, username):
        self.username = username
    def to_dict(self):
        return {
            'username': self.username,
        }