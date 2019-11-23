import React from 'react';
import { useDrag } from 'react-dnd';

const Block: React.FC<any> = (props) => {
  const { children, data } = props;

  const [, drag] = useDrag({
    item: { type: 'PUZZLE', data },
  });

  return (
    <span ref={drag}>
      {children}
    </span>
  );
}

export default Block;