import React from 'react';
import Dragger from './Dragger';

import 'antd/dist/antd.css';
const antd = require('antd');

const Puzzle = (props: any): any => {
  const { data, onChange, onClick, path = [], currentPath } = props;

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
            currentPath={currentPath}
            onChange={onChange}
            onClick={onClick}
          />
        ))}
      </C>
    </Dragger>
  );
}

export default Puzzle;