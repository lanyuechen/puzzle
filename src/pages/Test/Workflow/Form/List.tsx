import React from 'react';
import { Form, Button } from 'antd';
import _ from 'lodash';

import evt from '../utils/event';
import { isTrue, useEvent, useValidate, updateByPath } from '../utils/common';

export default (props: any) => {
  const { config, data, onChange, children } = props;

  useEvent(data, config, onChange);
  const [ status, msg ] = useValidate(config.rules, _.get(data, config.path));

  const value = _.get(data, config.path) || [];

  const handleChange = (i: number, path: string, v: any) => {
    if (path) {
      onChange(config.path, updateByPath(value, `${i}.${path}`, v));
    } else {
      onChange(config.path, updateByPath(value, `${i}`, v));
    }
  }

  const handleAdd = () => {
    onChange(config.path, [...value, undefined]);
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <div style={{border: '1px solid #ddd', padding: 8}}>
        {value.map((d: any, i: number) => (
          <div key={i}>
            {React.Children.map(children, (child: any) => ({
              ...child,
              props: {
                ...child.props,
                data: d,
                onChange: (path: string, value: any) => handleChange(i, path, value),
              }
            }))}
          </div>
        ))}
        <div>
          <Button type="dashed" onClick={handleAdd}>添加</Button>
        </div>
      </div>
    </Form.Item>
  )
}
