// import { Either } from 'fp-ts/Either';

export type FrontMatter = {
    title: string;
    date: string;
    slug: string; // unique
    description?: string;
    tags?: Array<string>;
};

export type BlogPost = {
    frontMatter: FrontMatter;
    content: string;
};

export type useBlogParams = {
    prefixUrl: string;
    tagPrefixUrl: string;
}

export type BlogState = {
    blogList: Array<BlogPost> | null;
    blogPost: BlogPost | null;
    error: any;
};

export type BlogRequestParams = {
    slug: string;
};

export as namespace BLOG;
