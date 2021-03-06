import React, { useContext } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { prepareProps } from '@/utils/utils';
import { WorkspaceContext } from '@/pages/Workspace';

const _View = (props: any): any => {
  const { data, component, parentProps } = props;

  const { libs } = useContext(WorkspaceContext);

  if (!data) {
    return null;
  }

  if (typeof(data) === 'string') {
    return data;
  }

  const parsedProps = prepareProps(data.props, parentProps);

  if (data.ref) {
    return (
      <View data={component[data.ref.join('.')]} parentProps={parsedProps} />
    );
  }

  const C = _.get(libs, data.type) || data.type;

  if (!data.children) {
    return (
      <C {...parsedProps} />
    );
  }

  return (
    <C {...parsedProps}>
      {data.children.map((d: any, i: number) => (
        <View data={d} key={i} parentProps={parsedProps} />
      ))}
    </C>
  );
}

const View = connect(({ workspace }: any) => ({
  component: workspace.component,
}))(_View);

export default View;
