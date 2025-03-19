import { createI18n } from 'vue-i18n';

const messages = {
  'zh-CN': {
    menu: {
      home: '首页',
      about: '关于',
      contact: '联系我们'
    },
    theme: {
      'morning-light': '晨光熹微',
      'warm-sand': '暖沙',
      'cool-mint': '薄荷清韵',
      'lavender-mist': '薰衣草雾',
      title: '主题设置'
    },
    settings: '系统设置',
    language: '语言'
  },
  'en-US': {
    menu: {
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    },
    theme: {
      'morning-light': 'Morning Light',
      'warm-sand': 'Warm Sand',
      'cool-mint': 'Cool Mint',
      'lavender-mist': 'Lavender Mist',
      title: 'Theme Settings'
    },
    settings: 'Settings',
    language: 'Language'
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages
});

export const availableLocales = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' }
];
