from Utils.WebMysql import WebMySQL

class PostMapper:
    def __init__(self, config):
        self.sql = WebMySQL(config)

    def select_by_id(self, id):
        query = "SELECT * FROM posts WHERE id=%s"
        result = self.sql.select_query(query, (id,))
        return result[0] if result else None

    def insert(self, post_do):
        query = "INSERT INTO posts (title, content, author) VALUES (%s, %s, %s)"
        self.sql.execute_query(query, (post_do.title, post_do.content, post_do.author))

    def update_by_id(self, post_do):
        query = "UPDATE posts SET title=%s, content=%s, author=%s WHERE id=%s"
        self.sql.execute_query(query, (post_do.title, post_do.content, post_do.author, post_do.id))

    def select_list(self, query, params=None):
        return self.sql.select_query(query, params)

    def delete_by_id(self, id):
        query = "DELETE FROM posts WHERE id=%s"
        self.sql.execute_query(query, (id,))
    
    def select_count(self, query, params):
        return self.sql.select_count(query, params)