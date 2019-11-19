import React from 'react';
import { useDrop } from 'react-dnd';
import style from './style.less';

const antd = require('antd');

// 递归去展示
const Puzzle = (props: any): any => {
  const { data } = props;

  const [ { isOver, canDrop }, drop ] = useDrop({
    accept: 'PUZZLE',
    collect: monitor => ({
      isOver: monitor.isOver({shallow: true}),
      canDrop: monitor.canDrop(),
    }),
  });

  // data 为字符串
  if (typeof(data) === 'string') {
    return data;
  }

  // data 为数组
  if (Array.isArray(data)) {
    return data.map((d: any, i: number) => (
      <Puzzle key={i} data={d} />
    ));
  }

  const C = antd[data.type] || data.type;

  // 包含子元素
  if (Array.isArray(data.children)) {
    return (
      <C {...data.props}>
        <div 
          ref={drop}
          className={style.container}
          style={isOver && canDrop ? {background: 'rgba(0, 0, 0, 0.1)'} : {}}
        >
          <Puzzle data={data.children} />
        </div>
      </C>
    );
  }

  // 不包含子元素
  return (
    <C {...data.props} />
  );
}

export default Puzzle;