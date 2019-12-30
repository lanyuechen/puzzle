import React from 'react';
import { Form } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate } from '../utils/common';

export default (C: any) => (props: any) => {
  const { config, data, onChange } = props;

  const value = config.path ? _.get(data, config.path) : data;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, value);

  const handleChange = (value: any) => {
    evt.emit(config.path, value);
    onChange(config.path, value);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <C 
        disabled={isTrue(data, config.disabled)}
        placeholder={config.placeholder} 
        onChange={handleChange}
        value={value}
        options={config.options}
      />
    </Form.Item>
  );
}
