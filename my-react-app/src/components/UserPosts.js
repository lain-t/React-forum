import React from 'react';
import '../assets/UserPosts.css'; // 引入单独的CSS文件

const UserPosts = ({ posts }) => {
  return (
    <div className="user-posts">
      <h2>帖子列表</h2>
      <table id="forumTable">
        <thead>
          <tr>
            {/* <th>帖子ID</th> */}
            <th>标题</th>
            <th>用户</th>
            {/* <th>内容</th> */}
            <th>发布时间</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              {/* <td>{post.id}</td> */}
              <td>
                <a href={`/post/${post.id}`}>{post.title}</a> {/* 假设使用锚点链接 */}
              </td>
              <td>{post.author}</td>
              {/* <td>{post.content}</td> */}
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPosts;