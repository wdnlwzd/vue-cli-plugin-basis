const helpers = require('../tools/helpers');

module.exports = (api, opts, files) => {
  api.extendPackage({
    dependencies: {
      'vue-hamlet': 'github:yimian/vue-hamlet#v1.0.2',
    }
  });
  api.injectImports(api.entryFile, `import auth from '@/hamlet';`);
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, lines => {
      lines.reverse();
      let lastImportIndex = lines.findIndex(line => line.match(/^import/));
      lines[lastImportIndex] += `\n`;
      lines[lastImportIndex] += `
// console.log('process.env.APP_KEY', process.env.APP_KEY);
Vue.use(auth, {
  appKey: process.env.APP_KEY,
  // authRedirect: '/login',
  allowThirdpartyLogin: true,

  // get userinfo from own api
  // fetchUser: '/api/common/users/me',
});
`;
      lines.reverse().join('\n');
      return lines;
    });
  });
};
