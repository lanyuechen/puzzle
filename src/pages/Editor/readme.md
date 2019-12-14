## PUZZLE

### Puzzle

| props | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| data | any | [组件描述对象](#组件描述对象) | - | 否 |
| parentProps | any | 父组件的props，用来实现组件的封装，使父组件的属性传递给子组件 | - | 否 |
| path | array | 组件在根组件中的索引 | [] | 否 |
| onChange | function(path, data) | 组件内容变化回调 | - | 是 |
| onClick | function(path) | 组件单击事件回调 | - | 是 |

### Dragger

| props | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | `container`: 容器，`element`: 组件 | container | 是 |
| data | 同Puzzle |
| path | 同Puzzle |
| onChange | 同Puzzle |
| onClick | 同Puzzle |

### 组件描述对象

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | 组件类型，可以为antd组件或html标签 | - | 是 |
| ref | array | 组件的引用目录，如果存在ref，表明该组件为引用组件，这时type为复合组件的类名(生成代码时需要) | - | 否 |
| props | object | 组件props属性，同react组件的props | - | 否 |
| children | array | 子组件 | - | 否 |

props中的属性值可以指定格式化字符串，解析后返回真实的值

| 格式化字符串 | 描述 |
| ---- | ---- |
| props.xxx | 组件在解析时会根据该格式化字符串描述，将父组件的`xxx`属性传递给该组件，即为该属性值 |

> 注：如果data为`null`、`false`、`undefined`，则直接输出`null`；如果data为`string`，则输出`字符串组件`
