<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { themes, type NeumorphicTheme } from './themes';
import { useI18n } from 'vue-i18n';
import { availableLocales } from './i18n';


const $q = useQuasar();
const drawerOpen = ref(true); // 默认展开
const loading = ref(false);
const router = useRouter();
const { t, locale } = useI18n();

const themeButtonRef = ref<HTMLElement | null>(null);

// 主题相关
const currentTheme = ref<NeumorphicTheme>(themes[0]);

// 更新主题
const updateTheme = async (theme: NeumorphicTheme, event?: MouseEvent) => {
  console.log('Updating theme:', theme.name);

  if (theme.name == currentTheme.value.name) {
    return;
  }

  if (!(document as any).startViewTransition) {
    applyTheme(theme);
    return;
  }

  // Get click coordinates or button center if event not provided
  let x: number, y: number;
  x = y = 0;
  const endRadius = Math.hypot(window.innerWidth - x, window.innerHeight - y);

  if (event) {
    x = event.clientX;
    y = event.clientY;
  } 
  const transition = (document as any).startViewTransition(() => {
    applyTheme(theme);
  });

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

// 实际应用主题的函数
const applyTheme = (theme: NeumorphicTheme) => {
  currentTheme.value = theme;
  const { colors } = theme;

  document.documentElement.style.setProperty('--neumorphic-bg', colors.base);
  document.documentElement.style.setProperty('--neumorphic-text', colors.text);
  document.documentElement.style.setProperty('--neumorphic-gradient-light', colors.gradientLight);
  document.documentElement.style.setProperty('--neumorphic-gradient-dark', colors.gradientDark);
  document.documentElement.style.setProperty('--neumorphic-light', colors.shadowLight);
  document.documentElement.style.setProperty('--neumorphic-dark', colors.shadowDark);
};

// 页面切换前的加载动画
router.beforeEach((to, from, next) => {
  loading.value = true;
  setTimeout(() => next(), 500); // 模拟加载时间
});

// 页面切换后的加载动画
router.afterEach(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

const switchLocale = (newLocale: string) => {
  locale.value = newLocale;
};
</script>

<template>
  <q-layout view="hHh lpR fFf" class="neumorphic-theme window-frame">
    <!-- 移除顶部工具栏，修改侧边栏 -->
    <q-drawer v-model="drawerOpen" show-if-above class="neumorphic-drawer" mini>
      <!-- 主导航区域 -->
      <q-list class="main-nav">
        <q-item clickable v-ripple to="/" exact class="neumorphic-item justify-center">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about" class="neumorphic-item justify-center">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/contact" class="neumorphic-item justify-center">
          <q-item-section avatar>
            <q-icon name="contact_support" />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 底部工具按钮 -->
      <div class="bottom-tools">
        <q-btn-dropdown flat dense size="sm" icon="palette" class="neumorphic-item justify-center">
          <q-list class="neumorphic-dropdown">
            <q-item-label header>{{ t('theme.title') }}</q-item-label>
            <q-item v-for="theme in themes" :key="theme.name" clickable v-close-popup 
              @click="(e) => updateTheme(theme, e as MouseEvent)"
              :active="currentTheme.name === theme.name">
              <q-item-section>
                <q-item-label>{{ t(`theme.${theme.name}`) }}</q-item-label>
                <div class="theme-preview" :style="{
                  background: theme.colors.base,
                  border: `1px solid ${theme.colors.shadowDark}`
                }"></div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat dense size="sm" icon="translate" class="neumorphic-item justify-center">
          <q-list class="neumorphic-dropdown">
            <q-item-label header>{{ t('language') }}</q-item-label>
            <q-item v-for="lang in availableLocales" :key="lang.value" clickable v-close-popup
              @click="switchLocale(lang.value)" :active="locale === lang.value">
              <q-item-section>
                <q-item-label>{{ lang.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn flat dense icon="settings" class="neumorphic-item justify-center" />
      </div>
    </q-drawer>

    <!-- 页面内容 -->
    <q-page-container>
      <!-- 动态加载动画 -->
      <transition name="fade">
        <div v-if="loading" class="loading-overlay neumorphic-loading">
          <div class="loading-inner">
            <q-spinner-dots size="50px" class="loading-spinner" />
            <div class="loading-text">Loading...</div>
          </div>
        </div>
      </transition>

      <!-- 路由视图 -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 禁用全局滚动 */
}

:root {
  view-transition-name: root;
}

:root {
  --neumorphic-bg: #e0e5ec;
  --neumorphic-gradient-light: #e8edf4;
  --neumorphic-gradient-dark: #d8dde4;
  --neumorphic-light: rgba(255, 255, 255, 0.7);
  --neumorphic-dark: rgba(163, 177, 198, 0.7);
  --neumorphic-text: #2c3e50;
}

.theme-preview {
  width: 100%;
  height: 24px;
  margin-top: 4px;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-image-pair(root) {
  isolation: auto;
}

.neumorphic-theme {
  background: linear-gradient(135deg,
      var(--neumorphic-gradient-light) 0%,
      var(--neumorphic-bg) 50%,
      var(--neumorphic-gradient-dark) 100%);
  color: var(--neumorphic-text);

  .neumorphic-header {
    background: linear-gradient(to bottom,
        var(--neumorphic-gradient-light) 0%,
        var(--neumorphic-bg) 100%);
    position: relative;
    color: var(--neumorphic-text);
    height: 48px;
    -webkit-app-region: drag;

    .q-toolbar {
      min-height: 48px;
      justify-content: space-between;
      padding: 0 8px;

      .q-toolbar__title {
        font-weight: 500;
        letter-spacing: 0.5px;
        font-size: 14px;
      }
    }


    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: linear-gradient(to right,
          transparent 0%,
          var(--neumorphic-dark) 50%,
          transparent 100%);
    }
  }

  .neumorphic-drawer {
    background: linear-gradient(to right,
        var(--neumorphic-gradient-light) 0%,
        var(--neumorphic-bg) 100%);
    position: relative;
    color: var(--neumorphic-text);
    width: 60px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 0;

    .main-nav {
      flex: 1;
      padding: 8px 4px;
    }

    .bottom-tools {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px;

      .neumorphic-item {
        margin: 0;
        width: 44px;
        height: 44px;
        padding: 0;

        .q-icon {
          font-size: 1.5rem;
        }
      }

      .q-btn-dropdown {
        width: 44px;
        height: 44px;
      }
    }

    .q-list {
      padding: 8px 4px;
    }

    .neumorphic-item {
      margin: 8px 4px;
      border-radius: 8px;
      min-height: 44px;
      padding: 4px;
      
      .q-icon {
        font-size: 1.5rem;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom,
          transparent 0%,
          var(--neumorphic-dark) 50%,
          transparent 100%);
    }
  }

  .neumorphic-btn {
    border-radius: 10px;
    background: linear-gradient(145deg,
        var(--neumorphic-gradient-light) 0%,
        var(--neumorphic-gradient-dark) 100%);
    position: relative;
    box-shadow: 5px 5px 10px var(--neumorphic-dark),
      -5px -5px 10px var(--neumorphic-light);
    color: var(--neumorphic-text);
    min-height: 32px;
    min-width: 32px;
    padding: 0 8px;

    &.q-btn--round {
      width: 32px;
      height: 32px;
      padding: 0;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 10px;
      border: 1px solid transparent;
      background: linear-gradient(135deg,
          var(--neumorphic-light) 0%,
          transparent 50%,
          var(--neumorphic-dark) 100%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    &:active {
      background: var(--neumorphic-bg);
      box-shadow: inset 3px 3px 7px var(--neumorphic-dark),
        inset -3px -3px 7px var(--neumorphic-light);
    }
  }

  .neumorphic-item {
    margin: 8px;
    background: linear-gradient(145deg,
        var(--neumorphic-gradient-light) 0%,
        var(--neumorphic-gradient-dark) 100%);
    position: relative;
    box-shadow: 5px 5px 10px var(--neumorphic-dark),
      -5px -5px 10px var(--neumorphic-light);
    color: var(--neumorphic-text);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      background: linear-gradient(135deg,
          var(--neumorphic-light) 0%,
          transparent 50%,
          var(--neumorphic-dark) 100%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    &:active {
      background: var(--neumorphic-bg);
      box-shadow: inset 3px 3px 7px var(--neumorphic-dark),
        inset -3px -3px 7px var(--neumorphic-light);
    }

    &:hover::after {
      background: linear-gradient(135deg,
          var(--neumorphic-dark) 0%,
          transparent 50%,
          var (--neumorphic-light) 100%) border-box;
    }
  }

  .neumorphic-dropdown {
    min-width: 200px;
    padding: 8px;

    .q-item {
      border-radius: 8px;
      margin-bottom: 4px;

      &--active {
        background: var(--neumorphic-gradient-light);
        box-shadow: inset 2px 2px 5px var(--neumorphic-dark),
          inset -2px -2px 5px var(--neumorphic-light);
      }
    }
  }
}

/* 加载动画样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--neumorphic-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &.neumorphic-loading {
    background: linear-gradient(135deg,
      var(--neumorphic-gradient-light) 0%,
      var(--neumorphic-bg) 50%,
      var(--neumorphic-gradient-dark) 100%);

    .loading-inner {
      padding: 40px;
      border-radius: 20px;
      background: var(--neumorphic-bg);
      box-shadow: 8px 8px 16px var(--neumorphic-dark),
        -8px -8px 16px var(--neumorphic-light);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: pop-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      
      .loading-spinner {
        color: var(--neumorphic-text);
        animation: spin 2s linear infinite;
      }

      .loading-text {
        color: var(--neumorphic-text);
        font-size: 1.2em;
        font-weight: 500;
        text-shadow: 2px 2px 4px var(--neumorphic-dark),
          -2px -2px 4px var(--neumorphic-light);
      }
    }
  }
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.row.q-gutter-sm {
  margin: 0 4px; // 减小外边距

  .neumorphic-btn {
    margin: 0 2px; // 减小按钮间距
  }
}

@keyframes fade-in { }
@keyframes fade-out { }
@keyframes slide-from-right { }
@keyframes slide-to-left { }

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

.window-frame {
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
  border: 1px solid var(--neumorphic-dark);
}

// 确保所有按钮和交互元素不会被拖拽影响
.q-btn,
.q-item,
.q-btn-dropdown {
  -webkit-app-region: no-drag;
}
</style>