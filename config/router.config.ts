export default [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/test',
    name: 'test',
    icon: 'smile',
    component: './Test',
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
