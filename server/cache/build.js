const fs = require('fs-extra');
const path = require('path');
const { markdownLibrary, getFrontMatter } = require('../services/markdown.js');

const CACHE_FILE = path.resolve(__dirname, 'cache.json');
const DIR_PATH = path.resolve(__dirname, '../md');

function buildCache() {
    if (!fs.existsSync(DIR_PATH)) {
        fs.mkdir(DIR_PATH);
    }
    try {
        const dir = fs.readdirSync(DIR_PATH);
        let jsonList = [];
        for(let file of dir) {
            const content = fs.readFileSync(path.resolve(DIR_PATH, file), 'utf-8');
            const md = markdownLibrary.render(content);
            const json = {
                frontMatter: getFrontMatter(),
                content: md
            }
            jsonList.push(json);
        }
        fs.writeFileSync(CACHE_FILE, JSON.stringify(jsonList, null, 2));
    } catch {
        // noop
    }
}

buildCache();
