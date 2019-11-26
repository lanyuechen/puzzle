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
import Mark from './Mark';

const getSpec = (path: any, spec: any) => {
  if (typeof(path) === 'string') {
    path = path.split('.');
  }

  return path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
}

const Editor: React.FC<any> = (props) => {

  const defaultValue = JSON.parse(localStorage.__data || '{"type": "div", "children": []}');
  const [ data, setData ] = useState(defaultValue);
  const [ current, setCurrent ] = useState<any>({});

  const handleChange = (path: any, spec: any) => {
    console.log('>>> handleChange', path, spec);
    const newData = update(data, getSpec(path, spec));
    setData(newData);
    localStorage.__data = JSON.stringify(newData);
  };

  const handleClick = (e: any, path: any) => {
    console.log('>>> handleClick', path);
    const rect = e.target.getBoundingClientRect();
    setCurrent({ path, rect});
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
          />
          <View data={data} />
        </Layout.Content>
      </Layout>
      <Drawer
        title="属性"
        placement="right"
        visible={!!current.path}
        onClose={() => setCurrent({})}
        mask={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Props
          data={current.path && current.path.length ? _.get(data, current.path) : data}
          path={current.path}
          onChange={handleChange}
        />
      </Drawer>
      <Mark rect={current.rect} />
    </DndProvider>
  );
}

export default connect()(Editor);