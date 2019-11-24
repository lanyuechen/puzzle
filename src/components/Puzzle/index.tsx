import React from 'react';
import Dragger from './Dragger';

const antd = require('antd');

const Puzzle = (props: any): any => {
  const { data, onChange, onClick, path = [], currentPath } = props;

  // data 为字符串
  if (typeof(data) === 'string') {
    return (
      <Dragger
        type="element"
        data={data}
        path={path}
        currentPath={currentPath}
        onChange={onChange}
        onClick={onClick}
      >
        {data}
      </Dragger>
    );
  }

  const C = antd[data.type] || data.type;

  if (!data.children) {
    // 不包含子元素
    return (
      <Dragger
        type="element"
        data={data}
        path={path}
        currentPath={currentPath}
        onChange={onChange}
        onClick={onClick}
      >
        <C {...data.props} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <Dragger
      type="container"
      data={data}
      path={path}
      currentPath={currentPath}
      onChange={onChange}
      onClick={onClick}
    >
      <C {...data.props}>
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