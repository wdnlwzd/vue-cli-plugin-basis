const updateMain = require('./main');

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
    },
    devDependencies: {

    },
  });

  api.render('./template');

  api.postProcessFiles(files => {
    // update main.js
    updateMain(api, opts, files);
  });
}
