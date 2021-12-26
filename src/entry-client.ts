import { createApp } from "./main";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    try {
        store.state.value = window.__INITIAL_STATE__;
    } catch {
        // Error
    }
}
// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.mount("#app");
});
