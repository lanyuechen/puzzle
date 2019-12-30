import React from 'react';
import { Form, Switch } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate } from '../utils/common';

export default (props: any) => {
  const { config, data, onChange } = props;

  const value = config.path ? _.get(data, config.path) : data;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, value);

  const handleChange = (checked: boolean) => {
    evt.emit(config.path, checked);
    onChange(config.path, checked);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <Switch
        checkedChildren="是"
        unCheckedChildren="否"
        checked={value}
        disabled={isTrue(data, config.disabled)}
        onChange={handleChange}
      />
    </Form.Item>
  )
}
