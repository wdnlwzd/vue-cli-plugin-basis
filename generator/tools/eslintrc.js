const helpers = require('./helpers');

module.exports = api => {
  helpers.updateEslintrc(api, cfg => {
    if (!cfg.rules) {
      cfg.rules = {};
    }

    const rules = cfg.rules;
    // console.log('cfg.rules', rules);
    Object.assign(rules, { 'no-console': 0 });
    Object.assign(rules, { 'no-shadow': 0 });
    Object.assign(rules, { 'max-len': ['error', 120] });
    Object.assign(rules, {
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }],
    });

    return cfg;
  });
}
