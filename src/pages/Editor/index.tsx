import React, { useState } from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd';
import _ from 'lodash';
import { updateByPath } from '@/utils/utils';
import Puzzle from './Puzzle';
import View from './View';
import Props from './Props';

const Editor: React.FC<any> = (props) => {
  const {
    onChange,
    data = {"type": "div", "children": []},
  } = props;

  const [ current, setCurrent ] = useState<any>();

  const handleChange = (path: any, spec: any) => {
    console.log('>>> handleChange', path, spec);
    onChange(updateByPath(data, path, spec));
  };

  const handleClick = (path: any) => {
    console.log('>>> handleClick', path);
    setCurrent(path);
  };

  return (
    <React.Fragment>
      <Puzzle
        data={data}
        onChange={handleChange}
        onClick={handleClick}
        currentPath={current}
      />
      {/* <View data={data} /> */}
      <Drawer
        title="属性"
        placement="right"
        visible={!!current}
        onClose={() => setCurrent(null)}
        mask={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Props
          data={current && current.length ? _.get(data, current) : data}
          path={current}
          onChange={handleChange}
        />
      </Drawer>
    </React.Fragment>
  );
}

export default connect()(Editor);