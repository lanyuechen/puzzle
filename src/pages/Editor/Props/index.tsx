import React from 'react';

import { Breadcrumb, Select } from 'antd';

export default function(props: any) {
  const { path, data } = props;

  const simplePath = path.reduce((p: any, n: any, i: number, ds: any) => (
    i % 2 ? p : p.concat([`${n}${ds[i + 1]}`])
  ), []);

  console.log('>>>.', simplePath);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>root</Breadcrumb.Item>
        {simplePath.map((d: any, i: number) => i < simplePath.length - 1 ? (
          <Breadcrumb.Item key={i}>
            <a>{d}</a>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={i}>
            {d}
          </Breadcrumb.Item>
        ))}
        {data.children && (
          <Breadcrumb.Item>
            <Select defaultValue={-1} size="small">
              <Select.Option value={-1}>
                -- 选择子组件 --
              </Select.Option>
              {data.children.map((d: any, i: number) => (
                <Select.Option key={i} value={i}>
                  children{i}
                </Select.Option>
              ))}
            </Select>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  )
}