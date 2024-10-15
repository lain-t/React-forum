import React from 'react';
import { Link } from 'react-router-dom'; // 引入Link组件

const ToHome = () => {
  return (
    <div className="to-home">
      <Link to="/">返回主页</Link>
    </div>
  );
};

export default ToHome;