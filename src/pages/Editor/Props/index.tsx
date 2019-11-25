import React from 'react';

import { Input } from 'antd';

import EditableTable from './EditableTable';

export default function(props: any) {
  const { path, data, onChange } = props;

  return (
    <div>
      <Input placeholder="组件名称" />
      <EditableTable
        data={data.props}
        onChange={(value: any) => onChange([...path, 'props'], {$set: value})}
      />
    </div>
  )
}