## Puzzle 组件

此组件为系统的核心组件，通过递归实现了嵌套数据渲染

### 属性

| props | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| data | any | [组件描述对象](#组件描述对象) | - | 否 |
| parentProps | any | 父组件的props，用来实现组件的封装，使父组件的属性传递给子组件 | - | 否 |
| path | array | 组件在根组件中的索引 | [] | 否 |
| onChange | function(path, data) | 组件内容变化回调 | - | 是 |
| onClick | function(path) | 组件单击事件回调 | - | 是 |

- Puzzle组件都通过[Dragger]()的包装，使其具有了拖动、接收拖入组件的功能（todo 使用高更好的包装方案，目前方案太过繁琐，自定义钩子？）

#### 不同data类型Puzzle的返回值

- data类型为`null`、`false`、`undefined`
    ```js
    null
    ```
- data类型为`string`
    ```jsx
    <Dragger>
      {data}
    </Dragger>
    ```
- data.ref存在
    ```jsx
    <Dragger>
      <View data={data} />
    </Dragger>
    ```
- data.children不存在
    ```jsx
    // C = _.get(antd, data.type) || data.type;
    <Dragger>
      <C {...parsedProps} />
    </Dragger>
    ```
    > 其中C表示组件名，目前基于antd组件，如果`data.type`为antd的组件，则使用该组件，否则使用`data.type`作为标签名(原生html)
- data.children存在
    ```jsx
    <Dragger>
      {data.children.map(d => <Puzzle data={d} />)}
    </Dragger>
    ```