import React, { useState } from 'react';
import { connect } from 'dva';
import Puzzle from '@/components/Puzzle';
import Elements from './Elements';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Layout } from 'antd';

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
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light">
          <Elements />
        </Layout.Sider>
        <Layout.Content>
          <Puzzle data={data} onChange={handleChange} />
        </Layout.Content>
      </Layout>
    </DndProvider>
  );
}

export default connect()(Editor);