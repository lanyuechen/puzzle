import React from 'react';
import { Select } from 'antd';

export default (props: any) => {
  const { options, ...otherProps } = props;

  return (
    <Select
      {...otherProps}
    >
      {options && options.map((option: any) => {
        const o = option.split('|');
        return <Select.Option key={o[0]} value={o[0]}>{o[1] || o[0]}</Select.Option>;  
      })}
    </Select>
  )
}
