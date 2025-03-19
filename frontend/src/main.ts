// FILE: main.ts
import { createApp } from 'vue';
import { Quasar, QuasarPluginOptions } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import router from './router/index';
import { i18n } from './i18n';

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/eva-icons/eva-icons.css';
import '@quasar/extras/themify/themify.css';
import '@quasar/extras/line-awesome/line-awesome.css';

// A few examples for animations from Animate.css:
// import '@quasar/extras/animate/fadeIn.css';
// import '@quasar/extras/animate/fadeOut.css';

// Import Quasar css
import 'quasar/src/css/index.sass'
import './styles/neumorphic.scss'

// Assumes your root component is App.vue
// and placed in the same folder as main.ts
import App from './App.vue';

// Create the Vue app instance
const app = createApp(App);

// Define Quasar options with TypeScript support
const quasarOptions: Partial<QuasarPluginOptions> = {
  plugins: {}, // Import Quasar plugins and add here
  lang: quasarLang,
};

// 插件安装顺序很重要
app.use(i18n);      // 1. 首先安装 i18n
app.use(Quasar, quasarOptions);  // 2. 然后是 Quasar
app.use(router);    // 3. 最后是路由

// Mount the app
app.mount('#app');