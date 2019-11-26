export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: './Home',
  },
  {
    path: '/editor',
    name: 'editor',
    icon: 'edit',
    component: './Editor',
  },
  {
    path: '/test',
    name: 'test',
    icon: 'smile',
    component: './Test',
  },
  {
    component: './404',
  },
];
