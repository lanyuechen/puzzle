import React, { useState } from 'react';
import { connect } from 'dva';
import Puzzle from '@/components/Puzzle';
import Elements from './Elements';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Layout } from 'antd';

const getSpec = (path: any, spec: any) => {
  if (typeof(path) === 'string') {
    path = path.split('.');
  }

  return path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
}

const Editor: React.FC<any> = (props) => {

  const defaultValue = JSON.parse(localStorage.__data || '{"type": "div", "children": []}');
  const [ data, setData ] = useState(defaultValue);

  const handleChange = (path: any, spec: any) => {
    console.log('>>> path', path, spec);
    const newData = update(data, getSpec(path, spec));
    setData(newData);
    localStorage.__data = JSON.stringify(newData);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light">
          <Elements />
        </Layout.Sider>
        <Layout.Content style={{padding: 15}}>
          <Puzzle data={data} onChange={handleChange} />
        </Layout.Content>
      </Layout>
    </DndProvider>
  );
}

export default connect()(Editor);