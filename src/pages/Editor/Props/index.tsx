import React from 'react';

import { Drawer, Breadcrumb, Select, Input } from 'antd';

export default function(props: any) {
  const { path, data, visible, onClose, onSelect } = props;

  const simplePath = path.reduce((p: any, n: any, i: number, ds: any) => (
    i % 2 ? p : p.concat([`${n}${ds[i + 1]}`])
  ), []);

  const { children, ...others } = data;

  const Bread = (
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
      {children && (
        <Breadcrumb.Item>
          <Select
            defaultValue="选择子组件"
            size="small"
            onChange={(idx: number) => onSelect([...path, 'children', idx])}
          >
            {children.map((d: any, i: number) => (
              <Select.Option key={i} value={i}>
                children{i}
              </Select.Option>
            ))}
          </Select>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );

  return (
    <Drawer
      title={Bread}
      placement="bottom"
      visible={visible}
      onClose={onClose}
    >
      <Input placeholder="组件类型" />
      <Input placeholder="组件名称" />
      <pre>
        {JSON.stringify(others, undefined, 2)}
      </pre>
    </Drawer>
  )
}