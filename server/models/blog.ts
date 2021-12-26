import fs from 'fs-extra';
import { right, left } from 'fp-ts/Either';

import { CACHE_FILE } from '../const';
// should import this to support types
import * as SERVER from '../../types/server';
import * as BLOG from '../../types/blog';


export async function getAllBlogPosts(): Promise<SERVER.Result<BLOG.BlogPost[]>> {
    try {
        const content = await fs.readFile(CACHE_FILE, 'utf-8');
        const blogPosts = JSON.parse(content);
        if (blogPosts) {
            return right(blogPosts);
        }

        return left({ code: 404 });
    } catch (e) {
        return left({ code: 404 });
    }
}

export async function getBlogBySlug(slug: string): Promise<SERVER.Result<BLOG.BlogPost>> {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    const blogPosts = JSON.parse(content);
    const post = blogPosts.find((post: BLOG.BlogPost) => post.frontMatter.slug === slug);
    if (post) {
        return right(post);
    }

    return left({ code: 404 });
}
