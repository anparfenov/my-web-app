import { createApp } from "./main";
import { renderToString, SSRContext } from "@vue/server-renderer";

export async function render(url: string, manifest: unknown) {
    const { app, router, store } = createApp();

    // set the router to the desired URL before rendering
    router.push(url);
    await router.isReady();

    const ctx = router.currentRoute.value.meta.state || {};
    const html = await renderToString(app, ctx as SSRContext);

    const initialState = JSON.stringify(store.state.value || {});
    console.log('initialState', initialState);

    // the SSR manifest generated by Vite contains module -> chunk/asset mapping
    // which we can then use to determine what files need to be preloaded for this
    // request.
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    return [html, preloadLinks, initialState];
}

function renderPreloadLinks(modules: Array<unknown>, manifest: unknown) {
    let links = "";
    const seen = new Set();
    modules.forEach((id) => {
        const files = manifest[id];
        if (files) {
            files.forEach((file: string) => {
                if (!seen.has(file)) {
                    seen.add(file);
                    links += renderPreloadLink(file);
                }
            });
        }
    });
    return links;
}

function renderPreloadLink(file: string) {
    if (file.endsWith(".js")) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
        return `<link rel="stylesheet" href="${file}">`;
    } else {
        // TODO render not css/js preload link
        return "";
    }
}
