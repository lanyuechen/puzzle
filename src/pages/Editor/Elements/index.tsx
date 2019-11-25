import React from 'react';
import { useDrag } from 'react-dnd';
import { Tag } from 'antd';

import config from './config';

const Elements: React.FC<any> = (props) => {
  return (
    <div>
      {config.map((d: any) => (
        <Block key={d.type} data={d}>
          <Tag>{d.type}</Tag>
        </Block>
      ))}
    </div>
  );
}

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

export default Elements;