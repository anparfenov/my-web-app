import { isRight } from 'fp-ts/Either';
import { defineStore } from 'pinia';

import * as blogApi from '@/api/blog';

export const useBlogStore = defineStore('blog', {
    state: (): BLOG.BlogState => {
        return {
            blogList: null,
            blogPost: null,
            error: null,
        };
    },
    actions: {
        async fetchAllBlogPosts() {
            console.log('fetch all blog posts');
            const blogList = await blogApi.fetchAllBlogPosts();
            if (isRight(blogList)) {
                console.log('blogList', blogList.right);
                this.setBlogList(blogList.right)
            } else {
                console.log('blogList err', blogList.left);
                const blogError = blogList.left as HTTP.HttpError;
                if (blogError.status > 299 && blogError.status < 499) {
                    this.setError('пока статей нет');
                } else if (blogError.status > 499) {
                    this.setError('ошибка: проблемы на сервере');
                }
            }
        },
        async fetchBlogPost(slug: string) {
            const blogPost = await blogApi.fetchBlogPost(slug);
            if (isRight(blogPost)) {
                this.setBlogPost(blogPost.right);
            } else {
                this.setError(blogPost.left);
            }
        },
        setBlogPost(payload: any) {
            this.blogPost = payload;
        },
        setBlogList(payload: any) {
            console.log('');
            this.blogList = payload;
        },
        setError(payload: any) {
            this.error = payload;
        }
    },
});
