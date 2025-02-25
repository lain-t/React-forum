import React, { useState, useEffect } from 'react';
import { apiClient as axios } from '../api/axios'
import UserInfo from '../components/UserInfo'; 
import UserPosts from '../components/UserPosts';
import { Link } from 'react-router-dom';
import '../assets/User.css';

const User = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    gender: '',
    birthday: '',
    phone: '',
    introduction: '',
    avatar: '',
    registrationDate: '',
  });
  const [userPosts, setUserPosts] = useState([]);
  // 设置隐藏
  const [isSetting, setIsSetting] = useState(true);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata) {
      setUser(userdata);
      loadpostsbyauthor(userdata.username);
    }
  }, []);

  const loadpostsbyauthor = (username) => {
    axios.post('/post/pages/author', { username })
      .then(response => {
        setUserPosts(response.data);
        console.log('帖子数据:', response.data);
      })
      .catch(error => {
        console.error('获取帖子数据失败:', error);
      });
  };

  return (
    <div className="user">
      <div className="user-content">
        <h1>用户页面</h1>
        <UserInfo user={user} />
        <UserPosts posts={userPosts} />
        <Link to="/usersetting">设置</Link>
      </div>
    </div>
  );
};

export default User;