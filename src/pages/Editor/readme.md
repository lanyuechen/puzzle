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

### 要解决的问题

- 开发大量的重复性工作
- 设计与开发彼此独立，能不能整合两者的工作
- 以前开发过的内容以后要用还得再开发一遍
- 研究生的水平也得干板砖的活
- 代码风格千差万别，统一之路难上加难

### Todo

- 最终目标：设计 + 开发工具（平台）
- 自己实现自己！
- 命令行（参考vi？）
- 多人协作？？？
- 公共组件库（使用别分的组件/发布自己的组件）
- 用户系统
- 权限系统
- 全平台（电脑/平板/手机）(小程序/web/tool)
- 支持用户扩展（需要有一个万能组件）
- 不只是antd，可选的组件库（第三方/自己开发）
- 组件添加容器后，改变了组件默认样式，需要区别对待块级组件和行内组件
- 需要导出成tsx/js文件的功能（压缩的/格式化的）
- 支持自定义组件
- 预览时需要支持事件，事件处理函数通过字符串传入，内部需要解析，绑定作用域等
- 预览页面支持多种尺寸？支持调整分辨率？支持模拟UA
- 属性编辑形式（json编辑器/表单编辑）
- getFieldDecorator以什么方式引入，提供两种不同的form？还是强制使用form.Create?
- 提升效率
- 操作简单，经过简单培训即可上岗
- 生成代码可别有坑
- 像不像VB
