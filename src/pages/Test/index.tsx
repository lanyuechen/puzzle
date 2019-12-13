import React from 'react';
import { Button } from 'antd';

import workspace from '@/work/workspace';
import Builder from '@/utils/builder';

const builder = new Builder(workspace);

export default function(props: any): any {


  const handleClick = () => {
    builder.build();
  }

  return (
    <div>
      <Button onClick={handleClick}>导出</Button>
    </div>
  );
}