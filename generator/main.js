module.exports = (api, opts, files) => {
  const file = files['src/main.ts']
    ? 'src/main.ts'
    : 'src/main.js';
  const mainJS = files[file];

  if (mainJS) {
    // inject import for registerServiceWorker script into mainJS.js
    let lines = mainJS.split(/\r?\n/g).reverse();
    let lastImportIndex = lines.findIndex(line => line.match(/^import/));

    lines[lastImportIndex] += `\nimport Element from 'element-ui'`;
    lines[lastImportIndex] += `\n`;
    lines[lastImportIndex] += `\nVue.use(Element)`;

    files['src/main.js'] = lines.reverse().join('\n');
  }
}
