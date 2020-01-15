import React from 'react';
import { Radio } from 'antd';

export default (props: any) => {
  const { options, onChange, ...otherProps } = props;

  return (
    <Radio.Group
      {...otherProps}
      onChange={(e: any) => onChange(e.target.value)}
    >
      {options.map((o: any) => (
        <Radio.Button key={o[0]} value={o[0]}>{o[1]}</Radio.Button>
      ))}
    </Radio.Group>
  )
}
