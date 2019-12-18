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
  {
    title: '多色图标',
    desc: '可以通过设置 theme 属性为 twoTone 来渲染双色图标，并且可以设置主题色。',
    elements: [
      {
        type: 'Icon',
        props: {
          type: 'smile',
          theme: 'twoTone',
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'heart',
          theme: 'twoTone',
          twoToneColor: '#eb2f96'
        },
      },
      {
        type: 'Icon',
        props: {
          type: 'check-circle',
          theme: 'twoTone',
          twoToneColor: '#52c41a'
        },
      },
    ],
  },
  {
    title: '自定义图标(todo)',
    desc: '利用 Icon 组件封装一个可复用的自定义图标。可以通过 component 属性传入一个组件来渲染最终的图标，以满足特定的需求',
    elements: [
      {
        type: 'Icon',
        props: {
          type: 'heart'
        },
      },
    ],
  },
  {
    title: '使用 iconfont.cn(todo)',
    desc: '对于使用 iconfont.cn 的用户，通过设置 createFromIconfontCN 方法参数对象中的 scriptUrl 字段， 即可轻松地使用已有项目中的图标。',
    elements: [
      {
        type: 'Icon',
        props: {
          type: 'heart'
        },
      },
    ],
  },
];
