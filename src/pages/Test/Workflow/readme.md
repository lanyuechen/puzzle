## Workflow

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| [path](#path) | string | 属性路径 | - | - |
| [type](#type) | string | 表单项类型 | input | - |
| [options](#options) | array | 当type为`select`、`radio`等类型时表单的选择项 | - | - |
| label | string | 表单项标题，如果该属性不存在，则使用`path`作为标题 | - | - |
| placeholder | string | 表单项placeholder | - | - |
| [disabled](#disabled) | [condition](#condition) | 表单项禁用条件 | false | - |
| [show](#show) | [condition](#condition) | 表单项显示条件 | true | - |
| [linkage](#linkage) | array | 表单项关联设置 | - | - |
| [rules](#rules) | valid rules | 表单项验证规则设置 | - | - |
| work | array | 表单定义数组，当type为`容器组件`时有效，表示子表单 | - | - |

### path

`path`用于定位某属性在结果对象中所处的位置，例如`foo.bars.1.name`表示`result.foo.bars[1].name`。

⚠️注意：
- 在`list`等`容器组件`中嵌套的子级`表单组件`时，`path`属性使用相对路径，这是因为`list`组件支持表单的动态调整(新增、删除)，因此绝对路径需要根据数据进行动态拼接，所以只能使用相对路径。
- `path`属性可以为空，这种情况一般只用在`list`组件下，将子组件的值直接赋予数组(而不是数组元素的某一属性)，这种用法可以使用多选、标签等方式取代。

具体可以参考demo。

### type

#### 容器组件

- list

#### 输入框

- input
- number

#### 开关

- switch

#### 多选

- multi-select
- checkbox-button(暂未实现)

#### 单选

- select
- radio-button

### options

```js
options = ['foo', 'bar'];
options = ['foo|选项1', 'bar|选项2'];
```

### disabled

当判定条件为真时，禁用该表单项

### show

- 当show不存在时，显示该表单项
- 当show存在，且判定条件为真时，显示该表单项

### linkage

`linkage`为一个数组，包括判定条件(condition)和值(value)，当判定条件为真时，则该表单被设置为value指定的值（只有在相关条件改变时才会触发该表单的变化，也就是该值被重置后，你仍旧可以修改该表单项的值）

```js
linkage = [
  {
    condition: 'xxx',
    value: 'foo'
  }
]
```

### rules

表单验证规则，验证失败则会提示相关信息
```js
rules = [
  'required|该字段是必须的'
];
rules = 'pattern|/^\\d{6}/|该字段格式不正确';
```

### condition

判定条件分为几种情况:

1. 可以单独指定条件或者以数组的方式，如果是数组方式，数组中所有条件为`And`的关系

```js
disabled = 'foo.bar|===|"bar"';
show = [
  'foo.bar|>|10',
  'foo.bar|<|100',
]
```

format string \| func string
