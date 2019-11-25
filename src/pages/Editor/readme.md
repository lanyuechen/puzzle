## PUZZLE

### Puzzle

| props | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| data | any | [组件描述对象](#组件描述对象) | - | 否 |
| path | array | 组件在根组件中的索引 | [] | 否 |
| currentPath | 当前选中的组件 | undefined | 否 |
| onChange | function(path, data) | 组件内容变化回调 | - | 是 |
| onClick | function(path) | 组件单击事件回调 | - | 是 |

### Dragger

| props | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | `container`: 容器，`element`: 组件 | container | 是 |
| data | 同Puzzle |
| path | 同Puzzle |
| currentPath | 同Puzzle |
| onChange | 同Puzzle |
| onClick | 同Puzzle |

### 组件描述对象

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | 组件类型，可以为antd组件或html标签 | - | 是 |
| props | object | 组件props属性，同react组件的props | - | 否 |
| children | array | 子组件 | - | 否 |

> 注：如果data为`null`、`false`、`undefined`，则直接输出`null`；如果data为`string`，则输出`字符串组件`