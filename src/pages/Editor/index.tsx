import React, { useState } from 'react';
import { connect } from 'dva';
import Puzzle from '@/components/Puzzle';
import Elements from './Elements';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Layout, Drawer, Tag } from 'antd';

const getSpec = (path: any, spec: any) => {
  if (typeof(path) === 'string') {
    path = path.split('.');
  }

  return path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
}

const Editor: React.FC<any> = (props) => {

  const defaultValue = JSON.parse(localStorage.__data || '{"type": "div", "children": []}');
  const [ data, setData ] = useState(defaultValue);
  const [ selected, setSelected] = useState();

  const handleChange = (path: any, spec: any) => {
    console.log('>>> handleChange', path, spec);
    const newData = update(data, getSpec(path, spec));
    setData(newData);
    localStorage.__data = JSON.stringify(newData);
  };

  const handleClick = (path: any, data: any) => {
    console.log('>>> handleClick', path, data);
    setSelected({ path, data });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light">
          <Elements />
        </Layout.Sider>
        <Layout.Content style={{padding: 15}}>
          <Puzzle
            data={data}
            onChange={handleChange}
            onClick={handleClick}
            currentPath={selected && selected.path}
          />
        </Layout.Content>
      </Layout>
      <Drawer
        title="属性"
        placement="right"
        visible={!!selected}
        onClose={() => setSelected(undefined)}
      >
        {selected && (
          <Tag>{selected.path.join('/')}</Tag>
        )}
        {selected && (
          <pre>
            {JSON.stringify(selected.data, undefined, 2)}
          </pre>
        )}
      </Drawer>
    </DndProvider>
  );
}

export default connect()(Editor);