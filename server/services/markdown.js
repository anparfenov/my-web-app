import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItFrontMatter from 'markdown-it-front-matter';
import jsYaml from 'js-yaml';

// NOTE: maybe i should use promise
export let frontMatter = null;

export let markdownLibrary = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
}).use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink(),
}).use(MarkdownItFrontMatter, (_fm) => {
    frontMatter = jsYaml.load(_fm);
});
