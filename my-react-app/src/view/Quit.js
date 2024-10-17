import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToHome from '../components/ToHome';
import '../assets/Quit.css';

const Quit = () => {
  const history = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userdata');
    // localStorage.clear();
  }, []);

  return (
    <div className="user-quit">
      <h2>您已成功退出系统。</h2>
      <ToHome />
    </div>
  );
};

export default Quit;