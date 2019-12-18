import React, { useEffect } from 'react';
import { connect } from 'dva';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Editor from '../Editor';
import Elements from '../Workspace/Elements';

import { read } from '@/services/git';
import Cloud from '@/pages/Workspace/Cloud';
import CmtList from '@/pages/Workspace/Cloud/CommentList';

const dataSource = [
  {
    user: {
      name: '王富贵',
    },
    msg: {
      like: 10,
      dislike: 2,
      content: 'We supply a series .',
    },
    children: [
      {
        user: {
          name: '李安娜',
        },
        msg: {
          like: 14,
          dislike: 0,
          content: 'yes! I can!',
        },
      },
      {
        user: {
          name: '王富贵',
        },
        msg: {
          like: 14,
          dislike: 0,
          content: 'balabala bbaa fol sd fs dfs ersd fsd fsd f!sfs sfsdf',
        },
      },
    ],
  },
  {
    user: {
      name: '李安娜',
    },
    msg: {
      like: 109,
      dislike: 5,
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
  },
];

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
    <CmtList dataSource={dataSource} />
  )

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