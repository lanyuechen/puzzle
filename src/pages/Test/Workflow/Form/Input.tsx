import React from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate } from '../utils/common';

export default (props: any) => {
  const { config, data, onChange } = props;

  const value = config.path ? _.get(data, config.path) : data;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, value);

  const handleChange = (e: any) => {
    evt.emit(config.path, e.target.value);
    onChange(config.path, e.target.value);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <Input
        disabled={isTrue(data, config.disabled)}
        placeholder={config.placeholder} 
        onChange={handleChange}
        value={value}
      />
    </Form.Item>
  )
}
