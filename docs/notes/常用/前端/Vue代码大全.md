---
title: Vue代码大全
createTime: 2024/10/29 08:31:24
permalink: /常用/ajp147o3/
---

# Vue代码大全

## Axios封装以及跨域配置

request.js
~~~js

import axios from 'axios';

// 创建 Axios 实例
var instance = axios.create({
    baseURL: '/', // 设置基础 URL
    timeout: 10000,   // 请求超时设置
});

// GET 请求
export const get = (url, params, config = {}) => {
    return instance({
        url,
        params,
        ...config // 将额外配置展开到请求配置中
    });
}

// POST 请求
export const post = (url, data, config = {}) => {
    return instance({
        url,
        method: 'post',
        data,
        ...config // 其他配置选项
    });
}


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 使用 async + await 调用示例
const fetchCaptcha = async () => {
    try {
        const response = await get('/captcha/generate', {}, {
            responseType: 'blob', // 处理返回的图片数据
            withCredentials: true, // 允许携带 Cookie
        });

        if (response.status === 200) {
            const imageUrl = URL.createObjectURL(response.data);
            captchaImage.value = imageUrl; // 设置验证码图片的 URL
        }
    } catch (error) {
        console.error('获取验证码失败:', error);
    }
};

// 发送 POST 请求示例
const sendData = async () => {
    try {
        const response = await post('/your/api/endpoint', { /* headers */ }, { /* params */ }, { /* data */ }, {
            withCredentials: true, // 允许携带 Cookie
        });

        if (response.status === 200) {
            console.log('数据发送成功:', response.data);
        }
    } catch (error) {
        console.error('发送数据失败:', error);
    }
};

~~~

vite.config,js

~~~js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: "https://localhost:7298",//后端地址
        changeOrigin: true,
        secure: false, // 忽略本地开发中的自签名证书错误
        logLevel: 'debug', // 增加调试日志
         ws: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果后端不需要 `/api` 前缀

      }

    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

~~~

使用

~~~js
 const response = await post(
            '/api/captcha',
            {userInputCaptcha: String(form.value.captcha)},
            {withCredentials: true,credentials: 'include' })
~~~

~~~js
const response = await get('/api/captcha/generate',{},{responseType: 'blob',withCredentials: true})
        if (response.status === 200) {
          // 创建一个 URL 对象来表示图片的 Blob
          captchaImage.value = URL.createObjectURL(response.data); // 设置验证码图片的 URL
        }
~~~

## JWT登录

创建一个 Vuex Store 来管理 JWT 相关的状态和操作。

#### `store/index.js`

~~~js

import Vuex from 'vuex';


export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '', // 从 localStorage 获取 token
    },
    mutations: {
        setToken(state, token) {
            state.token = token; // 更新 token 状态
            localStorage.setItem('token', token); // 将 token 存储到 localStorage
        },
        removeToken(state) {
            state.token = ''; // 清空 token 状态
            localStorage.removeItem('token'); // 移除 localStorage 中的 token
        },
    },
    actions: {
        login({ commit }, token) {
            commit('setToken', token); // 登录时设置 token
        },
        logout({ commit }) {
            commit('removeToken'); // 登出时清除 token
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token; // 返回是否已认证
        },
    },
});

~~~

~~~js
import Vue from 'vue';
Vue.use(Vuex);
~~~

登录时调用vuex

~~~js
import { mapActions } from 'vuex';
if (response.ok) {
                const data = await response.json();
                //this.login(data.token); // 使用 Vuex 动作存储 token
                Store.dispatch("login",data); // 使用 Vuex 动作存储 token
            }
~~~



存token

~~~js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        token: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        async login({ commit }, user) {
            const response = await axios.post('http://localhost:8080/api/auth/login', user);
            commit('setToken', response.data.token);
            localStorage.setItem('token', response.data.token); // 保存 token
        },
        logout({ commit }) {
            commit('setToken', null);
            localStorage.removeItem('token'); // 移除 token
        },
    },
});

export default store;

~~~



axios拦截器自动加token

~~~js
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token'); // 从存储中获取 token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 添加 Authorization header
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
~~~


## 表格分页

### Element-plus 分页

Element plus 分页有大坑，记得仔细读文档!
只绑定Current-page 没用，必须监听 `current-page` 变更的事件（`@update:current-page`），否则分页切换不起作用；

