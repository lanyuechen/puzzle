import React, { useState } from 'react';
import { connect } from 'dva';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Layout, Drawer } from 'antd';
import _ from 'lodash';
import Puzzle from './Puzzle';
import View from './View';
import Elements from './Elements';
import Props from './Props';

const getSpec = (path: any, spec: any) => {
  if (typeof(path) === 'string') {
    path = path.split('.');
  }

  return path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
}

const Editor: React.FC<any> = (props) => {

  const defaultValue = JSON.parse(localStorage.__data || '{"type": "div", "children": []}');
  const [ data, setData ] = useState(defaultValue);
  const [ currentPath, setCurrentPath ] = useState();

  const handleChange = (path: any, spec: any) => {
    console.log('>>> handleChange', path, spec);
    const newData = update(data, getSpec(path, spec));
    setData(newData);
    localStorage.__data = JSON.stringify(newData);
  };

  const handleClick = (path: any, data: any) => {
    console.log('>>> handleClick', path, data);
    setCurrentPath(path);
  };

  const handleSelect = (path: any) => {
    console.log('>>> handleSelect', path);
    setCurrentPath(path);
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
            currentPath={currentPath}
          />
          <View data={data} />
        </Layout.Content>
      </Layout>
      <Drawer
        title="属性"
        placement="right"
        visible={!!currentPath}
        onClose={() => setCurrentPath(undefined)}
        mask={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Props
          data={currentPath && currentPath.length ? _.get(data, currentPath) : data}
          path={currentPath}
          onChange={handleChange}
        />
      </Drawer>
    </DndProvider>
  );
}

export default connect()(Editor);