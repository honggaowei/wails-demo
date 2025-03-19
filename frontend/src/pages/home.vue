<template>
  <q-page class="q-pa-md neumorphic-container">
    <div class="text-h5 q-mb-md">{{ t('menu.home') }}</div>
    <div class="row q-col-gutter-md">
      <!-- 添加一些示例卡片 -->
      <div class="col-12 col-md-4" v-for="n in 3" :key="n">
        <div class="neumorphic-card q-pa-md">
          <div class="text-h6">Card {{ n }}</div>
          <div class="q-mt-sm">
            Some content for card {{ n }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.neumorphic-container {
  min-height: 100vh;
}

.neumorphic-card {
  border-radius: 15px;
  background: linear-gradient(145deg,
              var(--neumorphic-gradient-light) 0%,
              var(--neumorphic-gradient-dark) 100%);
  box-shadow: 5px 5px 10px var(--neumorphic-dark),
              -5px -5px 10px var(--neumorphic-light);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 7px 7px 15px var(--neumorphic-dark),
                -7px -7px 15px var(--neumorphic-light);
  }
}
</style>
