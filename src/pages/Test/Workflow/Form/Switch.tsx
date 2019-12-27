import React from 'react';
import { Form, Switch } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate } from '../utils/common';

export default (props: any) => {
  const { config, data, onChange } = props;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, _.get(data, config.path));

  const handleChange = (checked: boolean) => {
    evt.emit(config.path, checked);
    onChange(config.path, checked);
  }

  const value = config.path ? _.get(data, config.path) : data;

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