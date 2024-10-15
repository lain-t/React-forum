import mysql.connector
from mysql.connector import Error

class WebMySQL:
    def __init__(self, config):
        self.config = config
        self.db = self.connect_db()
        if self.db:
            self.cursor = self.db.cursor(buffered=True)  # 关闭字典模式

    def connect_db(self):
        try:
            connection = mysql.connector.connect(**self.config)
            return connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return None

    def execute_query(self, query, params=None):
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.db.commit()
            # 对于增删改操作，返回受影响的行数
            # return self.cursor.rowcount
        except Error as e:
            print(f"Error executing query: {e}")
            self.db.rollback()
            return None

    def select_query(self, query, params=None):
        try:
            if params:
                print(query, params)
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            results = self.cursor.fetchall()
            print(results)
            return results
        except Error as e:
            print(f"Error executing query: {e}")
            return None
            
    def select_count(self, query, params=None):
        try:
            self.cursor.execute(query, params)
            result = self.cursor.fetchone()
            return len(result)
        except Error as e:
            print(f"Error executing query: {e}")
            return 0