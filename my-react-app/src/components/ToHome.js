import React from 'react';
import { Link } from 'react-router-dom';

const ToHome = () => {
  return (
    <div className="to-home">
      <Link to="/">返回主页</Link>
    </div>
  );
};

export default ToHome;