import React from 'react';
import Dragger from './Dragger';

import cs from './c';

const Block: React.FC<any> = (props) => {

  return (
    <div>
      {cs.map((key: string) => (
        <Dragger key={key}>
          {key}
        </Dragger>
      ))}
    </div>
  );
}

export default Block;