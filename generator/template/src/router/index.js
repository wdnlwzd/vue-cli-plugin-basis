import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Index from '@/views/Index.vue';
import Homepage from '@/views/admin/Homepage.vue';

Vue.use(Router);

// const Root = Vue.component('temp', {
//   template: '<router-view></router-view>',
// });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: { name: 'Homepage' },
      meta: {},
      children: [
        {
          path: '/homepage',
          name: 'Homepage',
          component: Homepage,
          meta: {},
        },
      ],
    },
    {
      path: '/403',
      meta: {
        hidden: true,
      },
      // redirect: { name: 'Index' },
      component: Login,
    },
    {
      path: '*',
      redirect: { name: 'Index' },
    },
  ],
});
