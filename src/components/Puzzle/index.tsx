import React from 'react';
import Dnd from './Dnd';
import Dragger from './Dragger';

const antd = require('antd');

// 递归去展示
const Puzzle = (props: any): any => {
  const { data, onChange, path = [] } = props;

  // data 为字符串
  if (typeof(data) === 'string') {
    return (
      <Dragger path={path} onChange={onChange}>
        {data}
      </Dragger>
    );
  }

  const C = antd[data.type] || data.type;

  if (!data.children) {
    // 不包含子元素
    return (
      <Dragger path={path} onChange={onChange}>
        <C {...data.props} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <C {...data.props}>
      <Dnd path={path} onChange={onChange} >
        {data.children.map((d: any, i: number) => (
          <Puzzle
            key={i}
            data={d}
            path={path.concat('children', i)}
            onChange={onChange}
          />
        ))}
      </Dnd>
    </C>
  );
}

export default Puzzle;