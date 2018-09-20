const helpers = require('../utils/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
  lines.splice(lastImportIndex += 1, 0, "import moment from 'moment';");
  return lines;
}

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      moment: '^2.22.2',
    },
  });
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lineups) => {
      const lines = addAbsoluteImports(lineups);

      lines.reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));

      lines[lastImportIndex] += '\nVue.prototype.$moment = moment;';
      lines.reverse().join('\n');
      return lines;
    });
  });
};
