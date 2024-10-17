import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound';

import Forum from './view/Forum';
import Header from './components/UserHeader';
import User from './view/User';
import UserInfo from './components/UserInfo';
import UserPosts from './components/UserPosts';
import UserSetting from './view/UserSetting';
import Login from './view/Login';
import Quit from './view/Quit';
import Register from './view/Register';
import Post from './view/Post';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
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