const localeList = [
  'af-ZA', 'ar', 'bg', 'ca', 'cs-CZ',
  'da', 'de', 'ee', 'el', 'en', 'es',
  'fa', 'fi', 'fr', 'he', 'hu', 'id',
  'it', 'ja', 'ko', 'ku', 'kz', 'lt',
  'lv', 'mn', 'nb-NO', 'nl', 'pl', 'pt-br',
  'pt', 'ro', 'ru-RU', 'sk', 'sl', 'sv-SE',
  'ta', 'th', 'tk', 'tr-TR', 'ua', 'ug-CN',
  'vi', 'zh-CN', 'zh-TW',
];

module.exports = [
  {
    type: 'list',
    name: 'i18n',
    message: 'ElementUI i18n options',
    choices: [
      { name: 'None', value: 'none' },
      // { name: 'Standard', value: 'standard' },
      { name: 'VueI18n (with i18n cli plugin)', value: 'vuei18n' }
    ],
    default: 'vuei18n',
  },
  {
    type: 'confirm',
    name: 'Moment',
    message: `Use moment ? Parse, validate, manipulate, and display dates and times in JavaScript.`
  },
  // {
  //   when: answers => answers.i18n === 'vuei18n',
  //   type: 'checkbox',
  //   name: 'vuei18nLocales',
  //   message: "Select the locales you want to load (default values: 'zh-CN', 'en')",
  //   choices: localeList,
  //   default: [ 'zh-CN', 'en' ],
  // }
];
