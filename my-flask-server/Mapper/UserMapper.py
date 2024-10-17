from Utils.WebMysql import WebMySQL

class UserMapper:
    def __init__(self, config):
        self.sql = WebMySQL(config)

    def select_one(self, query, params):
        results = self.sql.select_query(query, params)
        return results[0] if results else None

    def insert(self, user_do):
        query = "INSERT INTO users (username, password) VALUES (%s, %s)"
        self.sql.execute_query(query, (user_do.username, user_do.password))

    def update_by_id(self, user_do):
        query = "UPDATE users SET username=%s, password=%s WHERE username=%s"
        self.sql.execute_query(query, (user_do.username, user_do.password, user_do.username))

    def delete_by_id(self, id):
        query = "DELETE FROM users WHERE id=%s"
        self.sql.execute_query(query, (id,))

    def select_one_user(self, username):
        query = "SELECT * FROM users WHERE username=%s"
        return self.select_one(query, (username,))
    
    def select_count(self, query, params):
        return self.sql.select_count(query, params)