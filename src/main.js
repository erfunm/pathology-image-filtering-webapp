import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

// Themes
import Aura from '@primevue/themes/aura';

// Icons
import "primeicons/primeicons.css";

// Components
import Paginator from 'primevue/paginator'

const app = createApp(App, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});

app.use(router);
app.use(PrimeVue);

app.component('Paginator', Paginator);

app.mount('#app');