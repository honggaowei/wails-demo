import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import RedisManager from '../components/RedisManager.vue'
import Encrypt from '../components/Encrypt.vue'
import Home from '../pages/home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/',
      redirect: '/home'  // 重定向到 /home
    },
    {
      path: '/home',
      component: Home
    },
    { 
      path: '/hello', 
      component: HelloWorld 
    },
    { 
      path: '/redis', 
      component: RedisManager 
    },
    { 
      path: '/encrypt', 
      component: Encrypt 
    },
  ],
})

export default router;