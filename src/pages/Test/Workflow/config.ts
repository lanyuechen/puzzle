export const demo = {
  name: 'test',
  desc: 'desc',
  foo: {
    bar: {
      value: 'foobar'
    }
  }
}

export default [
  {
    step: '安装前须知',
    work: [
      {
        path: 'name',
        rules: [
          'required|名称不能为空',
          'pattern|\d{6}|格式不正确',
        ],
      },
      {
        path: 'foo.bar.value',
        type: 'input',
        placeholder: 'foo.bar.value',
        label: '数值',
        disabled: [
          'name|===|"foo"'
        ],
        show: [
          'name|!==|"bar"'
        ],
        linkage: [
          {
            condition: 'name|===|"xxx"',
            value: 'linkage'
          }
        ]
      }
    ]
  },
  {
    step: 'step2',
    work: [
      {
        path: 'desc'
      }
    ]
  }
]