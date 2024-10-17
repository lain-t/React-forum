from Mapper.PostMapper import PostMapper
from Model.Post import PostDO

class PostService:
    def __init__(self, config):
        self.post_mapper = PostMapper(config)

    def save_post(self, post_do):
        if self.post_mapper.select_count("SELECT COUNT(*) FROM posts WHERE id=%s", (post_do.id,)) > 0:
            self.post_mapper.update_by_id(post_do)
        else:
            self.post_mapper.insert(post_do)

    def find_post_by_id(self, id):
        return PostDO(**self.post_mapper.select_by_id(id))

    def find_posts_by_author(self, author):
        posts = self.post_mapper.select_list("SELECT * FROM posts WHERE author=%s", (author,))
        return [PostDO(**post) for post in posts]

    def find_post_by_title(self, title):
        post = self.post_mapper.select_list("SELECT * FROM posts WHERE title=%s", (title,))
        return PostDO(**post[0]) if post else None

    def find_all_posts(self):
        posts = self.post_mapper.select_list("SELECT * FROM posts")
        return [PostDO(**post) for post in posts]

    def delete_post(self, id):
        self.post_mapper.delete_by_id(id)
    
# post_convert.py
class PostConvert:
    @staticmethod
    def post_to_detail_vo(post_do):
        # Conversion logic here
        return {
            "id": post_do.id,
            "title": post_do.title,
            "content": post_do.content,
            "author": post_do.author,
        }