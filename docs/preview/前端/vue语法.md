---
Title: vue语法
Categories: Vue
Tags:
  - 前端开发
  - Vue
createtime: 2024-10-18 15:30:16
---
## 条件渲染

条件渲染可以使用 `v-if`、`v-else-if`、`v-else` 和 `v-show` 指令来控制元素或组件的显示和隐藏。以下是常用的条件渲染方式：

### **`v-if` 条件渲染**

`v-if` 指令用于根据条件判断来决定是否渲染某个元素。如果条件为 `true`，元素会被渲染，否则它不会被渲染到 DOM 中。
~~~vue
<template>
  <div>
    <p v-if="isVisible">这是一个可见的段落。</p>
    <p v-else>这是一个不可见的段落。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>
~~~
`v-if="isVisible"`：当 `isVisible` 为 `true` 时，渲染第一个 `<p>` 标签；否则渲染 `v-else` 中的内容。

### **`v-else-if` 和 `v-else`**

你可以使用 `v-else-if` 和 `v-else` 作为 `v-if` 的补充，以便根据多个条件渲染不同的内容。
~~~vue
<template>
  <div>
    <p v-if="status === 'loading'">加载中...</p>
    <p v-else-if="status === 'success'">加载成功！</p>
    <p v-else>加载失败，请重试。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('loading'); // 'loading', 'success', 'error'
</script>
~~~
- `v-else-if` 用来处理额外的条件。
- `v-else` 用来处理前面的所有条件不满足时的默认情况。

### **`v-show` 条件渲染**

`v-show` 和 `v-if` 类似，但不同的是，`v-show` 不会从 DOM 中移除元素，而是通过 CSS 来切换元素的 `display` 样式。
~~~vue
<template>
  <div>
    <p v-show="isVisible">这是一个可见的段落。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>
~~~
`v-show="isVisible"`：当 `isVisible` 为 `true` 时，段落会显示；当 `isVisible` 为 `false` 时，段落会被隐藏（`display: none`）。

### **`v-if` vs `v-show`**

- `v-if` 是真正的条件渲染，在条件为 `false` 时，元素根本不会被渲染到 DOM 中。
- `v-show` 是通过 CSS 的 `display` 属性来切换元素的显示和隐藏，元素始终存在于 DOM 中。

**使用场景：**

- **`v-if`**：适用于频繁切换的渲染内容，减少不必要的 DOM 操作。
- **`v-show`**：适用于显示/隐藏操作频繁的场景，因为元素始终保留在 DOM 中，切换显示状态性能更好。

### **结合模板语法的条件渲染**

Vue 还可以通过三元表达式直接在模板中进行条件判断：
~~~vue
<template>
  <div>
    <p>{{ isVisible ? '这是一个可见的段落' : '这是一个不可见的段落' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>
~~~


## 列表渲染

在 Vue 3 中，列表渲染使用 `v-for` 指令来遍历数组或对象，并在模板中动态生成元素。以下是 Vue 3 列表渲染的常用方式和示例。

### 基本渲染

使用 `v-for` 迭代数组并生成 DOM 元素：
~~~vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ index + 1 }}: {{ item }}
    </li>
  </ul>
</template>

<script setup>
const items = ['苹果', '香蕉', '橙子'];
</script>
~~~
在这个例子中，`v-for="(item, index) in items"` 迭代数组 `items`，`item` 是当前的数组元素，`index` 是索引。`key` 是唯一标识符，建议为每个元素设置 `key` 以优化渲染性能。

### 渲染对象数组

~~~vue
<template>
  <ul>
    <li v-for="(value, key, index) in user" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup>
const user = [{
  name: 'John Doe',
  age: 28,
  country: 'USA'
}];
</script>
~~~
在这个例子中，`v-for="(value, key, index) in user"` 用于遍历对象 `user`，`key` 是对象的属性名，`value` 是属性的值，`index` 是序号。

### 组件渲染

可以将 `v-for` 用于组件来生成动态的组件列表：

父组件
~~~vue
<template>
  <div>
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script setup>
import UserCard from './UserCard.vue';

const users = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
];
</script>
~~~

