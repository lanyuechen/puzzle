export default [
  {
    title: '基本',
    desc: '最简单的用法。',
    elements: [
      {
        type: 'Breadcrumb',
        children: [
          {
            type: 'Breadcrumb.Item',
            props: {
              children: 'Home',
            },
          },
          {
            type: 'Breadcrumb.Item',
            children: [
              {
                type: 'a',
                props: {
                  href: 'javascript:;',
                  children: 'Application Center',
                },
              },
            ],
          },
          {
            type: 'Breadcrumb.Item',
            children: [
              {
                type: 'a',
                props: {
                  href: 'javascript:;',
                  children: 'Application List',
                },
              },
            ],
          },
          {
            type: 'Breadcrumb.Item',
            props: {
              children: 'An Application',
            },
          },
        ],
      },
    ],
  },
];
