import React from 'react';
import { connect } from 'dva';

const antd = require('antd');

const prepareProps = (props: any, parentProps: any) => {
  const res = {};
  Object.entries(props).map(([k, v]: any) => {
    if (v.includes('props.')) {
      res[k] = _.get(parentProps, v) || v;
    } else {
      res[k] = v;
    }
  });
  return res;
};

const View = (props: any): any => {
  const { data, component, parentProps } = props;

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

  const parsedProps = prepareProps(data.props, parentProps)

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

export default connect(({ workspace }: any) => ({
  component: workspace.component,
}))(View);