> WARNING
> 
> 我们现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：
> 
> - `total` 和 `page-count` 必须传一个，不然组件无法判断总页数；优先使用 `page-count`;
> - 如果传入了 `current-page`，必须监听 `current-page` 变更的事件（`@update:current-page`），否则分页切换不起作用；
> - 如果传入了 `page-size`，且布局包含 page-size 选择器（即 `layout` 包含 `sizes`），必须监听 `page-size` 变更的事件（`@update:page-size`），否则分页大小的变化将不起作用。

`TableView.vue`
~~~vue
  
<template>  
  
  <CustomTable :table-data="tableData" :current-page="currentPage" :page-size="pageSize" :total-pages="totalPages" @update:current-page="handleCurrentChange" >  
    <el-table-column prop="name" label="姓名" width="180"/>  
    <el-table-column prop="gender" label="性别" width="180"/>  
    <el-table-column prop="address" label="地址" width="400"/>  
    <el-table-column prop="bio" label="格言" width="200"/>  
  </CustomTable>  
</template>  
  
<script setup>  
import CustomTable from "@/components/base/CustomTable.vue";  
import {onMounted, ref} from "vue";  
import {get} from "@/request.js";  
  
  
const tableData = ref([]);  
const currentPage = ref(1);  
const pageSize = ref(15);  
const totalPages = ref(0);  
onMounted(async () =>{  
  try {  
    const response = await get('/api/table/getCount',"",{})  
    var cnt = response.data  
    totalPages.value = cnt  
    // totalPages = Math.ceil(cnt / pageSize); // 使用 Math.ceil 向上取整  
    console.log("总页数"+totalPages)  
  }catch (e) {  
    console.log(e)  
  }  
  
  fetchData(1,pageSize.value);  
  
  console.log('tableData:', tableData);  
  console.log('totalPages:', totalPages);  
  console.log('currentPage:', currentPage);  
  console.log('defaultPageSize:',pageSize);  
})  
  
async function fetchData(pageNum,pageSize) {  
  try {  
    const response = await get('/api/table/get',{  
      currentPage:pageNum,  
      pageSize:pageSize  
    },{})  
    tableData.value = response.data  
  }catch (e) {  
    console.log(e)  
  }  
}  
// 处理当前页变化  
const handleCurrentChange = (newPage) => {  
  currentPage.value = newPage; // 更新当前页  
  fetchData(newPage, pageSize.value); // 重新获取数据  
};  
  
  
</script>  
  
<style scoped>  
  
</style>
~~~

组件插槽 `CustomTable.vue`
~~~vue
<template>  
  <div>  <el-table :data="tableData" style="width: 100%" height=500>  
    <!-- 插槽：可以自定义表格列 -->  
    <slot></slot>  
  </el-table>    <div class="example-pagination-block">  
      <div class="example-demonstration">When you have more than 7 pages</div>  
      <p>total: {{ totalPages }}</p>  
      <p>current-page: {{ currentPage }}</p>  
      <p>default-page-size: {{ pageSize }}</p>  
      <!--      <el-pagination layout="prev, pager, next" :total="1000" />-->  
      <el-pagination layout="prev, pager, next" :total="totalPages" :current-page="currentPage" @update:current-page="handlePageChange" :page-size="pageSize" />  
    </div>  </div></template>  
  
<script setup>  
import { reactive } from 'vue';  
import {handleCurrentChange} from "element-plus/es/components/tree/src/model/util";  
  
const props = defineProps({  
  tableData: {  
    type: Array,  
    required: true  
  },  
  totalPages:{  
    type: Number,  
    required: true  
  },  
  currentPage:{  
    type: Number,  
    required: true  
  },  
  pageSize:{  
    type: Number,  
    required: true  
  }  
})  
  
// 定义 emitconst emit = defineEmits(['update:current-page']);  
// 处理页码变化  
const handlePageChange = (newPage) => {  
  emit('update:current-page', newPage); // 向父组件发送更新事件  
};  
  
</script>  
  
<style scoped>  
.example-pagination-block + .example-pagination-block {  
  margin-top: 10px;  
}  
.example-pagination-block .example-demonstration {  
  margin-bottom: 16px;  
}  
</style>
~~~
