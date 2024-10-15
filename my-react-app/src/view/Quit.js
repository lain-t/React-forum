import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToHome from '../components/ToHome'; // 确保路径正确
import '../assets/Quit.css';

const Quit = () => {
  const history = useNavigate();

  useEffect(() => {
    // 清除本地存储的用户数据
    localStorage.removeItem('userdata');
    // 如果需要清除更多数据，可以在这里添加
    // 例如：localStorage.clear();
  }, []);

  return (
    <div className="user-quit">
      <h2>您已成功退出系统。</h2>
      <ToHome />
    </div>
  );
};

export default Quit;