## 数据结构

### Workspace
| 属性 | 类型 | 描述 | 默认值 |
| ---- | ---- | ---- | ---- |
| projects | [Project](#Project)[] | 项目列表 | [] |
| component | {[key: string]: [Component](#Component)} | 组件map，存储组件的具体内容 | {} |
| actives | string[] | 已打开的项目, [字符串格式](#Actives) | [] |
| current | string | 当前项目 [字符串格式](#Actives) | - |

```ts
interface Workspace {
  projects: Project[];
  actives: string[];
  current?: string;
  component: {[key: string]: Component};
}
```

### Project
| 属性 | 类型 | 描述 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | string | 项目名称(使用驼峰命名或短线链接的单词命名) | - |
| children | Project[] | 子目录/项目 | - |
| isFile | boolean | 文件标志，如果isFile为true，children会被忽略，且该项作为项目处理，否则作为文件夹处理 | false |

```ts
interface Project {
  name: string;
  children: Project[];
  isFile: boolean;
}
```

### Component
| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | 组件类型，可以使antd组件的索引或html标签 | - | 是 |
| ref | string[] | 组件的引用目录，如果存在ref，表明该组件为引用组件，这时type为复合组件的类名(生成代码时需要) | - | 否 |
| props | object | 组件props属性，同react组件的props | - | 否 |
| children | Component[] | 子组件 | - | 否 |
| block | Component[] | block为true时，组件显示为块级元素；否则显示为行内元素 | - | 否 |

```ts
interface Component {
  type: string;
  ref?: string[];
  props?: any;
  children?: Component[];
  block?: boolean;
}
```

### Actives

结构为类似`0.children.1.children.0`的字符串，表示该项目在`projects`中的索引

> todo 改为自定义结构，可以承担更多的数据