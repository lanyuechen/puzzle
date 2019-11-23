import React from 'react';
import Dragger from './Dragger';
import { Tag } from 'antd';

import config from './config.json';

const Elements: React.FC<any> = (props) => {

  return (
    <div>
      {config.map((d: any) => (
        <Dragger key={d.type} data={d}>
          <Tag>{d.type}</Tag>
        </Dragger>
      ))}
    </div>
  );
}

export default Elements;