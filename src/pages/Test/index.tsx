import React, { useEffect } from 'react';
import { connect } from 'dva';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Editor from '../Editor';
import Elements from '../Workspace/Elements';

import { read } from '@/services/git';
import Cloud from '@/pages/Workspace/Cloud';

const Test = function(props: any): any {
  const { workspace, dispatch } = props;
  const { component, projects, actives, current } = workspace;

  useEffect(() => {
    dispatch({
      type: 'workspace/load',
    });
  }, []);

  const handleEdit = (path: string, data: any) => {
    dispatch({
      type: 'workspace/setComponent',
      path,
      payload: data,
    });
  };

  return (
    <div style={{width: 211, height: '100%', border: '1px solid #ddd'}}>
      <Cloud />
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Elements />
    </DndProvider>
  );
}

export default connect(({ workspace }: any) => ({
  workspace
}))(Test);