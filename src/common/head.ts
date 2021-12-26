// we import it here because this file is using in server
import * as APP from '../../types/app';
import * as HEAD from '../../types/head';
import * as BLOG from '../../types/blog';

export const defaultConfig: APP.Translation<HEAD.HeadConfig> = {
    en: {
        title: 'Andrey Parfenov',
        description: 'This is my webapp, written in vue 3 and hosted on digital ocean'
    },
    ru: {
        title: 'Андрей Парфенов',
        description: 'Это моё веб приложение, написанное на vue 3, которое хостится на digital ocean'
    }
}

export const cvConfig: APP.Translation<HEAD.HeadConfig> = {
    en: {
        title: 'my cv',
        description: 'this is my cv'
    },
    ru: {
        title: 'моё резюме',
        description: 'тут моё резюме'
    }
}

export const aboutConfig: APP.Translation<HEAD.HeadConfig> = {
    en: {
        title: 'about me',
        description: 'information about me'
    },
    ru: {
        title: 'обо мне',
        description: 'информация обо мне'
    }
}

export const blogConfig: APP.Translation<HEAD.HeadConfig> = {
    en: {
        title: 'My blog',
        description: 'Articles about web and linux'
    },
    ru: {
        title: 'Мой блог',
        description: 'Статьи о вебе и линуксе'
    }
}

export function makeHeadMetaAndTitle(config: HEAD.HeadConfig | BLOG.FrontMatter = defaultConfig.ru): string {
    let head = `<title>${config.title}</title>`;
    if (config.description) {
        head += `\n<meta name="description" content="${config.description}">`;
    }
    return head;
}

