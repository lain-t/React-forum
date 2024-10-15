import React, { useState, useEffect } from 'react';
import { apiClient as axios } from '../api/axios'
import UserHeader from '../components/UserHeader'; // 假设UserHeader组件已经转换为React
import UserPosts from '../components/UserPosts'; // 假设UserPosts组件已经转换为React
import '../assets/Forum.css'; // 引入单独的CSS文件

const Forum = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ author: '', title: '', content: '', date: '' });

  useEffect(() => {
    const loadUser = async () => {
      const userdata = localStorage.getItem('userdata');
      if (userdata) {
        const userData = JSON.parse(userdata);
        setUsername(userData.username);
        setPost({ ...post, author: userData.username });
      }
    };

    loadUser();
  }, [post]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get('/post/pages/show');
        setPosts(response.data);
        localStorage.setItem('postsdata', JSON.stringify(response.data));
        console.log('帖子数据:', response.data);
      } catch (error) {
        console.error('获取帖子数据出错:', error);
      }
    };

    loadPosts();
  }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/post/create', post);
      console.log('帖子发布成功:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('发布帖子出错:', error);
    }
  };

  return (
    <div>
      <UserHeader />
      <div className="forum">
        <h1>论坛主页</h1>
        <UserPosts posts={posts} />
        {!username && <p>登录之后可以进行发帖</p>}
        {username && (
          <div id="postForm">
            <form onSubmit={submitPost}>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="输入帖子标题"
                required
              />
              <input
                type="text"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                placeholder="输入帖子内容"
                required
              />
              <button type="submit">发送</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;