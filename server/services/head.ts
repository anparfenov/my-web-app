import { isRight } from 'fp-ts/Either';

import { getBlogBySlug } from '../models/blog';
import { makeHeadMetaAndTitle, defaultConfig, cvConfig, aboutConfig, blogConfig } from '../../src/common/head';

export async function makeHead(path: string, slug?: string): Promise<string> {
    console.log('make head path', path);
    console.log('make head slug', slug);

    if (path.startsWith('/blog')) {
        if (slug) {
            const post = await getBlogBySlug(slug);
            if (isRight(post)) {
                const config = post.right.frontMatter;
                return makeHeadMetaAndTitle(config);
            }
        }
        return makeHeadMetaAndTitle(blogConfig.ru);
    } else if (path.startsWith('/about/cv')) {
        // TODO resolve translation
        return makeHeadMetaAndTitle(cvConfig.ru);
    } else if (path.startsWith('/about')) {
        return makeHeadMetaAndTitle(aboutConfig.ru);
    }
    return makeHeadMetaAndTitle(defaultConfig.ru);
}

