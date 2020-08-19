export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/form/base' },
      { path: '/drop', component: '@/pages/form/drop' },
      { path: '/linkage', component: '@/pages/form/linkage' },
      { path: '/layout', component: '@/pages/form/layout' },
    ],
  },
];
