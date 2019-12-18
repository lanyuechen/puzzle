/**
 * 加载工作空间
 */
export async function query() {
  await wait(1000);
  return [
    {
      id: '507f1f77bcf86cd799439011',
      title: '表单组件',
      rating: 8.9,
      star: 12,
      download: 5,
      desc: '该表单组件目的在于快速生成表单，其中包含“Form.Item”子组件，该表单组件需要配合Input、Select、Button等组件进行开发，基于antd进行开发',
    },
    {
      id: '507f1f77bcf86cd799439012',
      title: 'form-component',
      rating: 6.1,
      star: 31,
      download: 2,
      desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Not available, a request has not been sent yet. Get the latest and greatest from MDN delivered straight to your inbox.',
    }
  ];
}

export async function comments(id: string) {
  await wait(1000);

  return [
    {
      user: {
        name: '王富贵',
      },
      msg: {
        like: 10,
        dislike: 2,
        content: 'We supply a series .',
      },
      children: [
        {
          user: {
            name: '李安娜',
          },
          msg: {
            like: 14,
            dislike: 0,
            content: 'yes! I can!',
          },
        },
      ],
    },
    {
      user: {
        name: '李安娜',
      },
      msg: {
        like: 109,
        dislike: 5,
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      },
    },
  ];
}

function wait(idle: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, idle);
  });
}