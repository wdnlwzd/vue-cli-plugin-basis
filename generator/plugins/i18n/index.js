const helpers = require('../../tools/helpers');


function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));

  lines.splice(lastImportIndex += 1, 0, `import locale from 'element-ui/lib/locale';`);
  lines.splice(lastImportIndex += 1, 0, `import zhLang from 'element-ui/lib/locale/lang/zh-CN';`);
  lines.splice(lastImportIndex += 1, 0, `import enLang from 'element-ui/lib/locale/lang/en';`);

  return lines;
}

function addLocale(rootOptions, lines, lastImportIndex) {
  lines[lastImportIndex] += `\n`;
  lines[lastImportIndex] +=`
Vue.prototype.$locale = {
  use(lang) {
    i18n.locale = lang;
    locale.use(lang === 'zh-CN' ? zhLang : enLang);
  },
  current() {
    return i18n.locale;
  },
};
`;
  lines[lastImportIndex] += `\ni18n.locale = localStorage.getItem('${rootOptions.projectName.toUpperCase()}_LANGUAGE') || 'zh-CN';`;
  lines[lastImportIndex] += `\nlocale.use(i18n.locale === 'zh-CN' ? zhLang : enLang);`;
  return lines;
}

module.exports = (api, options, rootOptions) => {
  api.render('./template');
  api.extendPackage({
    dependencies: {
      'vue-i18n': '^8.0.0',
    }
  });
  api.injectImports(api.entryFile, `import i18n from './i18n';`);
  api.injectRootOptions(api.entryFile, `i18n`);
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, lines => {
      lines = addAbsoluteImports(lines);
      lines.reverse();
      let lastImportIndex = lines.findIndex(line => line.match(/^import/));
      addLocale(rootOptions, lines, lastImportIndex);
      lines.reverse().join('\n');
      return lines;
    });
  });
}
