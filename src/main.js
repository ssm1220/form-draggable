import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './router';
const app = createApp(App);
app.use(ElementPlus)
app.use(createPinia());
app.use(router);
app.mount('#app');

// 1.我们先自己构造一些假数据 能够根据位置渲染内容
// 2.配置组件对应的映射关系 {preview: xxx, render: xxx}
