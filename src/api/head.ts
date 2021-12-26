import { HttpClient } from '@/api/http';

const client = new HttpClient('axios');
export async function fetchHead(): Promise<SERVER.Result<BLOG.BlogPost[]>> {
    return client.url('/api/blog').read<BLOG.BlogPost[]>();
}

export async function fetchBlogPost(slug: string): Promise<SERVER.Result<BLOG.BlogPost>> {
    return client.url(`/api/blog/${slug}`).read<BLOG.BlogPost>();
}
