const helpers = require('../../utils/helpers');

function addLocale(api, rootOptions, lines, lastImportIndex) {
  lines[lastImportIndex] += '\n';
  lines[lastImportIndex] +=
    `\ni18n.locale = localStorage.getItem('${rootOptions.projectName.toUpperCase()}_LANGUAGE') || 'zh-CN';`;
  return lines;
}

module.exports = (api, opts, rootOptions) => {
  api.render('./template', opts);
  api.extendPackage({
    dependencies: {
      'vue-i18n': '^8.0.0',
    },
  });
  api.injectImports(api.entryFile, "import i18n from './i18n';");
  api.injectRootOptions(api.entryFile, 'i18n');
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lines) => {
      lines.reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));

      addLocale(api, rootOptions, lines, lastImportIndex);
      lines.reverse().join('\n');
      return lines;
    });
  });
};

