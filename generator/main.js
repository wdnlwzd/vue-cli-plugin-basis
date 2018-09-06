const helpers = require('./tools/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));

  lines.splice(lastImportIndex += 1, 0, `import Element from 'element-ui';`);
  lines.splice(lastImportIndex += 1, 0, `import 'element-ui/lib/theme-chalk/index.css';`);

  return lines;
}

module.exports = (api) => {

  helpers.updateFile(api, api.entryFile, lines => {
    lines = addAbsoluteImports(lines);
    lines.reverse();
    let lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += `\n`;
    lines[lastImportIndex] += `\nVue.use(Element);`;
    lines[lastImportIndex] += `\n`;
    lines[lastImportIndex] += `\nVue.router = router;`;
    lines[lastImportIndex] += `\nVue.store = store;`;
    lines[lastImportIndex] += `\n`;

    // prototype
    lines[lastImportIndex] += `\nVue.prototype.$api = API;`;
    // lines[lastImportIndex] += `\nVue.prototype.$message = Message;`;
    // lines[lastImportIndex] += `\nVue.prototype.$msgbox = MessageBox;`;
    // lines[lastImportIndex] += `\nVue.prototype.$notify = Notification;`;
    lines[lastImportIndex] += `\nVue.prototype.$consts = consts;`;

    lines.reverse().join('\n');
    return lines;
  });
}
