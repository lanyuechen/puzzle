import React from 'react';

import Workflow from './Workflow';
import config, { demo } from './Workflow/config';

export default function(props: any): any {
  return (
    <div>
      <Workflow config={config} data={demo} />      
    </div>
  );
}