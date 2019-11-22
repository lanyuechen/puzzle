import React from 'react';
import { useDrag } from 'react-dnd';

const Dragger = (props: any): any => {
  const { children, onChange, path = [] } = props;

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

  return (
    <span
      ref={drag}
      style={{
        opacity: isDragging ? 0.2 : 1,
        pointerEvents: isDragging ? 'none' : 'all',
      }}
    >
      {children}
    </span>
  );
}

export default Dragger;