<template>

    <q-page>

    <!-- 右侧密文面板 -->
    <div class="panel">
      <div class="panel-header">
        <h3>密文</h3>
        <button class="copy-btn" @click="copyText(outputText)">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <textarea
        v-model="outputText"
        class="text-area"
        placeholder="加密后的文本将显示在这里"
        readonly
      ></textarea>
    </div>
    </q-page>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Algorithm {
  value: string
  label: string
}

// 定义加密算法列表
const algorithms: Algorithm[] = [
  { value: 'aes', label: 'AES' },
  { value: 'des', label: 'DES' },
  { value: 'base64', label: 'Base64' },
  { value: 'md5', label: 'MD5' }
]

// 响应式状态
const inputText = ref<string>('')
const outputText = ref<string>('')
const selectedAlgorithm = ref<string>('aes')
const encryptKey = ref<string>('')

// 计算属性
const showParams = computed(() => 
  ['aes', 'des'].includes(selectedAlgorithm.value)
)

// 方法
const copyText = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    // TODO: 添加成功提示
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

const encrypt = async (): Promise<void> => {
  // TODO: 实现加密逻辑
}

const decrypt = async (): Promise<void> => {
  // TODO: 实现解密逻辑
}
</script>

<style scoped>
.encrypt-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 15px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.text-area {
  flex: 1;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: none;
}

.control-panel {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.algorithm-select select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.params-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.param-item input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.primary-btn {
  padding: 10px;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.primary-btn:hover {
  background: var(--primary-color-hover);
}

.copy-btn {
  padding: 5px 10px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-primary);
}

.copy-btn:hover {
  background: var(--bg-hover);
}
</style>
