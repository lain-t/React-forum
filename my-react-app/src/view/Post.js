import React, { useState, useEffect } from 'react';
import { apiClient as axios } from '../api/axios'
import UserHeader from '../components/UserHeader'; // 确保路径正确
import '../assets/Post.css'; // 引入单独的CSS文件
import { useParams } from 'react-router-dom';

const Post = () => {
  const { postIndex } = useParams(); // 使用 useParams 钩子获取路由参数
  const [post, setPost] = useState({
    id: postIndex,
    title: '',
    author: '',
    date: '',
    content: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    fetchPost();
    loadUser();
  }, []);

  const fetchPost = () => {
    const postIndex = post.id;
    axios.post('/post/findpost', { id: postIndex })
      .then(response => {
        setPost(response.data);
        loadUser();
      })
      .catch(error => {
        console.error('获取帖子数据失败:', error);
      });
  };

  const loadUser = () => {
    const user = JSON.parse(localStorage.getItem('userdata'));
    if (user !== null && user.username === post.author) {
      setIsAuthor(true);
    }
  };

  const editPost = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const deletePost = () => {
    const postIndex = post.id;
    axios.post('/post/delete', { id: postIndex })
      .then(response => {
        console.log(response.data);
        window.location.replace('/user'); // 重定向到用户页面
      })
      .catch(error => {
        console.error('删除帖子数据失败:', error);
      });
  };

  if (editMode) {
    return (
      <div className="post">
        <textarea
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
        <button onClick={cancelEdit}>取消</button>
      </div>
    );
  }

  return (
    <div className="post">
      <UserHeader />
      <h1>{post.title}</h1>
      <h3>作者：{post.author}</h3>
      <p>发布时间：{post.date}</p>
      <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
      {isAuthor && !editMode && (
        <div className="adminAuthor">
          <div id="settingButton">
            <button onClick={editPost}>修改</button>
            <button onClick={deletePost}>删除</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;