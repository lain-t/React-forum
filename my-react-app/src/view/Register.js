import React, { useState } from 'react';
import { apiClient as axios } from '../api/axios'
import { useNavigate } from 'react-router-dom';
import ToHome from '../components/ToHome'; // 确保路径正确

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const history = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post("/user/register", user)
      .then(response => {
        const userdata = response.data;
        localStorage.setItem('userdata', JSON.stringify(userdata));
        console.log('注册成功:', response.data);
        history('/');
      })
      .catch(error => {
        console.error('注册失败:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="register-page">
      <h1>注册页面</h1>
      <div className="register-form">
        <p>用户名由字母、数字、下划线构成，*注释的项必须填写。</p>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">*用户名称:</label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">*用户密码:</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit">注册</button>
          </div>
        </form>
      </div>
      <ToHome />
    </div>
  );
};

export default Register;