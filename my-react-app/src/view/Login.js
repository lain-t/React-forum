import React, { useState } from 'react';
import { apiClient as axios } from '../api/axios'
import { useNavigate } from 'react-router-dom';
import ToHome from '../components/ToHome';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const history = useNavigate();

  const handleLogin = event => {
    event.preventDefault();
    axios.post("/user/login", user)
      .then(response => {
        localStorage.setItem('userdata', JSON.stringify(response.data));
        console.log('登录成功:', response.data);
        history('/'); // 假设主页路由是 '/home'
      })
      .catch(error => {
        console.error('登录失败:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <p>登录界面</p>
      <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">*用户名称:</label>
          <input type="text" id="username" name="username" value={user.username} onChange={handleChange} required /><br /><br />
          <label htmlFor="password">*用户密码:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required /><br /><br />
          <button type="submit">登录</button>
        </form>
      </div>
      <ToHome />
    </div>
  );
};

export default Login;