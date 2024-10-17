class PostDO:
    def __init__(self, id, title, author, content, date):
        self.id = id
        self.title = title
        self.author = author
        self.content = content
        self.date = date

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'content': self.content,
            'date': self.date.isoformat()
        }