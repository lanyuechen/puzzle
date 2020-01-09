export default [
  {
    step: '安装须知',
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
            path: 'manual.ipAddresses',
            label: 'ips',
            type: 'list',
            work: [
              {
                path: '',
                type: 'input',
                disabled: [
                  'machines[0].name|===|"foo"'
                ],
                rules: [
                  'pattern|/^(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])$/|ip格式错误'
                ]
              },
            ],
          },
          {
            path: 'manual.user',
            type: 'input',
          },
          {
            path: 'tags',
            type: 'multi-select',
            options: [
              'k8s-master',
              'k8s-worker|这是k8s-worker',
              'ceph',
            ],
          },
        ],
      },
    ]
  },
  {
    step: 'Storage',
    work: [
      {
        path: 'storage.ceph.$enable',
        type: 'switch',
      },
      {
        path: 'storage.ceph.cephHAMode',
        type: 'radio-button',
        options: [
          'auto',
          'enable',
          'disable',
        ],
        show: 'storage.ceph.$enable|===|true',
      },
      {
        path: 'storage.ceph.clusterNetwork',
        show: 'storage.ceph.$enable|===|true',
      },
      {
        path: 'storage.ceph.publicNetwork',
        show: 'storage.ceph.$enable|===|true',
      },
      {
        path: 'storage.dynamicLPV.dynamicLPVPaths',
      },
      {
        path: 'storage.defaultStorgeClass',
        type: 'radio-button',
        options: [
          'ceph',
          'dynamicLPV'
        ],
        disabled: 'storage.ceph.$enable|===|false',
        linkage: [
          {
            condition: 'storage.ceph.$enable|===|false',
            value: 'dynamicLPV'
          }
        ]
      },
    ],
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
      "manual": {
        "ipAddresses": [
          "3.3.3.3"
        ],
        "user": "ubuntu"
      }
    }
  ],
  "storage": {
    "ceph": {
      "$enable": true,
      "cephHAMode": "auto"
    },
    "defaultStorgeClass": "ceph"
  },
}