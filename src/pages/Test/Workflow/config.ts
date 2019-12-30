export default [
  {
    step: '安装须知',

  },
  {
    step: '安装方式',
    work: [
      {
        path: '$isAllInOne',
        label: '是否混合部署',
        type: 'switch',
      },
    ]
  },
  {
    step: '机器列表',
    work: [
      {
        path: 'machines',
        label: '机器列表',
        type: 'list',
        work: [
          {
            path: 'name',
            type: 'input',
          },
          {
            path: 'ips',
            type: 'list',
            work: [
              {
                path: '',
                type: 'input',
                disabled: [
                  'machines.0.name|===|"foo"'
                ],
                rules: [
                  'pattern|/^(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])$/|ip格式错误'
                ]
              },
            ],
          },
          {
            path: 'tags',
            type: 'multi-select',
            options: [
              'k8s-master',
              'k8s-worker|xxxx',
              'ceph',
            ],
          },
        ],
      },
    ]
  },
  // {
  //   step: '安装前须知',
  //   work: [
  //     {
  //       path: 'name',
  //       rules: [
  //         'required|名称不能为空',
  //         'pattern|\\d{6}|格式不正确',
  //       ],
  //     },
  //     {
  //       path: 'foo.bar.value',
  //       type: 'input',
  //       placeholder: 'foo.bar.value',
  //       label: '数值',
  //       disabled: [
  //         'name|===|"foo"'
  //       ],
  //       show: [
  //         'name|!==|"bar"'
  //       ],
  //       linkage: [
  //         {
  //           condition: 'name|===|"xxx"',
  //           value: 'linkage'
  //         }
  //       ]
  //     }
  //   ]
  // },
]

export const demo = {
  "diamondName": "test",
  "advertiseAddr": "http://2.2.2.2:8008",
  "machines": [
    {
      "name": "C-001",
      "ips": [
        "1.1.1.1"
      ],
      "tags": [
        "k8s-master"
      ],
      "manual": {
        "ipAddresses": [
          "1.1.1.1"
        ],
        "user": "ubuntu"
      }
    },
    {
      "name": "C-003",
      "ips": [
        "2.2.2.2"
      ],
      "manual": {
        "ipAddresses": [
          "3.3.3.3"
        ],
        "user": "ubuntu"
      }
    }
  ],
}