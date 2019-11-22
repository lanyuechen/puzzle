import React, { useState } from 'react';
import { connect } from 'dva';
import Puzzle from '@/components/Puzzle';
import Block from './Block';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

import demo from './demo.json';

const getSpec = (path: any, spec: any) => {
  if (typeof(path) === 'string') {
    path = path.split('.');
  }

  return path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
}

const Editor: React.FC<any> = (props) => {

  const [ data, setData ] = useState(demo);

  const handleChange = (key: string, spec: any) => {
    console.log('>>>key', key, spec)
    setData(update(data, getSpec(key, spec)));
  }

  return (
    <div>
      Editor
      <DndProvider backend={HTML5Backend}>
        <Puzzle data={data} onChange={handleChange} />
        <Block />
      </DndProvider>
    </div>
  );
}

export default connect()(Editor);