module.exports = [
  {
    type: 'list',
    name: 'i18n',
    message: 'ElementUI i18n options',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'Standard', value: 'standard' },
      { name: 'VueI18n (with i18n cli plugin)', value: 'vuei18n' }
    ],
    default: 'vuei18n',
  },
];
