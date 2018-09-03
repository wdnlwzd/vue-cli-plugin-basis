const helpers = require('../tools/helpers');

function addLocale(lines, lastImportIndex) {
  lines[lastImportIndex] += `\n`;
  lines[lastImportIndex] +=`
Vue.prototype.$locale = {
  use(lang) {
    i18n.locale = lang;
    locale.use(lang === 'zh' ? zhLang : enLang);
  },
  current() {
    return i18n.locale;
  },
};
`;
  lines[lastImportIndex] += `\ni18n.locale = localStorage.getItem('XXXeXXX_LANGUAGE') || 'zh';`;
  lines[lastImportIndex] += `\nlocale.use(i18n.locale === 'zh' ? zhLang : enLang);`;
  lines[lastImportIndex] += `\n`;
  return lines;
}

module.exports = (api, options) => {
  api.render('./template');
  api.extendPackage({
    dependencies: {
      'vue-i18n': '^8.0.0'
    }
  });

  api.injectRootOptions(api.entryFile, `i18n`);
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, lines => {
      lines.reverse();
      let lastImportIndex = lines.findIndex(line => line.match(/^import/));
      addLocale(lines, lastImportIndex);
      lines.reverse().join('\n');
      return lines;
    });
  });
}