子组件 (`UserCard.vue`)
~~~vue
<template>
  <div>
    <h3>{{ user.name }}</h3>
    <p>年龄: {{ user.age }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>
~~~
在这个例子中，父组件遍历 `users` 数组并动态渲染 `UserCard` 组件，同时将每个用户对象作为 `user` 传递给子组件。

### V-if 和 v-for

可以将 `v-if` 与 `v-for` 结合使用，确保根据条件动态渲染列表项。需要注意的是，`v-if` 应该尽量避免和 `v-for` 一起使用在同一元素上，最好将其分开处理：
~~~vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id" v-if="item.isActive">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
const items = [
  { id: 1, name: '苹果', isActive: true },
  { id: 2, name: '香蕉', isActive: false },
  { id: 3, name: '橙子', isActive: true }
];
</script>
~~~
在这个例子中，只会渲染 `isActive` 为 `true` 的项目。

### 列表渲染优化

- **`key` 属性**：为 `v-for` 渲染的每个项目提供唯一的 `key`，这有助于 Vue 跟踪每个节点的身份，从而更高效地更新和重新渲染列表。
    
- **避免使用索引作为 `key`**：除非数据顺序不会发生变化，否则不推荐使用索引作为 `key`，因为这样可能会导致渲染更新的性能问题。

## 事件处理

### 基本使用

使用 `v-on` 或其简写 `@` 绑定事件处理器：

~~~vue
<template>
  <button @click="handleClick">点击我</button>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击了！');
}
</script>
~~~

### 事件修饰符

Vue 提供了一些事件修饰符，用于处理常见的事件行为，如阻止默认行为、阻止事件冒泡等。

- `.stop` 阻止事件冒泡
- `.prevent` 阻止默认行为
- `.self` 只在事件从元素本身发出时触发

~~~vue
<template>
  <form @submit.prevent="submitForm">
    <button type="submit">提交</button>
  </form>
</template>

<script setup>
const submitForm = () => {
  console.log('表单已提交！');
}
</script>
~~~
这里 `@submit.prevent` 阻止了表单的默认提交行为。

### Emit

子组件可以使用 `$emit` 来向父组件传递事件，父组件监听这个事件。

