---
title: vue
categories: Vue
tags:
  - 前端开发
  - Vue
createtime: 2024-10-17 15:30:16
---
# Vue2

官方文档：写的很好，语法可以直接查

语法速查：[[vue语法]]

https://v2.cn.vuejs.org/v2/guide

## 第一个程序

~~~vue
<!DOCTYPE html>
<!-- 开发环境版本，包含了有帮助的命令行警告 -->

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js">
    </script>
</head>
<body>
<div id="app">
    {{ message }}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })
</script>
</body>
</html>
~~~

## Vue的生命周期


## vue-cli

需要提前安装nodejs npm

~~~shell
npm install vue-cli -g
~~~

~~~shell
npm install vue-cli
~~~

~~~shell
vue init webpack firstvue
~~~

## vue-router

### 安装

安装：vue2下是这个

~~~shell
npm i vue-router@3.5.2 -S
~~~

### 使用

#### 引入vue-router

**在main.js中引入**

~~~js
import VueRouter from "vue-router";

Vue.use(VueRouter)
~~~

测试一下使用方法

**创建router文件夹并在其中创建index.js，用来做路由配置，并将router文件夹导入到主函数**

~~~js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

~~~

声明路由的匹配规则
在 src/router/index.js 路由模块中，通过 routes数组声明路由的匹配规则。示例代码如下

~~~js
import Vue from "vue";
import VueRouter from "vue-router";
import Content from "../components/content.vue";
Vue.use(VueRouter)

export default new VueRouter({
  routes:[{
    //路由跳转路径
    path:'/content',
    //路由名称
    name:'content',
    //路由跳转组件
    component:Content
  }]
})

~~~

**导入并挂载路由模块**
在 src/main.js 入口文件中，导入并挂载路由模块。示例代码如下：

~~~js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

~~~

**声明路由链接和占位符**
在 src/App.vue 组件中，使用 vue-router 提供的 `<router-link>` 和 `<router-view>` 声明路由链接和占位符：
其实使用a链接也行，但更推荐使用`<router-link>` 并且这样不需要写#号，在浏览器控制台看到的还是a链接

~~~vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">index</router-link>
    <router-link to="/content">content</router-link>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

~~~

### 配置项

mode 默认是hash模式，可以改成history模式

hash模式即路径中有#

~~~vue
export default new Router({
  mode: "history",
}
~~~



## Element-UI

官方文档挺好的，建议敲代码直接chatgpt生成，然后看着文档改就行

### 引入

~~~shell
npm i element-ui -S
~~~

~~~js
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
//样式文件需要单独引入
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


~~~

随便写个东西测试一下，官网很多案例

~~~vue
<template>
  <div>
    <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="账号"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        style="width: 6%">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生年月"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="userRole"
        label="角色">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Register',
  data() {
    return{
      userList:[
        {id:1,userCode:'admin',userName:'系统管理员',gender:'男',birthday:'1993-11-12',phone:'13865427845',address:'北京市',userRole:'系统管理员'},
        {id:2,userCode:'sunshangxiang',userName:'孙尚香',gender:'女',birthday:'1999-12-17',phone:'13965489527',address:'郑州市',userRole:'游客'},
        {id:3,userCode:'guanyu',userName:'关羽',gender:'男',birthday:'2000-01-09',phone:'15765842469',address:'徐州市',userRole:'会员'},
        {id:4,userCode:'sunquan',userName:'孙权',gender:'男',birthday:'1992-10-08',phone:'18965552451',address:'杭州市',userRole:'管理员'},
        {id:5,userCode:'liubei',userName:'刘备',gender:'男',birthday:'1989-09-24',phone:'15068689595',address:'广州市',userRole:'管理员'},
        {id:6,userCode:'caocao',userName:'曹操',gender:'男',birthday:'1992-10-08',phone:'15545211245',address:'兖州市',userRole:'管理员'},
        {id:7,userCode:'huangyueying',userName:'黄月英',gender:'女',birthday:'2009-01-01',phone:'15966648531',address:'亳州市',userRole:'游客'},
      ]
    }
  },
  methods: {

  }
}
</script>

~~~

## export default

每一个vue文件下都有这样一个代码块，那么里面究竟应该写什么？
在 Vue 2 中，`export default` 用于导出 Vue 组件的默认对象配置，通常包含以下几个主要属性：

1. **`name`**：组件的名称，方便调试和递归组件使用。
2. **`data()`**：返回组件的响应式数据对象。
3. **`props`**：定义从父组件传入的数据。
4. **`computed`**：计算属性，基于响应式数据动态更新。
5. **`methods`**：定义组件中的方法。
6. **`watch`**：监听响应式数据的变化并执行相应逻辑。
7. **`components`**：局部注册子组件。
8. **`mounted`、`created`** 等生命周期钩子：定义组件在不同阶段的逻辑。
9. **`template`**：组件的模板，可以是 HTML 代码块或 JSX。

