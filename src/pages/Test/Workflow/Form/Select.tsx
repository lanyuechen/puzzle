import React from 'react';
import { Select } from 'antd';

export default (props: any) => {
  const { options, ...otherProps } = props;

  return (
    <Select
      {...otherProps}
    >
      {options.map((o: any) => (
        <Select.Option key={o[0]} value={o[0]}>{o[1]}</Select.Option>
      ))}
    </Select>
  )
}
