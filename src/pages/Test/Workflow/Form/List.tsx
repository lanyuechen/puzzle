import React from 'react';
import { Form, Button, Row, Col, Icon } from 'antd';
import _ from 'lodash';

export default (props: any) => {
  const { config, data, onChange, children } = props;

  const value = _.get(data, config.path) || [];

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
      // label={getLabel(config)}
    >
      <div>
        {!value.length && (
          <Button onClick={() => handleAdd(0)} type="dashed" block>
            <Icon type="plus-circle" /> 添加
          </Button>
        )}
        {value.map((d: any, i: number) => (
          <div key={i}>
            <a onClick={() => handleRemove(i)} style={{float: 'right', margin: '24px 0 0 8px'}}>
              <Icon type="delete" />
            </a>
            <a onClick={() => handleAdd(i)} style={{float: 'right', margin: '24px 0 0 8px'}}>
              <Icon type="plus-circle" />
            </a>
            <Row gutter={8} style={{overflow: 'hidden'}}>
              {React.Children.map(children, (child: any) => (
                <Col span={Math.floor(24 / React.Children.count(children))}>
                  {{
                    ...child,
                    props: {
                      ...child.props,
                      config: {
                        ...child.props.config,
                        path: [config.path, `${i}`, child.props.config.path].filter(v => v).join('.'),
                      },
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
