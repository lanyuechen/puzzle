import React from 'react';
import { Form, Button, Row, Col, Icon } from 'antd';
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

  const handleAdd = (idx: number) => {
    const newValue = [...value];
    newValue.splice(idx + 1, 0, undefined);
    onChange(config.path, newValue);
  }

  const handleRemove = (idx: number) => {
    onChange(config.path, value.filter((v:any, i: number) => i !== idx));
  }

  return (
    <Form.Item
      label={config.label || config.path}
      validateStatus={status}
      help={msg}
    >
      <div>
        {!value.length && (
          <Button onClick={() => handleAdd(0)} type="dashed" block>
            <Icon type="plus-circle" /> 添加
          </Button>
        )}
        {value.map((d: any, i: number) => (
          <div key={i}>
            <a onClick={() => handleRemove(i)} style={{float: 'right', marginLeft: 8}}>
              <Icon type="delete" />
            </a>
            <a onClick={() => handleAdd(i)} style={{float: 'right', marginLeft: 8}}>
              <Icon type="plus-circle" />
            </a>
            <Row gutter={8} style={{overflow: 'hidden'}}>
              {React.Children.map(children, (child: any) => (
                <Col span={Math.floor(24 / React.Children.count(children))}>
                  {{
                    ...child,
                    props: {
                      ...child.props,
                      data: d,
                      onChange: (path: string, value: any) => handleChange(i, path, value),
                    }
                  }}
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </Form.Item>
  )
}
