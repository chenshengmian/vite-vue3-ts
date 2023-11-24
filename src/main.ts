
import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
import caches from './utils/cache'

export function createApp() {
  const app = createSSRApp(App);
  app.use(tmui, { shareDisable: false } as Tmui.tmuiConfig)
  app.config.globalProperties.$caches = caches;
  return {
    app,
    Pinia
  };
}
