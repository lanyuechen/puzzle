export default [
  {
    title: '基本结构(todo)',
    desc: '典型的页面布局。',
    elements: [
      {
        type: 'Layout',
        children: [
          {
            type: 'Layout.Header',
            props: {
              children: 'Header',
            },
          },
          {
            type: 'Layout.Content',
            props: {
              children: 'Content',
            },
          },
          {
            type: 'Layout.Footer',
            props: {
              children: 'Footer',
            },
          },
        ],
      },
      {
        type: 'Layout',
        children: [
          {
            type: 'Layout.Header',
            props: {
              children: 'Header',
            },
          },
          {
            type: 'Layout',
            children: [
              {
                type: 'Layout.Sider',
                props: {
                  children: 'Sider',
                },
              },
              {
                type: 'Layout.Content',
                props: {
                  children: 'Content',
                },
              },
            ],
          },
          {
            type: 'Layout.Footer',
            props: {
              children: 'Footer',
            },
          },
        ],
      },
      {
        type: 'Layout',
        children: [
          {
            type: 'Layout.Header',
            props: {
              children: 'Header',
            },
          },
          {
            type: 'Layout',
            children: [
              {
                type: 'Layout.Content',
                props: {
                  children: 'Content',
                },
              },
              {
                type: 'Layout.Sider',
                props: {
                  children: 'Sider',
                },
              },
            ],
          },
          {
            type: 'Layout.Footer',
            props: {
              children: 'Footer',
            },
          },
        ],
      },
      {
        type: 'Layout',
        children: [
          {
            type: 'Layout.Sider',
            props: {
              children: 'Sider',
            },
          },
          {
            type: 'Layout',
            children: [
              {
                type: 'Layout.Header',
                props: {
                  children: 'Header',
                },
              },
              {
                type: 'Layout.Content',
                props: {
                  children: 'Content',
                },
              },
              {
                type: 'Layout.Footer',
                props: {
                  children: 'Footer',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
