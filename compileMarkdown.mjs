import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';

const markdown = readFileSync('README.md', 'utf8');
const content = marked.parse(markdown);
const template = readFileSync('./pages/template.html', 'utf8');
const output = template.replace('<div id="markdown-content"></div>', `<div id="markdown-content">${content}</div>`);
writeFileSync('./pages/read-more.html', output);