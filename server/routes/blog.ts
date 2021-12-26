import {
    getAllBlogPosts,
    getBlogBySlug,
} from "../models/blog";
import { isRight } from 'fp-ts/Either';
import { FastifyReply, FastifyRequest } from "fastify";
import * as BLOG from '../../types/blog';
import * as SERVER from '../../types/server';

// TODO add types to fastify
function sendResult<T>(fastify: any ,result: SERVER.Result<T>, reply: FastifyReply) {
    if (isRight(result)) {
        reply.send(result.right)
    } else if (result.left.code === 404) {
        reply.send(fastify.httpErrors.notFound())
    } else {
        reply.send(fastify.httpErrors.internalServerError())
    }
}

export default function blog(fastify: any, _opts: unknown, done: () => unknown) {
    fastify.route({
        method: "GET",
        url: "/blog",
        handler: async (_req: FastifyRequest, reply: FastifyReply) => {
            fastify.log.info('blog');
            const result = await getAllBlogPosts();
            return sendResult(fastify, result, reply);
        },
    });

    fastify.route({
        method: "GET",
        url: "/blog/:slug",
        handler: async (req: FastifyRequest, reply: FastifyReply) => {
            fastify.log.info(req.params, "blog by slug");
            const result = await getBlogBySlug((req.params as BLOG.BlogRequestParams).slug);
            return sendResult(fastify, result, reply);
        },
    });

    done();
}
