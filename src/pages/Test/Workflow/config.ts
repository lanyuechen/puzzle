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
                label: 'ip',
                type: 'input',
                rules: 'pattern|/^(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1}|[1-9]{1}\\d{1}|1\\d\\d|2[0-4]\\d|25[0-5])$/|ip格式错误',
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
        show: 'storage.ceph.$enable: storage.ceph.$enable',
      },
      {
        path: 'storage.ceph.clusterNetwork',
        show: 'storage.ceph.$enable: storage.ceph.$enable',
      },
      {
        path: 'storage.ceph.publicNetwork',
        show: 'storage.ceph.$enable: function(){return this.storage.ceph.$enable}',
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
        disabled: 'storage.ceph.$enable: !storage.ceph.$enable',
        linkage: [
          {
            condition: 'storage.ceph.$enable: !storage.ceph.$enable',
            value: 'dynamicLPV'
          }
        ]
      },
    ],
  },
  {
    step: 'OSS',
    work: [
      {
        path: 'oss.receiverEmail',
        placeholder: 'diamond@sensetime.com',
      },
      {
        path: 'oss.smtpAuthUsername',
        placeholder: 'alertmanager',
      },
      {
        path: 'oss.smtpAuthPassword',
        placeholder: 'password',
      },
      {
        path: 'oss.smtpFrom',
        placeholder: 'alertmanager@example.org',
      },
      {
        path: 'oss.smtpSmarthost',
        placeholder: 'localhost:25',
      },
    ]
  },
  {
    step: 'kubernetes',
    work: [
      {
        path: 'kubernetes.k8sHAMode',
        type: 'radio-button',
        options: [ 'enable', 'disable' ],
      },
      {
        path: 'kubernetes.k8sWorkerNums',
        type: 'number',
        placeholder: '0',
      },
      {
        path: 'kubernetes.etcdDataDir',
        placeholder: 'password',
      },
      {
        path: 'kubernetes.kubeletRootDir',
        placeholder: '/var/lib/kubelet',
      },
    ]
  },
  {
    step: 'docker',
    work: [
      {
        path: 'docker.insecureRegistry',
        type: 'list',
        work: [
          {
            placeholder: 'insecureRegistry',
          },
        ],
      },
      {
        path: 'docker.graph',
        placeholder: '/var/lib/docker',
      },
      {
        path: 'docker.logOptMaxSize',
        placeholder: '100m',
      },
      {
        path: 'docker.logOptMaxFile',
        type: 'number',
        placeholder: '5',
      },
    ]
  },
  {
    step: 'pharos',
    work: [
      {
        path: 'pharos.metrics.pharosMetrics',
        type: 'radio-button',
        options: ['enable', 'disable'],
      },
      {
        path: 'pharos.metrics.mongodbSize',
        type: 'number',
        placeholder: '100',
        show: 'pharos.metrics.pharosMetrics: pharos.metrics.pharosMetrics === "enable"'
      },
      {
        path: 'pharos.metrics.mongodbReplicas',
        type: 'number',
        placeholder: '3',
        show: 'pharos.metrics.pharosMetrics: pharos.metrics.pharosMetrics === "enable"'
      },
      {
        path: 'pharos.log.pharosLog',
        type: 'radio-button',
        options: ['enable', 'disable'],
        disabled: 'pharos.metrics.pharosMetrics: pharos.metrics.pharosMetrics === "disable"',
        linkage: [
          {
            condition: 'pharos.metrics.pharosMetrics: pharos.metrics.pharosMetrics === "disable"',
            value: 'disable',
          },
        ],
      },
      {
        path: 'pharos.log.elasticsearchSize',
        type: 'number',
        placeholder: '100',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
      {
        path: 'pharos.log.elasticsearchMemory',
        type: 'number',
        placeholder: '8',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
      {
        path: 'pharos.log.elasticsearchReplicas',
        type: 'number',
        placeholder: '3',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
      {
        path: 'pharos.log.kafkaSize',
        type: 'number',
        placeholder: '100',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
      {
        path: 'pharos.log.kafkaMemory',
        type: 'number',
        placeholder: '8',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
      {
        path: 'pharos.log.kafkaReplicas',
        type: 'number',
        placeholder: '3',
        show: 'pharos.log.pharosLog: pharos.log.pharosLog === "enable"',
      },
    ]
  },
  {
    step: 'gpu',
    work: [
      {
        path: 'gpu.nvidiaDriverVersion',
        type: 'radio-button',
        options: ['384.183-1', '410.129-1'],
      },
      {
        path: 'gpu.virtualGPU',
        type: 'radio-button',
        options: ['enable', 'disable'],
        disabled: 'gpu.nvidiaDriverVersion: gpu.nvidiaDriverVersion === "384.183-1"',
        linkage: [
          {
            condition: 'gpu.nvidiaDriverVersion: gpu.nvidiaDriverVersion === "384.183-1"',
            value: 'disable',
          },
        ],
      },
      {
        path: 'gpu.vGPUS',
        type: 'number',
        placeholder: '4',
        disabled: 'gpu.nvidiaDriverVersion: gpu.nvidiaDriverVersion === "384.183-1"',
      },
    ],
  },
  {
    step: 'diamond',
    work: [
      {
        path: 'diamond.diamondDNS',
        type: 'radio-button',
        options: ['enable', 'disable'],
      },
      {
        path: 'diamond.upstreamDNS',
        placeholder: '8.8.8.8',
      },
      {
        path: 'diamond.offlineDockerRegistry',
        type: 'radio-button',
        options: ['enable', 'disable'],
      },
      {
        path: 'diamond.enableServices',
        type: 'switch',
      },
      {
        path: 'diamond.diamondNTP',
        type: 'radio-button',
        options: ['enable', 'disable'],
      },
      {
        path: 'diamond.upstreamNtpServer',
        type: 'list',
        work: [
          {
            placeholder: 'upstreamNtpServer',
          },
        ],
      },
      {
        path: 'diamond.authentication.installIAM',
        type: 'radio-button',
        options: ['enable', 'disable'],
      },
      {
        path: 'diamond.authentication.mysql',
        show: 'diamond.authentication.installIAM: diamond.authentication.installIAM === "enable"',
      },
      {
        path: 'diamond.authentication.host',
        show: 'diamond.authentication.installIAM: diamond.authentication.installIAM === "enable"',
      },
      {
        path: 'diamond.authentication.port',
        type: 'number',
        show: 'diamond.authentication.installIAM: diamond.authentication.installIAM === "enable"',
      },
      {
        path: 'diamond.authentication.user',
        show: 'diamond.authentication.installIAM: diamond.authentication.installIAM === "enable"',
      },
      {
        path: 'diamond.authentication.password',
        show: 'diamond.authentication.installIAM: diamond.authentication.installIAM === "enable"',
      },
    ],
  },
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