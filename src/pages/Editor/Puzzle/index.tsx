import React from 'react';
import Dragger from './Dragger';
import View from '../View';

import 'antd/dist/antd.css';
const antd = require('antd');

const Puzzle = (props: any): any => {
  const { data, onChange, onClick, path = [] } = props;

  const draggerProps = { data, path, onChange, onClick };

  // data 为null、false、undefined
  if (!data) {
    return null;
  }

  // data 为字符串
  if (typeof(data) === 'string') {
    return (
      <Dragger type="element" {...draggerProps}>
        {data}
      </Dragger>
    );
  }

  // todo 如果data为引用，则加载引用的组件data并跟当前对象合并，次组件内部不可编辑，只可以编辑整体的属性
  if (data.ref) {
    return (
      <Dragger type="element" {...draggerProps}>
        <View data={data} />
      </Dragger>
    );
  }

  const C = antd[data.type] || data.type;

  // 不包含子元素
  if (!data.children) {
    return (
      <Dragger type="element" {...draggerProps}>
        <C {...(data.props || {})} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <Dragger type="container" {...draggerProps}>
      <C {...(data.props || {})}>
        {data.children.map((d: any, i: number) => (
          <Puzzle
            key={i}
            data={d}
            path={path.concat('children', i)}
            onChange={onChange}
            onClick={onClick}
          />
        ))}
      </C>
    </Dragger>
  );
}

export default Puzzle;