import React from 'react';
import { connect } from 'dva';

const antd = require('antd');

const prepareProps = (props: any) => {
  return props || {};
};

const View = (props: any): any => {
  const { data, component } = props;

  if (!data) {
    return null;
  }

  if (typeof(data) === 'string') {
    return data;
  }

  if (data.ref) {
    return (
      <View data={component[data.ref.join('.')]} />
    );
  }

  const C = antd[data.type] || data.type;

  if (!data.children) {
    return (
      <C {...prepareProps(data.props)} />
    );
  }

  return (
    <C {...prepareProps(data.props)}>
      {data.children.map((d: any, i: number) => (
        <View data={d} key={i} />
      ))}
    </C>
  );
}

export default connect(({ workspace }: any) => ({
  component: workspace.component,
}))(View);