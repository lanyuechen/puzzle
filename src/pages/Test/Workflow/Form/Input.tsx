import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent } from '../utils/common';

const useValidate = (rules: string[], value: any): any => {
  const [ err, setErr ] = useState();

  useEffect(() => {
    if (rules) {
      for (let rule of rules) {
        const d = rule.split('|');
        if (d[0] === 'required') {
          if (!value) {
            setErr({ msg: d[1], status: 'error' });
            return;
          }
        } else if (d[0] === 'pattern') {
          
        }
      }
    }
    setErr(undefined);
  }, [value]);

  return [err];
}

export default (props: any) => {
  const { config, data, onChange } = props;

  useEvent(data, config, onChange);
  const [ err ] = useValidate(config.rules, _.get(data, config.path));

  const handleChange = (e: any) => {
    evt.emit(config.path, e.target.value);
    onChange(config.path, e.target.value);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      help={err && err.msg}
      validateStatus={err && err.status}
    >
      <Input
        disabled={isTrue(data, config.disabled)}
        placeholder={config.placeholder} 
        onChange={handleChange}
        value={_.get(data, config.path)}
      />
    </Form.Item>
  )
}