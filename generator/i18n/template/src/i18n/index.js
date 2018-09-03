import Vue from 'vue';
import elEnLocale from 'element-ui/lib/locale/lang/en';
import elZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import VueI18n from 'vue-i18n';
import locales from './locales';

Vue.use(VueI18n);

// 从locales里把各个语言的单独分出来
const getLocale = (lang, lcs) => {
  let locale = {};

  // 是需要筛选的这一层, 只拿一个key值
  if (Object.prototype.hasOwnProperty.call(lcs, lang)) {
    locale = lcs[lang];
  } else {
    Object.keys(lcs).forEach((key) => {
      locale[key] = getLocale(lang, lcs[key]);
    });
  }
  return locale;
};


const enLocale = Object.assign({}, getLocale('en', locales), elEnLocale);
const zhLocale = Object.assign({}, getLocale('zh', locales), elZhLocale);
const messages = {
  en: enLocale,
  zh: zhLocale,
};

export default new VueI18n({
  locale: 'zh',
  messages,
});
