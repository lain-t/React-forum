import React, { useState, useEffect } from 'react';
import { apiClient as axios } from '../api/axios'
import ToHome from '../components/ToHome';

const UserSetting = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    gender: '',
    birthday: '',
    phone: '',
    introduction: '',
    avatar: ''
  });

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('userdata'));
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'radio' ? checked : value;
    setUser({ ...user, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios.post('/user/update', user)
      .then(response => {
        localStorage.setItem('userdata', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="user-setting">
      <h2>用户设置</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">用户名:</label>
          <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} placeholder="请输入用户名" />
          <br />

          <label htmlFor="password">密码:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} placeholder="请输入密码" />
          <br />

          <label htmlFor="email">电子邮件:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} placeholder="请输入电子邮件" />
          <br />

          <label>性别:</label>
          <input type="radio" id="male" name="gender" value="male" checked={user.gender === 'male'} onChange={handleInputChange} />
          <label htmlFor="male">男</label>
          <input type="radio" id="female" name="gender" value="female" checked={user.gender === 'female'} onChange={handleInputChange} />
          <label htmlFor="female">女</label>
          <br />

          <label htmlFor="birthday">生日:</label>
          <input type="date" id="birthday" name="birthday" value={user.birthday} onChange={handleInputChange} />
          <br />

          <label htmlFor="phone">手机号:</label>
          <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleInputChange} placeholder="请输入手机号" />
          <br />

          <label htmlFor="introduction">简介:</label>
          <textarea id="introduction" name="introduction" value={user.introduction} onChange={handleInputChange} placeholder="请输入简介" />
          <br />

          <label htmlFor="avatar">头像:</label>
          <input type="text" id="avatar" name="avatar" value={user.avatar} onChange={handleInputChange} placeholder="请输入头像链接" />
          <br />
        </div>
        <button type="submit">保存设置</button>
      </form>
      <ToHome />
    </div>
  );
};

export default UserSetting;