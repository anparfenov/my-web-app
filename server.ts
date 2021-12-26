import { FastifyReply, FastifyRequest } from "fastify";

import fs from 'fs';
import path from 'path';
import fastify from 'fastify';
import fastifySensible from 'fastify-sensible';
import { ViteDevServer, createServer as createViteServer } from "vite";

import blog_routes from './server/routes/blog';
import { makeHead } from './server/services/head';

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
// TODO: do i need this?
const API_SERVER = process.env.API_SERVER || "http://localhost:8000";
const API_PREFIX = '/api';

async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === "production",
) {
    const resolve = (p: string) => path.resolve(__dirname, p);

    const indexProd = isProd
        ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
        : "";

    const manifest = isProd
        ? require("./dist/client/ssr-manifest.json")
        : {};

    const app = fastify({
        logger: {
            prettyPrint: !isProd,
        }
    });
    await app.register(require("middie")); // connect like middlewares for vite
    app.register(fastifySensible); // http errors
    app.register(blog_routes, { prefix: API_PREFIX });

    let vite: ViteDevServer;
    if (!isProd) {
        vite = await createViteServer({
            root,
            logLevel: isTest ? "error" : "info",
            server: {
                middlewareMode: true,
            },
        });
        // use vite"s connect instance as middleware
        // @ts-ignore
        app.use(vite.middlewares);
    } else {
        app.register(require("fastify-compress"), { global: false });
        app.register(require("fastify-static"), {
            root: resolve("dist/client"),
            wildcard: false, // dont forget to disable wildcard, because you won't get access to GET * handler
        });
    }

    // app.register(require("fastify-http-proxy"), {
    //     upstream: API_SERVER,
    //     prefix: "/api", // it replaces api with nothing
    //     rewritePrefix: "/api", // don't forget about it
    // });

    app.get("*", async (request: FastifyRequest, reply: FastifyReply) => {
        app.log.info("App start");
        try {
            const url = request.url;

            let template: any, render: any;
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve("index.html"), "utf-8");
                try {
                    template = await vite.transformIndexHtml(url, template);
                    const mod = await vite.ssrLoadModule("/src/entry-server.ts");
                    render = mod.render;
                } catch (e) {
                    app.log.error("Transform or loadModule ERROR:", e);
                }
            } else {
                template = indexProd;
                render = require("./dist/server/entry-server.js").render;
            }

            const [appHtml, preloadLinks, initialState] = await render(url, manifest);

            let slug;
            if (url.startsWith('/blog/')) {
                slug = url.split('/')[2];
            }
            const head = await makeHead(url ?? '/', slug);

            app.log.info(`initialState, ${initialState}`);

            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)
                .replace(`<!--head-meta-->`, head)
                .replace(`<!--init-state-->`, `<script>window.__INITIAL_STATE__=${initialState}</script>`);

            reply.status(200).header("Content-Type", "text/html").send(html);
        } catch (e: unknown) {
            if (e instanceof Error) {
                vite && vite.ssrFixStacktrace(e);
                app.log.error("SERVER RENDER ERROR");
                app.log.error(e.stack);
                reply.status(500).send(e.stack);
            } else {
                app.log.error(e);
            }
        }
    });

    // @ts-ignore
    return { app, vite };
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(process.env.PORT || 3000, process.env.HOST || "0.0.0.0", () => {
            app.log.info("served on :3000");
        }),
    ).catch(e => console.log(e, "createServer error"));
}

// for test use
exports.createServer = createServer;
