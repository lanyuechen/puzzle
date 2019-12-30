import React from 'react';
import { Form, Select } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate } from '../utils/common';

export default (props: any) => {
  const { config, data, onChange } = props;

  const value = config.path ? _.get(data, config.path) : data;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, value);

  const handleChange = (value: any[]) => {
    evt.emit(config.path, value);
    onChange(config.path, value);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <Select
        mode="multiple"
        disabled={isTrue(data, config.disabled)}
        placeholder={config.placeholder}
        value={value}
        onChange={handleChange}
      >
        {config.options && config.options.map((option: any) => {
          const o = option.split('|');
          return <Select.Option key={o[0]} value={o[0]}>{o[1] || o[0]}</Select.Option>;  
        })}
      </Select>
    </Form.Item>
  )
}
