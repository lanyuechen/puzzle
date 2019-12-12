import React from 'react';
import Dragger from './Dragger';
import View from '../View';
import _ from 'lodash';

import 'antd/dist/antd.css';
const antd = require('antd');

const prepareProps = (props: any, parentProps: any) => {
  const res = {};
  Object.entries(props).map(([k, v]: any) => {
    if (v.includes('props.')) {
      res[k] = _.get(parentProps, v) || v;
    } else {
      res[k] = v;
    }
  });
  return res;
};

const Puzzle = (props: any): any => {
  const { data, onChange, onClick, path = [], currentPath, parentProps } = props;

  const draggerProps = { data, path, onChange, onClick, currentPath };

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

  const C = _.get(antd, data.type) || data.type;

  const parsedProps = prepareProps(data.props, parentProps);

  // 不包含子元素
  if (!data.children) {
    return (
      <Dragger type="element" {...draggerProps}>
        <C {...parsedProps} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <Dragger type="container" {...draggerProps}>
      <C {...parsedProps}>
        {data.children.map((d: any, i: number) => (
          <Puzzle
            key={i}
            data={d}
            path={path.concat('children', i)}
            currentPath={currentPath}
            onChange={onChange}
            onClick={onClick}
            parentProps={parsedProps}
          />
        ))}
      </C>
    </Dragger>
  );
}

export default Puzzle;