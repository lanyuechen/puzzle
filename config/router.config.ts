export default [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    path: '/home',
    name: 'home',
    component: './Home',
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: './Workspace',
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
