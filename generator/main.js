const helpers = require('./tools/helpers');

function addAbsoluteImports(api) {
  helpers.updateFile(api, api.entryFile, lines => {
    let importIndex = lines.findIndex(line => line.match(/^import Vue/));

    lines.splice(importIndex += 1, 0, `import Element from 'element-ui';`);
    lines.splice(importIndex += 1, 0, `import 'element-ui/lib/theme-chalk/index.css';`);
    lines.splice(importIndex += 1, 0, `import locale from 'element-ui/lib/locale';`);
    lines.splice(importIndex += 1, 0, `import zhLang from 'element-ui/lib/locale/lang/zh-CN';`);
    lines.splice(importIndex += 1, 0, `import enLang from 'element-ui/lib/locale/lang/en';`);
    lines.splice(importIndex += 1, 0, `import moment from 'moment';`);

    return lines;
  });
}

module.exports = (api, opts = {}) => {
  addAbsoluteImports(api);

  helpers.updateFile(api, api.entryFile, lines => {
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
    lines[lastImportIndex] += `\nVue.prototype.$moment = moment;`;
    lines[lastImportIndex] += `\nVue.prototype.$consts = consts;`;

    lines.reverse().join('\n');
    return lines;
  });
}
