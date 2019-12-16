export const test = [
  {
    type: 'Button',
    children: [
      {
        type: 'Button',
        props: {
          children: '按钮'
        },
      },
      {
        type: 'Button',
        props: {
          type: 'primary',
          children: '按钮'
        },
      },
    ],
  },
]

export default [
  {
    type: 'Input',
    block: true,
    props: {
      placeholder: '输入文本'
    }
  },
  {
    type: 'Button',
    props: {
      children: '按钮'
    }
  },
  {
    type: 'Icon',
    props: {
      type: 'smile'
    }
  },
  {
    type: 'Rate',
  },
  {
    type: 'Checkbox',
  },
  {
    type: 'Radio',
  },
  {
    type: 'Switch',
  },
  {
    type: 'Slider',
  },
  {
    type: 'Avatar',
  },
  {
    type: 'Badge',
  },
  {
    type: 'Empty',
    block: true,
  },
  {
    type: 'Tag',
  },
  {
    type: 'Alert',
    block: true,
  },
  {
    type: 'Divider',
    block: true,
  },
  {
    type: 'span',
    props: {
      children: '文本'
    }
  },
  {
    type: 'div',
    children: []
  }
]