[[#Emit 事件处理]]

**子组件**
~~~vue
<template>
  <button @click="$emit('custom-event', '从子组件传递的数据')">子组件按钮</button>
</template>
~~~
**父组件**
~~~vue
<template>
  <ChildComponent @custom-event="handleEvent" />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';

const handleEvent = (data) => {
  console.log('接收到的数据:', data);
}
</script>
~~~

## Axios 异步通信

[[Vue代码大全#Axios封装以及跨域配置]]

Request. Js
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

Vite. Config, js

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
        target: "https://localhost:7298",
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


## 表单输入绑定

使用 v-model 双向绑定

~~~vue
<template>
  <input v-model="inputValue" placeholder="请输入" />
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
</script>
~~~

## 父子组件

组件是构建 vue 程序的基本单元，这里主要介绍父子组件间的通讯

### Props 属性

Props 是组件的自定义属性，组件的使用者可以通过 props 把数据传递到子组件内部，供子组件内部进行使用。

Props 的作用：  
父组件通过 props 向子组件传递要展示的数据。

Vue 2 方式
~~~js
<script> export default { 
name: 'MyArticle', // 外界可以传递指定的数据，到当前的组件中 
props: ['title', 'author', 'pubTime'] 
} 
</script>
~~~
Vue 3 方式
~~~js
<script setup>
const props = defineProps({ tableData: { type: Array, required: true } });
</script>
~~~

在父组件用 v-bind 方式进行传值
~~~vue
<TableWithSlot v-bind:tableData="userData" />
<TableWithSlot :tableData="userData" />
<my-article :title="info.title" :author="'post by ' + info.author" pub-time="1989"></my-article>
~~~

### Emit 事件处理

可以通过 `emit` 方法在子组件中触发事件，并在父组件中监听它们：

**子组件：**
~~~vue
<template>
  <button @click="notifyParent">通知父组件</button>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();
const notifyParent = () => {
  emit('notify', '子组件已通知父组件--此处可替换为参数');
};
</script>
~~~

**父组件：**
~~~vue
<template>
  <div>
    <MyGreeting @notify="handleNotify" />
  </div>
</template>

<script setup>
import MyGreeting from './MyGreeting.vue';

const handleNotify = (message) => {
  console.log(message);
};
</script>

~~~
解释：子组件 click 调用 notifyParent（此处也可传参），调用 emit 方法（第一个参数是调用父组件的哪个监听事件，第二个参数是参数），父组件@notify 监听，接到消息后调用 handleNotify 方法

### Emit 简写（常用）
**子组件**
~~~vue
<template>
  <button @click="$emit('custom-event', '从子组件传递的数据')">子组件按钮</button>
</template>
~~~
**父组件**
~~~vue
<template>
  <ChildComponent @custom-event="handleEvent" />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';

const handleEvent = (data) => {
  console.log('接收到的数据:', data);
}
</script>
~~~

## 计算属性

计算属性是用于依赖于其他数据属性并根据这些属性计算出新值的一个功能。计算属性的值会根据其依赖的响应式属性自动更新。

### 定义计算属性

在 Vue 3 的 `setup` 函数中，可以使用 `computed` API 来定义计算属性
Tips: 不必非使用 computed 这个词，只不过习惯是用这个
~~~vue
<template>
  <div>
    <p>原始值: {{ number }}</p>
    <p>计算值: {{ doubledNumber }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const number = ref(5);

// 定义计算属性
const doubledNumber = computed(() => {
  return number.value * 2;
});
</script>
~~~

在上面的例子中，`doubledNumber` 是一个计算属性，它依赖于 `number` 的值。当 `number` 发生变化时，`doubledNumber` 会自动更新。

### 特点

- **缓存**：计算属性是基于它们的依赖进行缓存的，只有在相关依赖发生变化时才会重新计算。
- **懒计算**：计算属性不会立即计算，只有在访问它们时才会执行计算。

### 使用场景

- **数据格式化**：可以用来格式化显示的数据，例如格式化日期或货币。
- **复杂逻辑**：根据多个数据源计算出复杂的值，例如根据用户输入的多个表单字段生成一个对象。
也可以当成监听器
~~~js
watch(doubledNumber, (newValue) => {
  console.log(`新计算值: ${newValue}`);
});
~~~
## 插槽与自定义事件

> **Vue 实现了一套内容分发的 API，将 `<slot>` 元素作为承载分发内容的出口，称为插槽。**
> 
> **插槽实质是对子组件的扩展，通过 `<slot>` 插槽向组件内部指定位置传递内容。**



### 多个具名插槽的绑定

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

~~~vue
<!--插槽-->
<template>
  <div>
    <!-- 具名插槽：header -->
    <slot name="header"></slot>

    <!-- 具名插槽：body -->
    <slot name="body"></slot>

    <!-- 具名插槽：footer -->
    <slot name="footer"></slot>
  </div>
</template>
<!--父组件-->
<template>
  <ChildComponent>
    <!-- 绑定到 header 插槽 -->
    <template v-slot:header>
      <h1>Header Content</h1>
    </template>

    <!-- 绑定到 body 插槽 -->
    <template v-slot:body>
      <p>This is the body content.</p>
    </template>

    <!-- 绑定到 footer 插槽 -->
    <template v-slot:footer>
      <footer>Footer Content</footer>
    </template>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>

~~~

### 匿名插槽

**匿名插槽** 不需要使用 `v-bind` 或具名的方式，它默认会接收父组件传递的内容，而不用显式指定 `slot` 的名称。

在子组件中，你可以直接使用一个未命名的 `<slot>`，这就是匿名插槽：

子组件 (`ChildComponent.vue`)：

~~~vue
<template>
  <div>
    <!-- 匿名插槽 -->
    <slot></slot>
  </div>
</template>
~~~

在父组件中，直接在 `ChildComponent` 标签内部放置要传递的内容即可，匿名插槽会自动捕获：

父组件 (`ParentComponent.vue`)：

~~~vue
<template>
  <ChildComponent>
    <p>This content will be placed in the default (anonymous) slot.</p>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>
~~~
很方便
