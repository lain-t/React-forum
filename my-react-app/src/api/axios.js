// axios.js 或者其他命名的文件
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.5:8081',
  headers: {'Content-Type': 'application/json'},
  timeout: 7000,
});

export { apiClient };