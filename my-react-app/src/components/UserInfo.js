import React from 'react';
import '../assets/UserInfo.css';

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      {/* <img src={user.avatar} alt="avatar" className="avatar" /> */}
      <div className="info">
        <h2>{user.name}</h2>
        <p>性别：{user.gender}</p>
        <p>入站日期：{user.registrationDate}</p>
        {user.email && <p>邮箱：{user.email}</p>}
        <p>联系方式：{user.phone}</p>
      </div>
    </div>
  );
};

export default UserInfo;