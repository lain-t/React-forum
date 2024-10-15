import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 引入react-router-dom中的Link和useLocation
import '../assets/UserHeader.css'; // 引入Header.css文件

const ToHome = () => {
  // 这里应该是ToHome组件的React版本
  // ...
  return <div>Home</div>;
};

const UserHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pagepath, setPagepath] = useState(window.location.pathname);
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(userdata).username);
    }
  }, []);

  useEffect(() => {
    setPagepath(location.pathname);
  }, [location]);

  const logout = () => {
    localStorage.removeItem('userdata');
    // 重定向到首页
    window.location = '/';
  };

  return (
    <nav className="user-header">
      <div className="user-header-left">
        <div className={isLoggedIn ? "user-loginIn" : "user-loginOut"}>
          <span>{isLoggedIn ? `欢迎, ${username}` : ''}</span>
        </div>
        <div className="user-loginOut">
          {/* 登出时显示的内容 */}
        </div>
      </div>

      <div className="user-header-right">
        <div className={!isLoggedIn ? "user-loginOut" : "user-loginIn"}>
          {!isLoggedIn && (
            <>
              <Link to="/register">注册</Link>
              <Link to="/login">登录</Link>
            </>
          )}
        </div>
        <div className={isLoggedIn ? "user-loginIn" : "user-loginOut"}>
          {isLoggedIn && (
            <>
              <Link to="/user" className={pagepath !== '/user' ? '' : 'hidden'}>个人中心</Link>
              <ToHome className={pagepath !== '/' ? '' : 'hidden'} />
              <Link to="/quit" onClick={logout}>退出</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;