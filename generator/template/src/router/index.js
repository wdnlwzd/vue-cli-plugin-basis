import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/views/auth/Login';
import Index from '@/views/Index';

Vue.use(Router);

const Root = Vue.component('temp', {
  template: '<router-view></router-view>',
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login,
    // },
    {
      path: '/',
      name: 'Root',
      // component: Root,
      redirect: { name: 'Index2' },
      meta: {},
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index,
          meta: {
            hasSub: false,
            auth: [],
          },
        },
      ],
    },
    {
      path: '/index2',
      name: 'Index2',
      component: Index,
      meta: {
        hasSub: false,
        auth: [],
      },
    },
    {
      path: '/403',
      meta: {
        hidden: true,
      },
      redirect: { name: 'Index' },
      // component: Login,
    },
    {
      path: '*',
      redirect: { name: 'Index' },
    },
  ],
});
