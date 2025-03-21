<template>
  <q-page class="neumorphic-container">
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

<style lang="scss">



</style>
