import React from 'react';
import { useDrag } from 'react-dnd';

const Block: React.FC<any> = (props) => {
  const { children } = props;

  const [, drag] = useDrag({
    item: { type: 'PUZZLE' },
  });

  return (
    <span ref={drag}>
      {children}
    </span>
  );
}

export default Block;