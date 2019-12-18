export default [
  {
    title: '基础栅格(todo)',
    desc: '从堆叠到水平排列。使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。',
    elements: [
      {
        type: 'Row',
        children: [
          {
            type: 'Col',
            props: {
              span: 12,
              children: 'col-12'
            },
          },
          {
            type: 'Col',
            props: {
              span: 12,
              children: 'col-12'
            },
          },
        ],
      },
      {
        type: 'Row',
        children: [
          {
            type: 'Col',
            props: {
              span: 8,
              children: 'col-8'
            },
          },
          {
            type: 'Col',
            props: {
              span: 8,
              children: 'col-8'
            },
          },
          {
            type: 'Col',
            props: {
              span: 8,
              children: 'col-8'
            },
          },
        ],
      },
      {
        type: 'Row',
        children: [
          {
            type: 'Col',
            props: {
              span: 6,
              children: 'col-6'
            },
          },
          {
            type: 'Col',
            props: {
              span: 6,
              children: 'col-6'
            },
          },
          {
            type: 'Col',
            props: {
              span: 6,
              children: 'col-6'
            },
          },
          {
            type: 'Col',
            props: {
              span: 6,
              children: 'col-6'
            },
          },
        ],
      },
    ],
  },
];
