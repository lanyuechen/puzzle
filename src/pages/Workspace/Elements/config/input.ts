export default [
  {
    title: '基本使用',
    desc: '基本使用',
    elements: [
      {
        type: 'Input',
        props: {
          placeholder: '基本使用',
        },
      },
    ],
  },
  {
    title: '三种大小',
    desc: '我们为 <Input /> 输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。',
    elements: [
      {
        type: 'Input',
        props: {
          size: 'large',
          placeholder: 'large size',
        },
      },
      {
        type: 'Input',
        props: {
          placeholder: 'default size',
        },
      },
      {
        type: 'Input',
        props: {
          size: 'small',
          placeholder: 'small size',
        },
      },
    ],
  },
  {
    title: '前置/后置标签(todo)',
    desc: '用于配置一些固定组合。',
    elements: [
      {
        type: 'Input',
        props: {
          addonBefore: 'https://',
          addonAfter: '.com',
          defaultValue: 'mysite',
        },
      },
    ],
  },
  {
    title: '搜索框',
    desc: '带有搜索按钮的输入框。',
    elements: [
      {
        type: 'Input.Search',
        props: {
          placeholder: 'input search text',
        },
      },
      {
        type: 'Input.Search',
        props: {
          placeholder: 'input search text',
          enterButton: true,
        },
      },
      {
        type: 'Input.Search',
        props: {
          placeholder: 'input search text',
          enterButton: 'Search',
        },
      },
      {
        type: 'Input.Search',
        props: {
          placeholder: 'input search with loading',
          loading: true,
        },
      },
    ],
  },
  {
    title: '输入框组合',
    desc: '输入框的组合展现。注意：使用 compact 模式时，不需要通过 Col 来控制宽度。',
    elements: [
      {
        type: 'Input.Group',
        children: [
          {
            type: 'Row',
            props: {
              gutter: 8,
            },
            children: [
              {
                type: 'Col',
                props: {
                  span: 5,
                },
                children: [
                  {
                    type: 'Input',
                    props: {
                      defaultValue: '0571',
                    },
                  },
                ],
              },
              {
                type: 'Col',
                props: {
                  span: 8,
                },
                children: [
                  {
                    type: 'Input',
                    props: {
                      defaultValue: '26888888',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'Input.Group',
        props: {
          compact: true,
        },
        children: [
          {
            type: 'Input',
            props: {
              defaultValue: '0571',
              style: {
                width: '20%',
              },
            },
          },
          {
            type: 'Input',
            props: {
              defaultValue: '26888888',
              style: {
                width: '30%',
              },
            },
          },
        ],
      },
      {
        type: 'Input.Group',
        props: {
          compact: true,
        },
        children: [
          {
            type: 'Input',
            props: {
              defaultValue: 'input content',
            },
          },
          {
            type: 'DatePicker',
          },
        ],
      },
    ],
  },
  {
    title: '文本域',
    desc: '用于输入多行文本。',
    elements: [
      {
        type: 'Input.TextArea',
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    title: '适应文本高度的文本域',
    desc: 'autoSize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autoSize 可以设定为一个对象，指定最小行数和最大行数。',
    elements: [
      {
        type: 'Input.TextArea',
        props: {
          placeholder: 'Autosize height with minimum and maximum number of lines',
          autoSize: { 
            minRows: 2, 
            maxRows: 6,
          },
        },
      },
    ],
  },
  {
    title: '密码框',
    desc: '密码框',
    elements: [
      {
        type: 'Input.Password',
        props: {
          placeholder: 'input password',
        },
      },
    ],
  },
  {
    title: '前缀和后缀',
    desc: '在输入框上添加前缀或后缀图标。',
    elements: [
      {
        type: 'Input',
        props: {
          placeholder: 'input something',
          prefix: '￥',
          suffix: 'RMB',
        },
      },
    ],
  },
  {
    title: '带移除图标',
    desc: '带移除图标的输入框，点击图标删除所有内容。',
    elements: [
      {
        type: 'Input',
        props: {
          placeholder: 'input something',
          allowClear: true,
        },
      },
    ],
  },
];
