export default [
  {
    title: '标题组件',
    desc: '展示不同级别的标题。',
    elements: [
      {
        type: 'Typography.Title',
        props: {
          children: 'h1. 标题标题标题',
        },
      },
      {
        type: 'Typography.Title',
        props: {
          level: 2,
          children: 'h2. 标题标题标题',
        },
      },
      {
        type: 'Typography.Title',
        props: {
          level: 3,
          children: 'h3. 标题标题标题',
        },
      },
      {
        type: 'Typography.Title',
        props: {
          level: 4,
          children: 'h4. 标题标题标题',
        },
      },
    ],
  },
  {
    title: '文本组件',
    desc: '内置不同样式的文本。',
    elements: [
      {
        type: 'Typography.Text',
        props: {
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          type: 'secondary',
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          type: 'warning',
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          type: 'danger',
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          disabled: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          mark: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          code: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          underline: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          delete: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          strong: true,
          children: '文本文本文本文本...',
        },
      },
      {
        type: 'Typography.Text',
        props: {
          ellipsis: true,
          children: '单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本单行溢出文本',
        },
      },
    ],
  },
  {
    title: '可交互(todo)',
    desc: '提供可编辑和可复制等额外的交互能力。',
    elements: [
      {
        type: 'Typography.Paragraph',
        props: {
          editable: true,
          children: '可编辑文本可编辑文本...',
        },
      },
      {
        type: 'Typography.Paragraph',
        props: {
          copyable: true,
          children: '可复制文本可复制文本...',
        },
      },
      {
        type: 'Typography.Paragraph',
        props: {
          ellipsis: {
            rows: 3,
            expandable: true,
          },
          children: '多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本多行溢出文本',
        },
      },
    ],
  },
];
