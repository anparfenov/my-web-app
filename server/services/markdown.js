const MarkdownIt = require('markdown-it');
const  MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownItFrontMatter = require('markdown-it-front-matter');
const jsYaml = require('js-yaml');

let frontMatter = null;

// NOTE: maybe i should use promise
let getFrontMatter = () => frontMatter;

let markdownLibrary = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
}).use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink(),
}).use(MarkdownItFrontMatter, (_fm) => {
    frontMatter = jsYaml.load(_fm);
});

module.exports = {
    getFrontMatter,
    markdownLibrary
}
