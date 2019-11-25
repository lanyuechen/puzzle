import React from 'react';

import { Breadcrumb, Select } from 'antd';

export default function(props: any) {
  const { path, data, onSelect } = props;

  const simplePath = path.reduce((p: any, n: any, i: number, ds: any) => (
    i % 2 ? p : p.concat([`${n}${ds[i + 1]}`])
  ), []);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a onClick={() => onSelect([])}>root</a>
      </Breadcrumb.Item>
      {simplePath.map((d: any, i: number) => i < simplePath.length - 1 ? (
        <Breadcrumb.Item key={i}>
          <a onClick={() => onSelect(path.slice(0, 2 * i + 2))}>{d}</a>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={i}>
          {d}
        </Breadcrumb.Item>
      ))}
      {data.children && (
        <Breadcrumb.Item>
          <Select
            defaultValue="选择子组件"
            size="small"
            onChange={(idx: number) => onSelect([...path, 'children', idx])}
          >
            {data.children.map((d: any, i: number) => (
              <Select.Option key={i} value={i}>
                data.children{i}
              </Select.Option>
            ))}
          </Select>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}
