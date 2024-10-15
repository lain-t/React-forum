import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound';

import Forum from './view/Forum';
// import Header from './components/UserHeader';
import User from './view/User'; // 确保路径正确
import UserInfo from './components/UserInfo'; // 确保路径正确
import UserPosts from './components/UserPosts'; // 确保路径正确
import UserSetting from './view/UserSetting'; // 确保路径正确
import Login from './view/Login'; // 确保路径正确
import Quit from './view/Quit'; // 确保路径正确
import Register from './view/Register'; // 确保路径正确
import Post from './view/Post'; // 确保路径正确
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/user" element={<User />}>
            {/* 子路由 */}
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="userposts" element={<UserPosts />} />
          </Route>
          <Route path="/usersetting" element={<UserSetting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quit" element={<Quit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:postIndex" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;