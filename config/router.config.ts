export default [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/editor',
    name: 'editor',
    icon: 'edit',
    component: './Editor',
  },
  {
    component: './404',
  },
];
