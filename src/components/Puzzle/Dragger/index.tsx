import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import style from './style.less';

const Dragger: React.FC<any> = (props) => {
  const { children, onChange, path, type } = props;

  const ref = useRef(null);

  const [ { isDragging }, drag ] = useDrag({
    item: { type: 'PUZZLE' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor: any) => {
      if (monitor.didDrop()) {
        return;
      }
      const idx = path[path.length - 1];
      if (typeof(idx) !== 'number') {
        return;
      }
      onChange(path.slice(0, -1), {
        $splice: [[idx, 1]],
      });
    }
  });

  const [ { isOver }, drop ] = useDrop({
    accept: 'PUZZLE',
    collect: monitor => ({
      isOver: monitor.canDrop() && monitor.isOver({shallow: true}),
    }),
    drop: (item: any, monitor: any) => {
      if (monitor.didDrop()) {
        return;
      }
      onChange(path.concat('children'), {
        $push: [{
          type: 'div',
          children: [],
        }],
      });
    },
  });

  if (type === 'container') {
    drag(drop(ref));
  } else if (type === 'element') {
    drag(ref);
  }

  return (
    <div 
      ref={ref}
      className={style[type]}
      style={{
        background: isOver ? 'rgba(0, 0, 0, 0.1)' : undefined,
        opacity: isDragging ? 0.2 : 1,
        pointerEvents: isDragging ? 'none' : 'all',
      }}
    >
      {children}
    </div>
  );
}

export default Dragger;