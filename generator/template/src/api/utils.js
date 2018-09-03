import Vue from 'vue';
import VueResource from 'vue-resource';
import { Message } from 'element-ui';

Vue.use(VueResource);

function access(url, param, method) {
  /* eslint-disable no-param-reassign */
  param = param || {};
  if (window.location.search.indexOf('debug') > -1) {
    param.debug = true;
  }

  let ret = null;
  const upperMethod = method.toUpperCase();
  /* eslint-disable no-underscore-dangle */
  const __randNum = Math.random();
  if (upperMethod === 'POST') {
    ret = Vue.http.post(url, param, { params: { __randNum } });
  } else if (upperMethod === 'PUT') {
    ret = Vue.http.put(url, param, { params: { __randNum } });
  } else if (upperMethod === 'DELETE') {
    ret = Vue.http.delete(url, { params: { ...param, __randNum } });
  } else {
    ret = Vue.http.get(url, { params: { ...param, __randNum } });
  }
  return ret.then((res) => {
    // console.log('res', res);
    // console.log('res.body', res.body);
    if (res.body.ok) {
      return res.body;
    }

    // 注意：成功时，返回的是body数据；失败时, 返回的是res，为了保证与http请求错误的返回值一致
    return Promise.reject(res);
  }, (res) => {
    // if (res.status !== 404) {
    //   Message.error({
    //     message: res.body,
    //   });
    // }

    if (res.status === 401) {
      Message.error('您无权访问该页面');
    } else if (res.status === 403) {
      Message.error('禁止访问');
    } else if (res.status === 404) {
      Message.error('您访问的页面不存在了');
    } else if (res.status === 500) {
      Message.error('服务器出了一点问题，请联系管理员');
    }

    // 重新抛出，以便于后面链式处理
    return Promise.reject(res);
  });
}

export default {
  get(url, param) {
    return access(url, param, 'get');
  },
  delete(url, param) {
    return access(url, param, 'delete');
  },
  post(url, param) {
    return access(url, param, 'post');
  },
  put(url, param) {
    return access(url, param, 'put');
  },
};
