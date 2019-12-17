export default [
  {
    title: '基本用法',
    desc: '使用 <Icon /> 标签声明组件，指定图标对应的 type 属性。可以通过 theme 属性来设置不同的主题风格的图标，也可以通过设置 spin 属性来实现动画旋转效果。',
    elements: [
      {
        type: 'Icon',
        props: {
          type: 'home',
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'setting',
          theme: 'filled',
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'smile',
          theme: 'outlined',
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'sync',
          spin: true,
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'smile',
          rotate: 180,
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'loading',
        },
      },
    ],
  },
];