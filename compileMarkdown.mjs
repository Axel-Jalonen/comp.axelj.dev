import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${escapedText}">${text}</h${level}>`;
  }
};
marked.use({ renderer });
const template = readFileSync('./pages/template.html', 'utf8');
const markdown = readFileSync('README.md', 'utf8');
const content = marked.parse(markdown);
const output = template.replace('<div id="markdown-content"></div>', `<div id="markdown-content">${content}</div>`);
writeFileSync('./pages/read-more.html', output);