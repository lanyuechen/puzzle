import React from 'react';

const antd = require('antd');

const prepareProps = (props: any) => {
  return props || {};
};

const View = (props: any): any => {
  const { data } = props;

  if (!data) {
    return null;
  }

  if (typeof(data) === 'string') {
    return data;
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

export default View;