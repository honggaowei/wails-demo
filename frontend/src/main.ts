// FILE: main.ts
import { createApp } from 'vue';
import { Quasar, QuasarPluginOptions } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';

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

// Assumes your root component is App.vue
// and placed in the same folder as main.ts
import App from './App.vue';

// Create the Vue app instance
const myApp = createApp(App);

// Define Quasar options with TypeScript support
const quasarOptions: Partial<QuasarPluginOptions> = {
  plugins: {}, // Import Quasar plugins and add here
  lang: quasarLang,
};

// Use Quasar with the defined options
myApp.use(Quasar, quasarOptions);

// Mount the app to the DOM element with id "app"
myApp.mount('#app');