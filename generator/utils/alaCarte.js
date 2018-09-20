const helpers = require('./helpers');

function addDependencies(api) {
  api.extendPackage({
    devDependencies: {
      'babel-plugin-transform-imports': '^1.5.0',
      stylus: '^0.54.5',
      'stylus-loader': '^3.0.2',
    },
  });
}

/* eslint-disable no-template-curly-in-string */
function updateBabelConfig(api) {
  helpers.updateBabelConfig(api, (cfg) => {
    if (!cfg.plugins) {
      cfg.plugins = [];
    }

    // Prevent duplication
    for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
      const temp = cfg.plugins[i];
      if (temp[0] === 'transform-imports' && temp[1] && temp[1].vuetify) {
        const { vuetify } = temp[1];
        if (vuetify.transform === 'vuetify/es5/components/${member}' && vuetify.preventFullImport) {
          return cfg;
        }
      }
    }

    cfg.plugins.push([
      'transform-imports',
      {
        vuetify: {
          transform: 'vuetify/es5/components/${member}',
          preventFullImport: true,
        },
      },
    ]);

    return cfg;
  });


  helpers.updateFile(api, './babel.config.js', (lines) => {
    const index = lines.findIndex(line => line.indexOf('vuetify/es5/components/${member}') !== -1);
    index && (lines[index] += ' // eslint-disable-line no-template-curly-in-string');
    return lines;
  });
}

module.exports = {
  addDependencies,
  updateBabelConfig,
};
