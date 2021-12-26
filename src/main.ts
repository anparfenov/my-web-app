import App from "./App.vue";
import { createSSRApp } from "vue";
import { getRouter } from "./router";
import { createStore } from "./stores";
import { getI18n } from "./i18n";

export function createApp() {
    const app = createSSRApp(App);
    const router = getRouter();
    const store = createStore();
    const i18n = getI18n();
    app.use(router);
    app.use(store);
    app.use(i18n);
    return { app, router, store};
}
