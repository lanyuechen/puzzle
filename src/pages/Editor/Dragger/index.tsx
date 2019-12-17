import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { withId } from '@/models/workspace';

import style from './style.less';

const Dragger: React.FC<any> = (props) => {
  const { children, onChange, onClick, path, currentPath, type = 'container', data } = props;

  const ref = useRef(null);

  const [ { isDragging }, drag ] = useDrag({
    item: { type: 'PUZZLE', data, path },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor: any) => { // 每次drop都删除旧的元素，以此实现移动元素
      if (!path.length) {
        return;
      }
      const idx = path[path.length - 1];
      if (!monitor.didDrop()) {
        onChange(path.slice(0, -1), {
          $splice: [[idx, 1]],
        });
      }
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
      if (type === 'element') { // 元素组件不可拖入
        return;
      }

      if (!item.path) {
        // 添加新组件
        onChange(path.concat('children'), {
          $push: [ withId(item.data) ],
        });
      } else if (item.path.join('.') !== path.join('.')) {
        // 添加新组件
        onChange(path.concat('children'), {
          $push: [ withId(item.data) ],
        });
        // 移除旧组件
        const dragIdx = item.path[item.path.length - 1];
        onChange(item.path.slice(0, -1), {
          $splice: [[dragIdx, 1]],
        });
      }
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      if (!item.path || item.path.length !== path.length) {
        return;
      }
      const dragIdx = item.path[item.path.length - 1];
      const hoverIdx = path[path.length - 1];
  
      // Don't replace items with themselves
      if (dragIdx === hoverIdx) {
        return;
      }
  
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
  
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
  
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
  
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
  
      // Dragging downwards
      if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
        return;
      }
  
      // Dragging upwards
      if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onChange(path.slice(0, -1), {
        $splice: [
          [dragIdx, 1],
          [hoverIdx, 0, item.data],
        ]
      });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.path = path;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick(path);
  };

  const selected = currentPath && path.join() === currentPath.join();

  drag(drop(ref));

  return (
    <div 
      ref={ref}
      className={style[type]}
      onClick={handleClick}
      style={{
        background: isOver ? 'rgba(0, 0, 0, 0.1)' : undefined,
        opacity: isDragging ? 0 : 1,
        display: (type === 'container') || data.block ? 'block' : 'inline-block',
        borderColor: selected ? '#23c132' : undefined,
      }}
    >
      {children}
    </div>
  );
}

export default Dragger;