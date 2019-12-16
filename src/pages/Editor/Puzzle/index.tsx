import React, { useContext } from 'react';
import Dragger from '../Dragger';
import View from '../View';
import _ from 'lodash';
import { prepareProps } from '@/utils/utils';

import { WorkspaceContext } from '@/pages/Workspace';

import { Component } from '@/models/workspace';

export interface PuzzleProps {
  data: Component;
  onChange: Function;
  onClick: Function;
  path?: any[];  // todo 使用自定义对象
  currentPath?: any[];
  parentProps?: any;
}

const Puzzle = (props: PuzzleProps): any => {
  const { data, onChange, onClick, path = [], currentPath, parentProps } = props;

  const draggerProps = { data, path, onChange, onClick, currentPath };

  const { libs } = useContext(WorkspaceContext);

  // data 为null、false、undefined
  if (!data) {
    return null;
  }

  // data 为字符串
  if (typeof(data) === 'string') {
    return (
      <Dragger type="element" {...draggerProps}>
        {data}
      </Dragger>
    );
  }

  const parsedProps = prepareProps(data.props, parentProps);

  // todo 如果data为引用，则加载引用的组件data并跟当前对象合并，次组件内部不可编辑，只可以编辑整体的属性
  if (data.ref) {
    return (
      <Dragger type="element" {...draggerProps}>
        <View data={data} parentProps={parsedProps} />
      </Dragger>
    );
  }

  const C = _.get(libs, data.type) || data.type;

  // 不包含子元素
  if (!data.children) {
    return (
      <Dragger type="element" {...draggerProps}>
        <C {...parsedProps} />
      </Dragger>
    );
  }

  // 包含子元素
  return (
    <Dragger type="container" {...draggerProps}>
      <C {...parsedProps}>
        {data.children.map((d: Component, i: number) => (
          <Puzzle
            key={d.id || i}
            data={d}
            path={path.concat('children', i)}
            currentPath={currentPath}
            onChange={onChange}
            onClick={onClick}
            parentProps={parsedProps}
          />
        ))}
      </C>
    </Dragger>
  );
}

export default Puzzle;