import React from 'react';
import { Input } from 'antd';

export default (props: any) => {
  const { onChange, ...otherProps } = props;

  return (
    <Input
      {...otherProps}
      onChange={(e: any) => onChange(e.target.value)}
    />
  );
}
