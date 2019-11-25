import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, Button, Form } from 'antd';

import style from './style.less';

export default function(props: any): any {
  const { data = {}, onChange } = props;
  const dataSource = Object.keys(data).map((key: string) => ({
    key,
    value: data[key],
  }));

  const components = {
    body: {
      cell: EditableFormCell,
    },
  };

  const handleAdd = () => {
    onChange({
      ...data,
      'undefined': 'value',
    });
  };

  const handleDelete = (key: string) => {
    const newData = { ...data };
    delete(newData[key]);
    onChange(newData);
  };

  const handleSave = (dataIndex: string, key: string, row: any) => {
    const newData = { ...data };
    if (dataIndex === 'key') {
      delete(newData[key]);
    }
    onChange({
      ...newData,
      [row.key]: row.value,
    });
  };

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '30%',
    },
    {
      title: 'value',
      dataIndex: 'value',
      width: '80%',
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: 'value',
        title: 'value',
        handleSave,
      }),
    },
    {
      title: '',
      width: '10%',
      render: (text: any, record: any) => (
        <Button 
          type="link"
          icon="minus-circle"
          size="small"
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <Table
      scroll={{ y: 300 }}
      size="small"
      components={components}
      className={style.table}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      footer={() => (
        <Button onClick={handleAdd} type="dashed" block>
          + 添加新属性
        </Button>
      )}
      bordered
    />
  )
}

const EditableCell = (props: any): any => {
  const { form, editable, dataIndex, title, record, index, handleSave, children, ...restProps } = props;

  const [ editing, setEditing ] = useState(false);
  const input = useRef(null);
  useEffect(() => {
    if (editing) {
      input.current.focus();
    }
  }, [editing])

  const save = () => {
    const values = form.getFieldsValue();
    setEditing(false);
    handleSave(dataIndex, record.key, {...record, ...values});
  };

  return (
    <td {...restProps} style={{padding: 0}}>
      {editing ? (
        <Form.Item style={{margin: 0}}>
          {form.getFieldDecorator(dataIndex, {
            initialValue: record[dataIndex],
          })(<Input className={style.editable} ref={input} onPressEnter={save} onBlur={save} />)}
        </Form.Item>
      ) : (
        <div className={style.editable} onClick={() => editable && setEditing(!editing)}>
          {children}
        </div>
      )}
    </td>
  );
}

const EditableFormCell = Form.create()(EditableCell);
