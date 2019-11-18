import React from 'react';
import { Input } from 'antd';

export function searchFilter(name: string) {
  return {
    filterDropdown: ({ setSelectedKeys, confirm }: any) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${name}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          onSearch={confirm}
        />
      </div>
    ),
    onFilter: (value: any, record: any) => {
      return record[name].indexOf(value) > -1;
    },
  };
}