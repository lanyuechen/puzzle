import React from 'react';
import Dragger from './Dragger';

const antd = require('antd');

const Puzzle = (props: any): any => {
  const { data, onChange, path = [] } = props;

  // data 为字符串
  if (typeof(data) === 'string') {
    return (
      <Dragger type="element" path={path} onChange={onChange} data={data}>
        {data}
      </Dragger>
    );
  }

  const C = antd[data.type] || data.type;

  if (!data.children) {
    // 不包含子元素
    return (
      <Dragger type="element" path={path} onChange={onChange} data={data}>
        <C {...data.props} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <Dragger type="container" path={path} onChange={onChange} data={data}>
      <C {...data.props}>
        {data.children.map((d: any, i: number) => (
          <Puzzle
            key={i}
            data={d}
            path={path.concat('children', i)}
            onChange={onChange}
          />
        ))}
      </C>
    </Dragger>
  );
}

export default Puzzle;