import React from 'react';
import { Switch } from 'antd';

export default (props: any) => {
  const { value, ...otherProps } = props;

  return (
    <Switch
      checkedChildren="是"
      unCheckedChildren="否"
      checked={value}
      {...otherProps}
    />
  )
}
