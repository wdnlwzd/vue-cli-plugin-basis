const injectImports2Main = require('./pre-main');
const updateMain = require('./main');

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
      'vue-resource': '^1.5.1',
    },
    devDependencies: {

    },
  });

  // update main.js
  injectImports2Main(api, opts);

  if (api.invoking) {
    api.postProcessFiles(files => {
      updateMain(api, opts, files);

      // console.log('files', Object.keys(files));
      const needDeleteFiles = ['router', 'store'];
      needDeleteFiles.forEach(name => {
        delete files[`src/${name}.js`];
      });
    });
  }
}
