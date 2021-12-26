import fs from 'fs-extra';
import path from 'path';
import { markdownLibrary, frontMatter } from '../services/markdown.js';

const CACHE_FILE = path.resolve('./server/cache/cache.json');
const DIR_PATH = path.resolve('./server/md');

function buildCache() {
    const dir = fs.readdirSync(DIR_PATH);
    let jsonList = [];
    for(let file of dir) {
        const content = fs.readFileSync(path.resolve(DIR_PATH, file), 'utf-8');
        const md = markdownLibrary.render(content);
        const json = {
            frontMatter,
            content: md
        }
        jsonList.push(json);
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(jsonList, null, 2));
}

buildCache();