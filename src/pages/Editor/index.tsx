import React from 'react';
import { connect } from 'dva';
import Puzzle from '@/components/Puzzle';
import Block from './Block';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import demo from './demo.json';

const Editor: React.FC<any> = (props) => {

  return (
    <div>
      Editor
      <DndProvider backend={HTML5Backend}>
        <Puzzle data={demo} />
        <Block />
      </DndProvider>
    </div>
  );
}

export default connect()(Editor);