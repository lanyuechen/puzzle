import React from 'react';
import { connect } from 'dva';
import Cmd from '@/components/Cmd';
import Puzzle from '@/components/Puzzle';

import demo from './demo.json';

const Editor: React.FC<any> = (props) => {

  return (
    <div>
      Editor
      <Puzzle data={demo} />
      <Cmd />
    </div>
  );
}

export default connect()(Editor);