这些属性共同组成了 Vue 组件的结构，控制组件的行为和外观。

**简单示例**

~~~vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>计数器：{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
export default {
  name: 'CounterComponent', // 组件名称
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: this.initialCount, // 响应式数据
      title: '简单的计数器组件'
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2; // 计算属性，返回 count 的双倍
    }
  },
  methods: {
    increment() {
      this.count++; // 方法，点击按钮时增加 count
    }
  },
  watch: {
    count(newValue, oldValue) {
      console.log(`计数器从 ${oldValue} 变为 ${newValue}`); // 监听 count 的变化
    }
  },
  mounted() {
    console.log('组件已挂载'); // 生命周期钩子
      const urlParams = new URLSearchParams(window.location.search);
    const initialCount = parseInt(urlParams.get('initialCount'), 10);
    
    if (!isNaN(initialCount)) {
      this.count = initialCount; // 使用 URL 参数作为初始值
    }
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

~~~

**解释**

- **`props`**：从父组件接收 `initialCount`，初始值为 0。
- **`data()`**：定义 `count` 和 `title` 两个响应式数据。
- **`computed`**：`doubleCount` 计算属性，返回 `count` 的两倍。
- **`methods`**：`increment` 方法，用于增加 `count` 值。
- **`watch`**：监听 `count` 的变化并打印新旧值。
- **`mounted`**：在组件挂载到 DOM 时执行。

tips：vue2 不能用props接收url地址传参，可以用`$route.params.xxx`

## Axios

### 安装

可以通过 npm 安装 Axios：

```
bash


复制代码
npm install axios
```

### 使用示例

以下是 Axios 的基本使用方法：

1. **导入 Axios**：

   ```
   javascript
   
   
   复制代码
   import axios from 'axios';
   ```

2. **发送 GET 请求**：

   ```
   javascript复制代码axios.get('https://api.example.com/data')
     .then(response => {
       console.log(response.data);
     })
     .catch(error => {
       console.error('Error fetching data:', error);
     });
   ```

3. **发送 POST 请求**：

   ```
   javascript复制代码axios.post('https://api.example.com/data', {
       name: 'John',
       age: 30
   })
   .then(response => {
     console.log('Data saved:', response.data);
   })
   .catch(error => {
     console.error('Error saving data:', error);
   });
   ```

4. **使用 async/await**：

   ```
   javascript复制代码async function fetchData() {
     try {
       const response = await axios.get('https://api.example.com/data');
       console.log(response.data);
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   }
   ```

5. **设置默认配置**：

   ```
   javascript复制代码axios.defaults.baseURL = 'https://api.example.com';
   axios.defaults.headers.common['Authorization'] = 'Bearer token';
   ```

## vuex配置登录拦截

结合 Vuex 和 Axios 实现登录拦截的基本思路是：在每次发送请求之前检查用户是否已登录，如果未登录，则重定向到登录页面。以下是一个简单的实现示例：

### 1. 安装依赖

确保已安装 Axios 和 Vuex：

```shell
npm install axios vuex
```

### 2. 创建 Vuex Store

创建一个简单的 Vuex Store，用于管理用户的登录状态。

```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false, // 登录状态
    token: null, // 用户 token
  },
  mutations: {
    login(state, token) {
      state.isAuthenticated = true;
      state.token = token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('login', token);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
  },
});
```

### 3. 配置 Axios 拦截器

在 Vue 应用的入口文件中配置 Axios 拦截器，以便在请求前进行登录检查。

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import store from './store'; // 导入 Vuex
import axios from 'axios';

Vue.config.productionTip = false;

// 设置 Axios 基础 URL
axios.defaults.baseURL = 'https://api.example.com'; // 你的 API 地址

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.token; // 从 Vuex 获取 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 在请求头中设置 token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('logout'); // 登出
      router.push('/login'); // 重定向到登录页面
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```

### 4. 创建登录页面

创建一个简单的登录页面并使用 Vuex 进行状态管理。

```vue
<!-- src/views/Login.vue -->
<template>
  <div>
    <h1>登录</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">登录</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        this.login(token); // 更新 Vuex 状态
        this.$router.push('/'); // 登录成功后重定向到首页
      } catch (error) {
        this.errorMessage = '登录失败，请检查用户名和密码。';
      }
    },
  },
};
</script>
```

### 5. 配置路由

确保在路由配置中设置登录页面和其他需要保护的页面。

```js
// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  // 其他路由
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// 导航守卫，检查用户是否登录
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // 获取登录状态
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login'); // 如果未登录，则重定向到登录页面
  } else {
    next(); // 否则正常导航
  }
});

export default router;
```

### 小结

以上示例展示了如何使用 Vuex 和 Axios 实现登录拦截。在每次发送请求之前检查用户的登录状态，并在未登录的情况下重定向到登录页面。这种方式使得应用的安全性得到了提升，同时保证了用户体验。
