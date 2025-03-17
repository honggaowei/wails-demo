<template>
  <div class="redis-manager">
    <h1>Redis Manager</h1>
    <!-- 连接信息表单 -->
    <form @submit.prevent="connectToRedis">
      <label for="host">Host:</label>
      <input type="text" v-model="host" id="host" required />
      <label for="port">Port:</label>
      <input type="number" v-model="port" id="port" required />
      <label for="password">Password:</label>
      <input type="text" v-model="password" id="password" required />
      <button type="submit">Connect</button>
    </form>
    <!-- 数据库操作 -->
    <div v-if="isConnected">
      <h2>Database Operations</h2>
      <!-- 查看键值 -->
      <button @click="viewKeys">View Keys</button>
      <ul>
        <li v-for="key in keys" :key="key">{{ key }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import {
  ConnectToRedis,
  CloseRedisConnection,
  ExecuteRedisCommand,
} from '../../wailsjs/go/main/App';

// 定义响应式变量并添加类型
const host = ref<string>(''); // Redis 主机地址
const port = ref<number>(6379); // Redis 端口号
const password = ref<string>(''); // Redis 密码
const isConnected = ref<boolean>(false); // 是否已连接到 Redis
const keys = ref<string[]>([]); // Redis 键列表

/**
 * 连接到 Redis
 */
async function connectToRedis(): Promise<void> {
  try {
    await ConnectToRedis(host.value, port.value.toString(), password.value);
    isConnected.value = true;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
}

/**
 * 查看 Redis 键
 */
async function viewKeys(): Promise<void> {
  if (!isConnected.value) {
    console.error('Not connected to Redis');
    return;
  }

  try {
    const response = await ExecuteRedisCommand('KEYS *');
    // 假设返回的是以空格分隔的字符串
    keys.value = response.split(' ') as string[];
  } catch (error) {
    console.error('Failed to fetch keys from Redis:', error);
  }
}

/**
 * 组件卸载时关闭 Redis 连接
 */
onUnmounted(async () => {
  if (isConnected.value) {
    try {
      await CloseRedisConnection();
      console.log("Redis connection closed");
      
    } catch (error) {
      console.error('Failed to close Redis connection:', error);
    }
  }
});
</script>

<style scoped>
.redis-manager {
  padding: 20px;
  font-family: 'Nunito', sans-serif;
}
form {
  margin-bottom: 20px;
}
label,
input,
button {
  display: block;
  margin-bottom: 10px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
}
</style>