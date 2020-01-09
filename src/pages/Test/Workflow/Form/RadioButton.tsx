import React from 'react';
import { Radio } from 'antd';

export default (props: any) => {
  const { options, onChange, ...otherProps } = props;

  return (
    <Radio.Group
      {...otherProps}
      onChange={(e: any) => onChange(e.target.value)}
    >
      {options && options.map((option: any) => {
        const o = option.split('|');
        return <Radio.Button key={o[0]} value={o[0]}>{o[1] || o[0]}</Radio.Button>;  
      })}
    </Radio.Group>
  )
}
