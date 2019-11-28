import React, { useState } from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd';
import _ from 'lodash';
import { updateByPath } from '@/utils/utils';
import Puzzle from './Puzzle';
import View from './View';
import Props from './Props';
import Mark from './Mark';

const Editor: React.FC<any> = (props) => {
  const {
    onChange,
    data = {"type": "div", "children": []},
  } = props;

  const [ current, setCurrent ] = useState<any>({});

  const handleChange = (path: any, spec: any) => {
    console.log('>>> handleChange', path, spec);
    onChange(updateByPath(data, path, spec));
  };

  const handleClick = (ref: any, path: any) => {
    console.log('>>> handleClick', path);
    const rect = ref.current.getBoundingClientRect();
    setCurrent({ path, rect});
  };

  return (
    <React.Fragment>
      <Puzzle
        data={data}
        onChange={handleChange}
        onClick={handleClick}
      />
      {/* <View data={data} /> */}
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
    </React.Fragment>
  );
}

export default connect()(Editor);