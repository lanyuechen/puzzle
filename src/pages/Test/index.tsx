import React, { useRef } from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useDrag, useDrop } from 'react-dnd';

import Magic from '@/components/Magic';

import { Button, Input } from 'antd';

const Test = function(props: any): any {
  const ref = useRef(null);

  const [ { isDragging }, drag ] = useDrag({
    item: { type: 'PUZZLE' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [ { isOver }, drop ] = useDrop({
    accept: 'PUZZLE',
    collect: monitor => ({
      isOver: monitor.canDrop() && monitor.isOver({shallow: true}),
    }),
  });

  drag(drop(ref));

  return (
    <div style={{padding: 20}}>
      <Input.Group compact>
        <Magic 
          ref={ref}
          onChange={(ref: any) => drag(drop(ref))}
          style={{
            border: '1px dashed #ccc',
            background: isOver ? 'rgba(0, 0, 0, 0.1)' : '#fff',
            opacity: isDragging ? 0 : 1,
            borderColor: false ? '#23c132' : '#ccc',
          }}
        >
          <Input defaultValue="0571" style={{ width: '20%' }} />
        </Magic>
        <Input style={{ width: '30%' }} defaultValue="26888888" />
      </Input.Group>
    </div>
  );
}

export default () => (
  <DndProvider backend={HTML5Backend}>
    <Test />
  </DndProvider>
)