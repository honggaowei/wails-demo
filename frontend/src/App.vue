<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { availableLocales } from './i18n';
import { getThemeList, setDocumentTheme, getDefaultTheme } from "./themes/theme";

const $q = useQuasar();
const drawerOpen = ref(true); // 默认展开
const loading = ref(false);
const router = useRouter();
const { t, locale } = useI18n();
const themeList = getThemeList();
const currentTheme = getDefaultTheme();

const themeButtonRef = ref<HTMLElement | null>(null);

// 页面切换前的加载动画
router.beforeEach((to, from, next) => {
  loading.value = true;
  setTimeout(() => next(), 1); // 模拟加载时间
});

// 页面渲染后
onMounted(() => {
  setDocumentTheme(currentTheme);
});

// 页面切换后的加载动画
router.afterEach(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1);
});

const switchLocale = async (newLocale: string,  event?: MouseEvent) => {

  const transition = (document as any).startViewTransition(() => {
    locale.value = newLocale;
  });

  let x: number, y: number;
  x = y = 0;
  const endRadius = Math.hypot(window.innerWidth - x, window.innerHeight - y);

  if (event) {
    x = event.clientX;
    y = event.clientY;
  } 

  try {
    await transition.ready;
    
    const clipPath = [
      `circle(${endRadius}px at ${x}px ${y}px)`,
      `circle(0px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath,
      },
      {
        duration: 1000,
        easing: 'ease-out',
        pseudoElement: '::view-transition-old(root)',
      }
    );
  } catch (err) {
    console.error('Error during transition:', err);
  }
  
};
</script>

<template>
  <q-layout view="lHr lpr lFr" class="n-layout">
    <q-drawer
      v-model="drawerOpen"
      bordered
      show-if-above
      :width="60"
      class="n-drawer"
    >
      <!-- 主导航区域 -->
      <q-list>
        <q-item class="n-btn" clickable v-ripple to="/" exact>
          <q-item-section avatar class="items-center">
            <q-icon name="home" />
          </q-item-section>
        </q-item>
        <q-item class="n-btn" clickable v-ripple to="/about">
          <q-item-section avatar class="items-center">
            <q-icon name="info" />
          </q-item-section>
        </q-item>
        <q-item class="n-btn" clickable v-ripple to="/contact">
          <q-item-section avatar class="items-center">
            <q-icon name="contact_support" />
          </q-item-section>
        </q-item>
        <q-item class="n-btn" clickable v-ripple to="/encrypt">
          <q-item-section avatar class="items-center">
            <q-icon name="lock" />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 底部工具按钮 -->
      <div class="bottom-tools">

        <q-btn-dropdown flat dense size="sm" icon="translate">
          <q-list>
            <q-item-label header>{{ t('language') }}</q-item-label>
            <q-item class="n-btn" v-for="lang in availableLocales" :key="lang.value" clickable v-close-popup
              @click="(e) => switchLocale(lang.value, e as MouseEvent)" :active="locale === lang.value">
              <q-item-section>
                <q-item-label>{{ lang.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat dense icon="palette" ref="themeButtonRef">
            <q-list>
              <q-item-label header>{{ t('theme') }}</q-item-label>
              <q-item class="n-btn" v-for="theme in themeList" :key="theme" clickable v-close-popup
                @click="setDocumentTheme(theme)" :active="theme === currentTheme">
                <q-item-section>
                  <q-item-label>{{ theme }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            </q-btn-dropdown>

        <q-btn flat dense icon="settings"/>
      </div>
    </q-drawer>

    <!-- 页面内容 -->
    <q-page-container>
      <!-- 路由视图 -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">

.n-layout, .n-drawer {
  @include neu-background;
}

.n-drawer {
  padding: 8px;
}

.n-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  @include neu-button;
  border-radius: 5px;
  margin-top: 8px;
  flex-direction: column;
}

.items-center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>