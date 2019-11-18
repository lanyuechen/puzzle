import React from 'react';
import { Form, Modal, Input, InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const formatValues = (values: any) => {
  return Object.keys(values).reduce((p: any, key: string) => {
    if (values[key] instanceof moment) {
      p[key] = values[key].format('YYYY-MM-DD HH:mm:ss');
    } else if (typeof(values[key]) === 'object') {
      p[key] = formatValues(values[key]);
    } else {
      p[key] = values[key];
    }
    return p;
  }, {});
};

const ModalUpsert: React.FC<any> = props => {
  const { visible, onOk, onCancel, defaultValue } = props;
  const { getFieldDecorator, validateFields } = props.form;

  const handleOk = () => {
    validateFields((errors: any, values: any) => {
      if (errors) {
        return;
      }
      values = formatValues(values);
      onOk && onOk(values);
    });
  };

  return (
    <Modal
      title={defaultValue ? 'Update test' : 'Add test'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form {...formItemLayout}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: defaultValue && defaultValue.name,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Date">
          {getFieldDecorator('date', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: moment(defaultValue && defaultValue.date),
          })(
            <DatePicker showTime />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalUpsert);
