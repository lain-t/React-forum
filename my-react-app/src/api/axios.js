// axios.js 或者其他命名的文件
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  timeout: 7000,
});

export { apiClient };