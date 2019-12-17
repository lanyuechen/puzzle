export default [
  {
    title: '按钮类型',
    desc: '按钮有五种类型：主按钮、次按钮、虚线按钮、危险按钮和链接按钮。主按钮在同一个操作区域最多出现一次。',
    elements: [
      {
        type: 'Button',
        props: {
          children: 'Default'
        },
      },
      {
        type: 'Button',
        props: {
          type: 'primary',
          children: 'Primary'
        },
      },
      {
        type: 'Button',
        props: {
          type: 'dashed',
          children: 'Dashed'
        },
      },
      {
        type: 'Button',
        props: {
          type: 'danger',
          children: 'Danger'
        },
      },
      {
        type: 'Button',
        props: {
          type: 'link',
          children: 'Link'
        },
      },
    ],
  },
  {
    title: '图标按钮',
    desc: '当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。',
    elements: [
      {
        type: 'Button',
        props: {
          type: 'primary',
          shape: 'circle',
          icon: 'search',
        },
      },
      {
        type: 'Button',
        props: {
          type: 'primary',
          shape: 'circle',
          children: 'A',
        },
      },
      {
        type: 'Button',
        props: {
          type: 'primary',
          icon: 'search',
          children: 'Search',
        },
      },
      {
        type: 'Button',
        props: {
          icon: 'search',
          shape: 'circle',
        },
      },
      {
        type: 'Button',
        props: {
          icon: 'search',
          children: 'Search',
        },
      },
      {
        type: 'Button',
        props: {
          type: 'dashed',
          icon: 'search',
          shape: 'circle',
        },
      },
      {
        type: 'Button',
        props: {
          type: 'dashed',
          icon: 'search',
          children: 'Search',
        },
      },
    ],
  },
  {
    title: '按钮尺寸',
    desc: '按钮有大、中、小三种尺寸。通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。',
    elements: [
      {
        type: 'Button',
        props: {
          size: 'large',
          children: 'Large',
        },
      },
      {
        type: 'Button',
        props: {
          children: 'Default',
        },
      },
      {
        type: 'Button',
        props: {
          size: 'small',
          children: 'Small',
        },
      },
    ],
  },
];
