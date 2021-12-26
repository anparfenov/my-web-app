import { defineStore } from 'pinia';
import { useBlogStore } from '@/stores/blog';
import { defaultConfig, cvConfig, aboutConfig, blogConfig } from '@/common/head';

export const useHeadStore = defineStore('head', {
    state: (): HEAD.HeadState => {
        return {
            config: defaultConfig.ru
        };
    },
    actions: {
        updateHeadElement(path: string): void {
            if (!import.meta.env.SSR) {
                if (path.startsWith('/blog')) {
                    const slug = path.split('/')[2];
                    if (slug) {
                        const blogStore = useBlogStore();
                        const frontMatter = blogStore.blogPost?.frontMatter;
                        this.config = { title: frontMatter?.title ?? defaultConfig.ru.title, description: frontMatter?.description };
                    } else {
                        this.config = blogConfig.ru;
                    }
                } else if (path.startsWith('/about/cv')) {
                    this.config = cvConfig.ru;
                } else if (path.startsWith('/about')) {
                    this.config = aboutConfig.ru;
                }
                const titleElement = document.querySelector<HTMLTitleElement>('head title')
                if (titleElement) {
                    titleElement.textContent = this.config.title;
                }
                if (this.config.description) {
                    let descriptionElement = document.querySelector<HTMLMetaElement>('head meta[name="description"]');
                    if (!descriptionElement) {
                        const headElement = document.querySelector<HTMLHeadElement>('head');
                        descriptionElement = document.createElement('meta');
                        descriptionElement.setAttribute('name', 'description');
                        if (headElement) {
                            headElement.append(descriptionElement);
                        }
                    }
                    descriptionElement.setAttribute('content', this.config.description);
                }
            }
        }
    },
});
